// add think as global variable
globalThis.think = {
  config: (name) => {
    if (name === 'domPurify') return {};
  },
};
