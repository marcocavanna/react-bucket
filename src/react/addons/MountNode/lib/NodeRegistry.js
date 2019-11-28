export default class NodeRegistry {

  constructor() {
    this.nodes = new Map();
  }

  add = (ref, component) => {
    if (this.nodes.has(ref)) {
      const set = this.nodes.get(ref);

      set.add(component);

      return;
    }

    this.nodes.set(ref, new Set([component]));
  }

  del = (ref, component) => {
    if (!this.nodes.has(ref)) {
      return;
    }

    const set = this.nodes.get(ref);

    if (set.size === 1) {
      this.nodes.delete(ref);
      return;
    }

    set.delete(component);
  }

  emit = (ref, callback) => {
    callback(ref, this.nodes.get(ref));
  }

}
