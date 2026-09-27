import type { WalineComment, WalineUser } from '../types.js';
import type { CoreRuntime } from './runtime.js';

export const createAvatarFormatter =
  ({ config, services }: CoreRuntime) =>
  async (value: Partial<WalineComment> | WalineUser): Promise<string> => {
    const url =
      'avatar' in value && typeof value.avatar === 'string'
        ? value.avatar
        : services.avatar
          ? await services.avatar.stringify(value)
          : '';

    return config.avatarProxy && url && !url.includes(config.avatarProxy)
      ? `${config.avatarProxy}?url=${encodeURIComponent(url)}`
      : url;
  };
