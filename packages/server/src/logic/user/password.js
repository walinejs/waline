import Base from '../base.js';

export default class extends Base {
  async putAction() {
    this.rules = {
      email: {
        required: true,
      },
    };
  }
}
