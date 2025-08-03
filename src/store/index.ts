import { Preferences } from "@capacitor/preferences";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";

export interface Estado {
    configuracoes: {
        modoDark: boolean;
    },
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        configuracoes: {
            modoDark: true,
        }
    },
    mutations: {
        async setModoDark(state, modoDark: boolean) {
            state.configuracoes.modoDark = modoDark;
            await Preferences.set({ key: 'modoDark', value: String(modoDark) })
        },
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}