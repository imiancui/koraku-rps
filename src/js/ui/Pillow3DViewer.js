// ============================================================================
// Pillow3DViewer.js - Pure WebGL 3D Interactive Dakimakura Viewer
// Replicating physics suspension, 360-degree inertia fling, and fabric shaders
// Zero external dependencies. Designed for Koraku RPS Special Merch Store.
// ============================================================================

const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, s) => a.map(v => v * s);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
];
const len = a => Math.hypot(...a);
const norm = a => scale(a, 1 / (len(a) || 1));

const qmul = (a, b) => [
  a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
  a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
  a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
  a[3] * b[3] - dot(a.slice(0, 3), b.slice(0, 3))
];

const axisQ = (a, t) => [...scale(norm(a), Math.sin(t / 2)), Math.cos(t / 2)];

const rotate = (v, q) => {
  const t = scale(cross(q.slice(0, 3), v), 2);
  return add(v, add(scale(t, q[3]), cross(q.slice(0, 3), t)));
};

function createShader(gl, type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(`Shader compilation failed: ${info}`);
  }
  return s;
}

// Parametric stitched pillow surface
function surface(u, v, side) {
  const edgeX = Math.max(0, 1 - u * u);
  const edgeY = Math.max(0, 1 - v * v);
  const bulge = Math.pow(edgeX * edgeY, 0.57);
  const x = 0.5 * u * (0.95 + 0.045 * Math.pow(Math.abs(v), 10) - 0.018 * Math.cos(v * 5));
  const y = 1.6 * v * (1 - 0.014 * edgeX);
  const fold = 0.007 * Math.sin(v * 47 + u * 13) * Math.pow(Math.abs(u), 8) * Math.pow(edgeY, 0.5) +
               0.006 * Math.sin(u * 35) * Math.pow(Math.abs(v), 16) * edgeX;
  return [x, y, side * 1.25 * (0.016 + 0.175 * bulge + fold)];
}

function buildPillowMesh() {
  const vertices = [];
  const triangles = [];

  function vertex(u, v, s) {
    const p = surface(u, v, s);
    const e = 0.0001;
    const du = sub(surface(Math.min(1, u + e), v, s), surface(Math.max(-1, u - e), v, s));
    const dv = sub(surface(u, Math.min(1, v + e), s), surface(u, Math.max(-1, v - e), s));
    let n = scale(norm(cross(du, dv)), s);
    const uv = [s === 1 ? (u + 1) * 0.25 : 0.5 + (1 - u) * 0.25, (v + 1) * 0.5];
    return [...p, ...n, ...uv];
  }

  function triangle(a, b, c) {
    vertices.push(...a, ...b, ...c);
    triangles.push([a.slice(0, 3), b.slice(0, 3), c.slice(0, 3)]);
  }

  const NX = 40, NY = 112;
  for (const s of [1, -1]) {
    for (let j = 0; j < NY; j++) {
      for (let i = 0; i < NX; i++) {
        const u = (i / NX) * 2 - 1;
        const v = (j / NY) * 2 - 1;
        const un = ((i + 1) / NX) * 2 - 1;
        const vn = ((j + 1) / NY) * 2 - 1;
        const a = vertex(u, v, s);
        const b = vertex(un, v, s);
        const c = vertex(un, vn, s);
        const d = vertex(u, vn, s);
        if (s === 1) {
          triangle(a, b, c);
          triangle(a, c, d);
        } else {
          triangle(a, c, b);
          triangle(a, d, c);
        }
      }
    }
  }

  // Narrow side gusset closing perimeter
  const boundary = [];
  for (let i = 0; i <= NX; i++) boundary.push([-1 + (2 * i) / NX, -1]);
  for (let j = 1; j <= NY; j++) boundary.push([1, -1 + (2 * j) / NY]);
  for (let i = NX - 1; i >= 0; i--) boundary.push([-1 + (2 * i) / NX, 1]);
  for (let j = NY - 1; j >= 0; j--) boundary.push([-1, -1 + (2 * j) / NY]);

  for (let i = 0; i < boundary.length - 1; i++) {
    const [u, v] = boundary[i];
    const [un, vn] = boundary[i + 1];
    const a = vertex(u, v, 1);
    const b = vertex(u, v, -1);
    const c = vertex(un, vn, -1);
    const d = vertex(un, vn, 1);
    const n = norm(cross(sub(b.slice(0, 3), a.slice(0, 3)), sub(c.slice(0, 3), a.slice(0, 3))));
    for (const p of [a, b, c, d]) {
      p.splice(3, 3, ...n);
      p[6] = Math.min(0.4998, Math.max(0.0002, (u + 1) * 0.25));
    }
    triangle(a, b, c);
    triangle(a, c, d);
  }

  return {
    vertices: new Float32Array(vertices),
    triangles,
    vertexCount: vertices.length / 8
  };
}

