const Application = require('@waline/vercel');

module.exports = Application({
  async postSave(comment) {
    //do what ever you want after save comment
  },
});
