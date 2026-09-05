// server/net/WsAdapter.js
import http from "node:http";
import crypto from "node:crypto";
import { EventEmitter } from "node:events";

const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

/**
 * Built-in minimal RFC 6455 WebSocket frame parser/formatter for zero-dependency fallback.
 */
class NativeWebSocketClient extends EventEmitter {
  constructor(socket) {
    super();
    this.socket = socket;
    this.readyState = 1; // 1 = OPEN
    this._buffer = Buffer.alloc(0);

    socket.on("data", (chunk) => this._onData(chunk));
    socket.on("end", () => {
      this.close(1000, "TCP_FIN");
    });
    socket.on("close", () => {
      if (this.readyState !== 3) {
        this.readyState = 3; // CLOSED
        this.emit("close");
      }
    });
    socket.on("error", (err) => {
      this.emit("error", err);
      try {
        this.socket.destroy();
      } catch (_) {}
      if (this.readyState !== 3) {
        this.readyState = 3;
        this.emit("close");
      }
    });
  }

  send(data) {
    if (this.readyState !== 1 || !this.socket.writable) return;
    const payload = Buffer.isBuffer(data) ? data : Buffer.from(String(data), "utf8");
    const len = payload.length;

    let header;
    if (len < 126) {
      header = Buffer.from([0x81, len]);
    } else if (len <= 65535) {
      header = Buffer.alloc(4);
      header[0] = 0x81;
      header[1] = 126;
      header.writeUInt16BE(len, 2);
    } else {
      header = Buffer.alloc(10);
      header[0] = 0x81;
      header[1] = 127;
      header.writeBigUInt64BE(BigInt(len), 2);
    }

    this.socket.write(Buffer.concat([header, payload]));
  }

  close(code = 1000, reason = "") {
    if (this.readyState === 3) return;
    this.readyState = 2; // CLOSING
    try {
      const reasonBuf = Buffer.from(reason, "utf8");
      const payload = Buffer.alloc(2 + reasonBuf.length);
      payload.writeUInt16BE(code, 0);
      reasonBuf.copy(payload, 2);

      const header = Buffer.from([0x88, payload.length]);
      this.socket.write(Buffer.concat([header, payload]));
      this.socket.end();
    } catch {
      this.socket.destroy();
    }
    this.readyState = 3;
    this.emit("close", code, reason);
  }

  _onData(chunk) {
    this._buffer = Buffer.concat([this._buffer, chunk]);
    this._processFrames();
  }

  _processFrames() {
    while (this._buffer.length >= 2) {
      const firstByte = this._buffer[0];
      const secondByte = this._buffer[1];
      const opcode = firstByte & 0x0f;
      const isMasked = (secondByte & 0x80) === 0x80;
      let payloadLen = secondByte & 0x7f;
      let offset = 2;

      if (payloadLen === 126) {
        if (this._buffer.length < 4) return;
        payloadLen = this._buffer.readUInt16BE(2);
        offset = 4;
      } else if (payloadLen === 127) {
        if (this._buffer.length < 10) return;
        payloadLen = Number(this._buffer.readBigUInt64BE(2));
        offset = 10;
      }

      let maskKey = null;
      if (isMasked) {
        if (this._buffer.length < offset + 4) return;
        maskKey = this._buffer.subarray(offset, offset + 4);
        offset += 4;
      }

      if (this._buffer.length < offset + payloadLen) return;

      const payload = Buffer.from(this._buffer.subarray(offset, offset + payloadLen));
      this._buffer = this._buffer.subarray(offset + payloadLen);

      if (isMasked && maskKey) {
        for (let i = 0; i < payload.length; i++) {
          payload[i] ^= maskKey[i % 4];
        }
      }

      if (opcode === 0x01 || opcode === 0x02) { // Text or Binary
        this.emit("message", payload.toString("utf8"));
      } else if (opcode === 0x08) { // Close
        this.close();
      } else if (opcode === 0x09) { // Ping
        // Reply with Pong
        const pong = Buffer.from([0x8a, 0x00]);
        this.socket.write(pong);
      }
    }
  }
}

export class WsAdapter extends EventEmitter {
  constructor(server, options = {}) {
    super();
    this.server = server;
    this.options = options;
    this.wss = null;
    this.nativeClients = new Set();

    this._setupNativeUpgrade();
  }

  async _init() {
    try {
      const wsModule = await import("ws");
      const WebSocketServer = wsModule.WebSocketServer || wsModule.default?.WebSocketServer;
      if (WebSocketServer) {
        this.wss = new WebSocketServer({
          server: this.server,
          verifyClient: this.options.verifyClient
        });

        this.wss.on("connection", (ws, req) => {
          this.emit("connection", ws, req);
        });
        return;
      }
    } catch {
      // 'ws' package not available; using native Node fallback
    }

    this._setupNativeUpgrade();
  }

  _setupNativeUpgrade() {
    this.server.on("upgrade", (req, socket, head) => {
      if (req.headers["upgrade"]?.toLowerCase() !== "websocket") {
        socket.destroy();
        return;
      }

      if (this.options.verifyClient) {
        let allow = true;
        this.options.verifyClient({ req, origin: req.headers.origin }, (res) => {
          allow = res;
        });
        if (!allow) {
          socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
          socket.destroy();
          return;
        }
      }

      const key = req.headers["sec-websocket-key"];
      if (!key) {
        socket.destroy();
        return;
      }

      const acceptKey = crypto
        .createHash("sha1")
        .update(key + WS_GUID)
        .digest("base64");

      const responseHeaders = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${acceptKey}`,
        "\r\n"
      ];

      socket.write(responseHeaders.join("\r\n"));

      const client = new NativeWebSocketClient(socket);
      this.nativeClients.add(client);
      client.on("close", () => this.nativeClients.delete(client));

      if (head && head.length > 0) {
        client._onData(head);
      }

      this.emit("connection", client, req);
    });
  }

  close() {
    if (this.wss) {
      this.wss.close();
    }
    for (const client of this.nativeClients) {
      client.close(1001, "SERVER_SHUTDOWN");
    }
    this.nativeClients.clear();
  }
}

export default WsAdapter;
