import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3';
import { App, Ref, ref, inject, InjectionKey } from 'vue';
import { IReCaptchaOptions } from './IReCaptchaOptions'

const VueReCaptchaInjectKey: InjectionKey<IReCaptchaComposition> = Symbol(
  'VueReCaptchaInjectKey'
);

interface IGlobalConfig {
  loadedWaiters: Array<{
    resolve: (resolve: boolean) => void;
    reject: (reject: Error) => void;
  }>;
  error: Error | null;
}
const globalConfig: IGlobalConfig = {
  loadedWaiters: [],
  error: null,
};

export const VueReCaptcha = {
  install(app: App, options: IReCaptchaOptions): void {
    const isLoaded = ref(false);
    const instance: Ref<ReCaptchaInstance | undefined> = ref(undefined);

    app.config.globalProperties.$recaptchaLoaded = recaptchaLoaded(isLoaded);

    initializeReCaptcha(options)
      .then((wrapper) => {
        isLoaded.value = true;
        instance.value = wrapper;

        app.config.globalProperties.$recaptcha = recaptcha(instance);
        app.config.globalProperties.$recaptchaInstance = instance;

        globalConfig.loadedWaiters.forEach((v) => v.resolve(true));
      })
      .catch((error: Error) => {
        globalConfig.error = error;
        globalConfig.loadedWaiters.forEach((v) => v.reject(error));
      });

    app.provide(VueReCaptchaInjectKey, {
      instance,
      isLoaded,
      executeRecaptcha: recaptcha(instance),
      recaptchaLoaded: recaptchaLoaded(isLoaded),
    });
  },
};

export function useReCaptcha(): IReCaptchaComposition | undefined {
  return inject(VueReCaptchaInjectKey);
}

async function initializeReCaptcha(
  options: IReCaptchaOptions
): Promise<ReCaptchaInstance> {
  return await loadReCaptcha(options.siteKey, options.loaderOptions)
}

function recaptchaLoaded(isLoaded: Ref<boolean>) {
  return (): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) => {
      if (globalConfig.error !== null) {
        return reject(globalConfig.error);
      }
      if (isLoaded.value) {
        return resolve(true);
      }
      globalConfig.loadedWaiters.push({ resolve, reject });
    });
}

function recaptcha(instance: Ref<ReCaptchaInstance | undefined>) {
  return async (action: string): Promise<string | undefined> => {
    return await instance.value?.execute(action);
  };
}

export interface IReCaptchaComposition {
  isLoaded: Ref<boolean>;
  instance: Ref<ReCaptchaInstance | undefined>;
  executeRecaptcha: (action: string) => Promise<string>;
  recaptchaLoaded: () => Promise<boolean>;
}