export class Pillow3DViewer {
  constructor(options = {}) {
    this.canvas = options.canvas;
    this.stateEl = options.stateEl || null;
    this.loadingEl = options.loadingEl || null;
    this.frontBtn = options.frontBtn || null;
    this.backBtn = options.backBtn || null;
    this.resetBtn = options.resetBtn || null;
    this.textureUrl = options.textureUrl || "./koraku/pillow-texture.webp";
    this.getStateText = options.getStateText || null;

    this.home = qmul(axisQ([0, 0, 1], -0.085), axisQ([0, 1, 0], -0.23));
    this.q = [...this.home];
    this.omega = [0, 0, 0];
    this.pos = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.drag = null;
    this.targetQ = null;
    this.last = 0;
    this.halfH = 2.18;
    this.halfW = 2.0;
    this.loaded = false;
    this.isPaused = false;
    this.animId = null;

    this.gl = null;
    this.program = null;
    this.modelLoc = null;
    this.projectionLoc = null;
    this.mesh = null;
    this.resizeObserver = null;

    this.boundPointerDown = this.handlePointerDown.bind(this);
    this.boundPointerMove = this.handlePointerMove.bind(this);
    this.boundPointerUp = this.handleRelease.bind(this);
    this.boundKeyDown = this.handleKeyDown.bind(this);
    this.boundFrame = this.frame.bind(this);
  }

  init() {
    if (!this.canvas) return false;

    try {
      this.gl = this.canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false
      });
      if (!this.gl) throw new Error("WebGL is not supported");

      const gl = this.gl;
      const vs = `
        attribute vec3 aPosition;
        attribute vec3 aNormal;
        attribute vec2 aUV;
        uniform mat4 uModel;
        uniform mat4 uProjection;
        varying vec3 vNormal;
        varying vec2 vUV;
        varying vec3 vPos;
        void main(){
          vec4 p = uModel * vec4(aPosition, 1.0);
          gl_Position = uProjection * p;
          vNormal = mat3(uModel) * aNormal;
          vUV = aUV;
          vPos = p.xyz;
        }
      `;

      const fs = `
        precision mediump float;
        varying vec3 vNormal;
        varying vec2 vUV;
        varying vec3 vPos;
        uniform sampler2D uTexture;
        void main(){
          vec3 n = normalize(vNormal);
          vec3 c = texture2D(uTexture, vUV).rgb;
          float key = max(dot(n, normalize(vec3(-0.6, 0.9, 1.5))), 0.0);
          float fill = max(dot(n, normalize(vec3(0.9, 0.2, -0.7))), 0.0);
          float rim = pow(1.0 - abs(n.z), 3.0);
          float weave = sin(vUV.x * 3600.0) * sin(vUV.y * 5800.0) * 0.009;
          vec3 color = c * (0.66 + 0.38 * key + 0.14 * fill + weave) + vec3(0.09, 0.11, 0.12) * rim;
          gl_FragColor = vec4(color, 1.0);
        }
      `;

      this.program = gl.createProgram();
      gl.attachShader(this.program, createShader(gl, gl.VERTEX_SHADER, vs));
      gl.attachShader(this.program, createShader(gl, gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        throw new Error("Shader program link failed: " + gl.getProgramInfoLog(this.program));
      }
      gl.useProgram(this.program);

      this.mesh = buildPillowMesh();
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.mesh.vertices, gl.STATIC_DRAW);

