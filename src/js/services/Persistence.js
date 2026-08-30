import { STORAGE_KEY } from "../config/gameConfig.js";

export function encodeSaveData(data) {
  if (!data || typeof data !== "object") return "";
  try {
    const json = JSON.stringify(data);
    if (typeof Buffer !== "undefined") {
      return "KORAKU1_" + Buffer.from(json, "utf8").toString("base64");
    }
    const utf8Bytes = new TextEncoder().encode(json);
    let binary = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return "KORAKU1_" + btoa(binary);
  } catch {
    return "";
  }
}

export function decodeSaveData(code) {
  if (!code || typeof code !== "string") return null;
  let raw = code.trim();
  if (raw.startsWith("KORAKU1_")) {
    raw = raw.substring("KORAKU1_".length).trim();
  } else if (raw.startsWith("KORAKU_V1_")) {
    raw = raw.substring("KORAKU_V1_".length).trim();
  }
  if (raw.startsWith("{") && raw.endsWith("}")) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  try {
    if (typeof Buffer !== "undefined") {
      const json = Buffer.from(raw, "base64").toString("utf8");
      return JSON.parse(json);
    }
    const binary = atob(raw);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export class Persistence {
  load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  save(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // The game remains playable when storage is unavailable.
    }
  }

  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore unavailable storage.
    }
  }
}

