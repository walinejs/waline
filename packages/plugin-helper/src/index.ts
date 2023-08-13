import { Hooks, HooksCallback, HooksName } from './hook';
import { Middleware } from './middleware';

export interface WalinePlugin {
  hooks: Partial<Record<HooksName, HooksCallback>>;
  middlewares: Middleware[];
}

export default class PluginHelper {
  hooks: WalinePlugin['hooks'] = {};
  middlewares: WalinePlugin['middlewares'] = [];

  hook(options: Hooks): void {
    this.hooks[options.name] = options.callback;
  }

  middleware(fn: Middleware): void {
    this.middlewares.push(fn);
  }

  valueOf(): WalinePlugin {
    return {
      hooks: this.hooks,
      middlewares: this.middlewares,
    };
  }
}
