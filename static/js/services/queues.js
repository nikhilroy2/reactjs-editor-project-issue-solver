import { IS_DEV } from '../config';
import { checkAuth } from './urls/editor/auth';

const stack = [];

export const Q = {
  state: {
    timer: null,
  },
  push(id, config) {
    stack.push({
      id,
      status: 'pending',
      config,
    });
    // if (!IS_DEV) {
    //   window.clearTimeout(this.state.timer);
    //   this.state.timer = window.setTimeout(this.checkAuth, 60000);
    // }
  },
  checkAuth: async () => {
    await checkAuth();
  },
  success(id) {
    this.changeStatus(id, 'success');
  },
  failed(id) {
    this.changeStatus(id, 'failed');
  },
  unshift: () => {},
  changeStatus(id, status) {
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].id === id) {
        stack[i].status = status;
        break;
      }
    }
  },
  stack() {
    return stack;
  },
};

if (IS_DEV) {
  window.q = Q;
}