      for (const [name, size, offset] of [
        ["aPosition", 3, 0],
        ["aNormal", 3, 12],
        ["aUV", 2, 24]
      ]) {
        const at = gl.getAttribLocation(this.program, name);
        gl.enableVertexAttribArray(at);
        gl.vertexAttribPointer(at, size, gl.FLOAT, false, 32, offset);
      }

      this.modelLoc = gl.getUniformLocation(this.program, "uModel");
      this.projectionLoc = gl.getUniformLocation(this.program, "uProjection");

      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);

      // Texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      const img = new Image();
      img.onload = () => {
        if (!this.gl) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        this.loaded = true;
        if (this.loadingEl) this.loadingEl.hidden = true;
        this.updateStateText("free");
        this.resize();
        this.resume();
      };
      img.onerror = () => {
        if (this.loadingEl) {
          this.loadingEl.textContent = "3D 貼圖載入失敗，請檢查網路或圖檔路徑。";
        }
      };
      img.src = this.textureUrl;

      // Event listeners
      this.canvas.addEventListener("pointerdown", this.boundPointerDown);
      window.addEventListener("pointermove", this.boundPointerMove);
      window.addEventListener("pointerup", this.boundPointerUp);
      window.addEventListener("pointercancel", this.boundPointerUp);
      this.canvas.addEventListener("keydown", this.boundKeyDown);

      if (this.resetBtn) this.resetBtn.onclick = () => this.settle("front");
      if (this.frontBtn) this.frontBtn.onclick = () => this.settle("front");
      if (this.backBtn) this.backBtn.onclick = () => this.settle("back");

      if (typeof ResizeObserver !== "undefined") {
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.canvas);
      }

      this.canvas.addEventListener("webglcontextlost", e => {
        e.preventDefault();
        if (this.loadingEl) {
          this.loadingEl.hidden = false;
          this.loadingEl.textContent = "3D 顯示已中斷，請重新進入頁面。";
        }
      });

      return true;
    } catch (err) {
      console.warn("Pillow3DViewer initialization failed:", err);
      if (this.loadingEl) {
        this.loadingEl.textContent = "此裝置未能啟用 3D，請使用支援 WebGL 的瀏覽器。";
      }
      this.updateStateText("unsupported");
      return false;
    }
  }

  updateStateText(type) {
    if (!this.stateEl) return;
    if (this.getStateText) {
      this.stateEl.textContent = this.getStateText(type);
      return;
    }
    const map = {
      loading: "載入中",
      free: "自由探索",
      dragging: "抓取中",
      inertia: "慣性旋轉",
      resetting: "正在復位",
      unsupported: "無法啟用 3D"
    };
    this.stateEl.textContent = map[type] || type;
  }

  matrix() {
    const x = rotate([1, 0, 0], this.q);
    const y = rotate([0, 1, 0], this.q);
    const z = rotate([0, 0, 1], this.q);
    return new Float32Array([...x, 0, ...y, 0, ...z, 0, ...this.pos, 1]);
  }

  resize() {
    if (!this.canvas || !this.gl) return;
    const r = this.canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(r.width * d);
    this.canvas.height = Math.round(r.height * d);
    this.halfW = this.halfH * (r.width / r.height);
  }

  pick(x, y) {
    if (!this.mesh) return null;
    const inverse = [-this.q[0], -this.q[1], -this.q[2], this.q[3]];
    const o = rotate(sub([x, y, 6], this.pos), inverse);
    const d = rotate([0, 0, -1], inverse);
    let nearest = Infinity;
    let hit = null;

    for (const [a, b, c] of this.mesh.triangles) {
      const e1 = sub(b, a);
      const e2 = sub(c, a);
      const h = cross(d, e2);
      const det = dot(e1, h);
      if (Math.abs(det) < 1e-8) continue;
      const f = 1 / det;
      const s = sub(o, a);
      const u = f * dot(s, h);
      if (u < 0 || u > 1) continue;
      const t = cross(s, e1);
      const v = f * dot(d, t);
      if (v < 0 || u + v > 1) continue;
      const distance = f * dot(e2, t);
      if (distance > 0 && distance < nearest) {
        nearest = distance;
        hit = add(o, scale(d, distance));
      }
    }
    return hit;
  }

  pointer(e) {
    const r = this.canvas.getBoundingClientRect();
    return [
      ((e.clientX - r.left) / r.width) * 2 * this.halfW - this.halfW,
      this.halfH - ((e.clientY - r.top) / r.height) * 2 * this.halfH
    ];
  }

  settle(face) {
    this.drag = null;
    this.canvas.classList.remove("grabbing");
    this.omega = [0, 0, 0];
    this.targetQ = face === "back" ? qmul(this.home, axisQ([0, 1, 0], Math.PI)) : [...this.home];
    this.updateStateText("resetting");
  }

  updateButtons() {
    const back = rotate([0, 0, 1], this.q)[2] < 0;
    if (this.frontBtn) {
      this.frontBtn.classList.toggle("active", !back);
      this.frontBtn.setAttribute("aria-pressed", String(!back));
    }
    if (this.backBtn) {
      this.backBtn.classList.toggle("active", back);
      this.backBtn.setAttribute("aria-pressed", String(back));
    }
  }

  handlePointerDown(e) {
    if (!this.loaded || e.button !== 0) return;
    const p = this.pointer(e);
    const hit = this.pick(...p);
    if (!hit) return;
    e.preventDefault();
    this.canvas.focus({ preventScroll: true });
    this.targetQ = null;
    this.drag = {
      id: e.pointerId,
      p,
      last: p,
      time: performance.now(),
      hit
    };
    this.canvas.classList.add("grabbing");
    this.updateStateText("dragging");
  }

  handlePointerMove(e) {
    if (!this.drag || this.drag.id !== e.pointerId) return;
    const p = this.pointer(e);
    const now = performance.now();
    const dt = Math.max(0.008, (now - this.drag.time) / 1000);
    const delta = sub(p, this.drag.last);
    const speed = scale(delta, 1 / dt);
    const arm = rotate(this.drag.hit, this.q);
    const desired = [
      -speed[1] * 1.3,
      speed[0] * 2.8,
      (arm[0] * speed[1] - arm[1] * speed[0]) * 0.9
    ];
    this.omega = add(scale(this.omega, 0.46), scale(desired, 0.54));
    const magnitude = len(this.omega);
    if (magnitude > 24) this.omega = scale(this.omega, 24 / magnitude);
    this.drag.p = p;
    this.drag.last = p;
    this.drag.time = now;
  }

  handleRelease(e) {
    if (!this.drag || (e && this.drag.id !== e.pointerId)) return;
    const age = (performance.now() - this.drag.time) / 1000;
    this.omega = scale(this.omega, Math.exp(-age * 9));
    this.drag = null;
    this.canvas.classList.remove("grabbing");
    this.updateStateText("inertia");
  }

  handleKeyDown(e) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      this.targetQ = null;
      this.omega = add(
        this.omega,
        e.key === "ArrowLeft"
          ? [0, -2, 0]
          : e.key === "ArrowRight"
            ? [0, 2, 0]
            : e.key === "ArrowUp"
              ? [-2, 0, 0]
              : [2, 0, 0]
      );
    }
    if (e.key && e.key.toLowerCase() === "r") {
      this.settle("front");
    }
  }

  frame(time) {
    if (this.isPaused) return;

    const dt = Math.min((time - this.last) / 1000 || 0.016, 0.033);
    this.last = time;

    if (this.targetQ) {
      let t = this.targetQ;
      if (dot(this.q, t) < 0) t = scale(t, -1);
      this.q = norm(add(scale(this.q, Math.exp(-dt * 8)), scale(t, 1 - Math.exp(-dt * 8))));
      if (len(sub(this.q, t)) < 0.0004 && len(this.pos) < 0.002 && len(this.velocity) < 0.01) {
        this.q = [...t];
        this.targetQ = null;
      }
    } else {
      if (this.drag && time - this.drag.time > 65) {
        this.omega = scale(this.omega, Math.exp(-dt * 8));
      }
      const w = len(this.omega);
      if (w > 0.0001) {
        this.q = norm(qmul(axisQ(this.omega, w * dt), this.q));
      }
      if (!this.drag) {
        this.omega = scale(this.omega, Math.exp(-dt * (0.82 + 0.045 * w)));
        if (len(this.omega) < 0.007) this.omega = [0, 0, 0];
      }
    }

    // Mass-and-spring suspension
    let goal = [0, 0, 0];
    if (this.drag) {
      const arm = rotate(this.drag.hit, this.q);
      goal = [
        Math.max(-this.halfW * 0.65, Math.min(this.halfW * 0.65, this.drag.p[0] - arm[0])),
        Math.max(-0.5, Math.min(0.5, this.drag.p[1] - arm[1] - 0.07)),
        0
      ];
    }
    const stiffness = this.drag ? 42 : this.targetQ ? 50 : 13;
    const damping = this.drag ? 9 : this.targetQ ? 12 : 5.3;
    this.velocity = add(
      this.velocity,
      scale(sub(scale(sub(goal, this.pos), stiffness), scale(this.velocity, damping)), dt)
    );
    this.pos = add(this.pos, scale(this.velocity, dt));

    if (!this.drag && !this.targetQ && len(this.omega) === 0 && len(this.pos) < 0.0005 && len(this.velocity) < 0.002) {
      this.pos = [0, 0, 0];
      this.velocity = [0, 0, 0];
    }

    if (this.canvas.width > 0 && this.canvas.height > 0) {
      const aspect = this.canvas.width / this.canvas.height;
      const ax = rotate([0.52, 0, 0], this.q);
      const ay = rotate([0, 1.61, 0], this.q);
      const az = rotate([0, 0, 0.25], this.q);
      const ex = Math.abs(ax[0]) + Math.abs(ay[0]) + Math.abs(az[0]);
      const ey = Math.abs(ax[1]) + Math.abs(ay[1]) + Math.abs(az[1]);
      const framing = Math.max(2.18, (ex + Math.abs(this.pos[0]) + 0.18) / aspect, ey + Math.abs(this.pos[1]) + 0.43);
      this.halfH += (framing - this.halfH) * (1 - Math.exp(-dt * 12));
      this.halfW = this.halfH * aspect;

      const gl = this.gl;
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(this.modelLoc, false, this.matrix());
      gl.uniformMatrix4fv(
        this.projectionLoc,
        false,
        new Float32Array([1 / this.halfW, 0, 0, 0, 0, 1 / this.halfH, 0, 0, 0, 0, -0.1, 0, 0, 0, 0, 1])
      );
      gl.drawArrays(gl.TRIANGLES, 0, this.mesh.vertexCount);
    }

    this.updateButtons();
    if (!this.drag && !this.targetQ) {
      this.updateStateText(len(this.omega) > 0.05 ? "inertia" : "free");
    }

    this.animId = requestAnimationFrame(this.boundFrame);
  }

  resume() {
    if (!this.loaded || !this.isPaused) {
      if (this.loaded && !this.animId) {
        this.last = performance.now();
        this.animId = requestAnimationFrame(this.boundFrame);
      }
      return;
    }
    this.isPaused = false;
    this.last = performance.now();
    this.animId = requestAnimationFrame(this.boundFrame);
  }

  pause() {
    this.isPaused = true;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  destroy() {
    this.pause();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.canvas) {
      this.canvas.removeEventListener("pointerdown", this.boundPointerDown);
      this.canvas.removeEventListener("keydown", this.boundKeyDown);
    }
    window.removeEventListener("pointermove", this.boundPointerMove);
    window.removeEventListener("pointerup", this.boundPointerUp);
    window.removeEventListener("pointercancel", this.boundPointerUp);
  }
}
