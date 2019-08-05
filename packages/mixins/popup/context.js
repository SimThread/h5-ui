export default {
  zIndex: 2000,
  stack: [],
  lockCount: 0,

  get top() {
    console.log('this context:', this);
    return this.stack[this.stack.length - 1];
  }
};
