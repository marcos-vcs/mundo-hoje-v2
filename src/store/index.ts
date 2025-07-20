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
            modoDark: localStorage.getItem("modoDark") === "true",
        }
    },
    mutations: {
        setModoDark(state, modoDark: boolean) {
            state.configuracoes.modoDark = modoDark;
            localStorage.setItem("modoDark", String(modoDark));
        },
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}