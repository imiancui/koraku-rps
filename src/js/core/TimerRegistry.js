export class TimerRegistry {
  #timeouts = new Set();
  #intervals = new Set();

  timeout(callback, delay) {
    const id = globalThis.setTimeout(() => {
      this.#timeouts.delete(id);
      callback();
    }, delay);
    this.#timeouts.add(id);
    return id;
  }

  interval(callback, delay) {
    const id = globalThis.setInterval(callback, delay);
    this.#intervals.add(id);
    return id;
  }

  clearTimeout(id) {
    globalThis.clearTimeout(id);
    this.#timeouts.delete(id);
  }

  clearInterval(id) {
    globalThis.clearInterval(id);
    this.#intervals.delete(id);
  }

  clearAll() {
    this.#timeouts.forEach((id) => globalThis.clearTimeout(id));
    this.#intervals.forEach((id) => globalThis.clearInterval(id));
    this.#timeouts.clear();
    this.#intervals.clear();
  }
}
