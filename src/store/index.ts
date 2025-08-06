import { ItemNoticia } from "@/models/itemNoticia";
import { Preferences } from "@capacitor/preferences";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";

export interface Estado {
    configuracoes: {
        modoDark: boolean;
    },
    qtdNoticiasFavoritas?: number;
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        configuracoes: {
            modoDark: true,
        },
        qtdNoticiasFavoritas: 0,
    },
    mutations: {
        async setModoDark(state, modoDark: boolean) {
            state.configuracoes.modoDark = modoDark;
            await Preferences.set({ key: 'modoDark', value: String(modoDark) })
        },
        async setNoticiasFavoritas(state, noticias: ItemNoticia[]) {
            await Preferences.set({ key: 'noticiasFavoritas', value: JSON.stringify(noticias) });
        },
        setQtdNoticiasFavoritas(state, qtd: number) {
            state.qtdNoticiasFavoritas = qtd;
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}