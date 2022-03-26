// add think as global variable
global.think = {
  config: (name) => {
    if (name === 'domPurify') return {};

    return undefined;
  },
};
