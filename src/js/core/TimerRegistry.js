export class TimerRegistry {
  #timeouts = new Set();
  #intervals = new Set();

  timeout(callback, delay) {
    const id = window.setTimeout(() => {
      this.#timeouts.delete(id);
      callback();
    }, delay);
    this.#timeouts.add(id);
    return id;
  }

  interval(callback, delay) {
    const id = window.setInterval(callback, delay);
    this.#intervals.add(id);
    return id;
  }

  clearTimeout(id) {
    window.clearTimeout(id);
    this.#timeouts.delete(id);
  }

  clearInterval(id) {
    window.clearInterval(id);
    this.#intervals.delete(id);
  }

  clearAll() {
    this.#timeouts.forEach((id) => window.clearTimeout(id));
    this.#intervals.forEach((id) => window.clearInterval(id));
    this.#timeouts.clear();
    this.#intervals.clear();
  }
}
