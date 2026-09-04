// server/core/Auth.js
import crypto from "node:crypto";
import { SERVER_CONFIG } from "../config.js";

/**
 * Base64URL encoding helper
 */
function base64UrlEncode(str) {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Base64URL decoding helper
 */
function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

export class AuthManager {
  constructor(options = {}) {
    this.secret = options.secret || SERVER_CONFIG.jwtSecret;
    this.tokenTtlMs = options.tokenTtlMs || SERVER_CONFIG.tokenTtlMs;
  }

  /**
   * Create an HMAC-SHA256 signature
   */
  _sign(data) {
    return crypto
      .createHmac("sha256", this.secret)
      .update(data)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  /**
   * Issue a signed token for an account / device
   * @param {object} params
   * @param {string} params.accountId
   * @param {string} params.deviceId
   * @param {boolean} [params.devEntitlement=false]
   * @param {number} [params.ttlMs]
   * @returns {string} Signed token
   */
  issueToken({ accountId, deviceId, devEntitlement = false, ttlMs }) {
    const now = Date.now();
    const exp = now + (ttlMs || this.tokenTtlMs);
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      accountId,
      deviceId: deviceId || `dev_${crypto.randomBytes(8).toString("hex")}`,
      devEntitlement: Boolean(devEntitlement),
      iat: now,
      exp
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const signature = this._sign(`${encodedHeader}.${encodedPayload}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Issue a fresh anonymous token
   * @param {string} [deviceId]
   * @param {boolean} [devEntitlement=false]
   * @returns {{ token: string, accountId: string, deviceId: string, devEntitlement: boolean }}
   */
  issueAnonymousToken(deviceId, devEntitlement = false) {
    const accountId = `acc_${crypto.randomBytes(8).toString("hex")}`;
    const devId = deviceId || `dev_${crypto.randomBytes(8).toString("hex")}`;
    const token = this.issueToken({ accountId, deviceId: devId, devEntitlement });
    return {
      token,
      accountId,
      deviceId: devId,
      devEntitlement: Boolean(devEntitlement)
    };
  }

  /**
   * Verify and decode a token
   * @param {string} token
   * @returns {{ valid: boolean, payload?: object, error?: string }}
   */
  verifyToken(token) {
    if (!token || typeof token !== "string") {
      return { valid: false, error: "TOKEN_MISSING_OR_INVALID_TYPE" };
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, error: "MALFORMED_TOKEN_STRUCTURE" };
    }

    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = this._sign(`${encodedHeader}.${encodedPayload}`);

    // Constant-time comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return { valid: false, error: "INVALID_SIGNATURE" };
    }

    try {
      const payload = JSON.parse(base64UrlDecode(encodedPayload));
      const now = Date.now();

      if (payload.exp && payload.exp < now) {
        return { valid: false, error: "TOKEN_EXPIRED" };
      }

      if (!payload.accountId) {
        return { valid: false, error: "MISSING_ACCOUNT_ID" };
      }

      return { valid: true, payload };
    } catch {
      return { valid: false, error: "PAYLOAD_DECODE_FAILED" };
    }
  }

  /**
   * Elevate an existing valid token to have devEntitlement: true
   * @param {string} token
   * @returns {{ success: boolean, token?: string, payload?: object, error?: string }}
   */
  elevateToken(token) {
    const verification = this.verifyToken(token);
    if (!verification.valid) {
      return { success: false, error: verification.error };
    }
    const { accountId, deviceId } = verification.payload;
    const newToken = this.issueToken({
      accountId,
      deviceId,
      devEntitlement: true
    });
    return {
      success: true,
      token: newToken,
      payload: {
        accountId,
        deviceId,
        devEntitlement: true
      }
    };
  }

  /**
   * Demote an existing valid token to have devEntitlement: false
   * @param {string} token
   * @returns {{ success: boolean, token?: string, payload?: object, error?: string }}
   */
  demoteToken(token) {
    const verification = this.verifyToken(token);
    if (!verification.valid) {
      return { success: false, error: verification.error };
    }
    const { accountId, deviceId } = verification.payload;
    const newToken = this.issueToken({
      accountId,
      deviceId,
      devEntitlement: false
    });
    return {
      success: true,
      token: newToken,
      payload: {
        accountId,
        deviceId,
        devEntitlement: false
      }
    };
  }
}

export default AuthManager;
