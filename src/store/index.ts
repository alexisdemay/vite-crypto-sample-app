import { loadModules, context, modules } from './modules';
import { createLogger, createStore } from 'vuex';
import AppConfig from '@/config/AppConfig';

const store = createStore({
  modules,
  // In strict mode an error will be thrown if Vuex state is mutated outside of mutation handlers
  strict: AppConfig.IS_DEV,
  // Plugins that exposes hooks for each mutation
  plugins: AppConfig.IS_DEV ? [createLogger()] : [],
});

// Enable HMR on modules
if (import.meta.hot) {
  import.meta.hot?.accept(context.id, () => {
    const { modules } = loadModules();
    store.hotUpdate(modules);
  });
}

export default store;
