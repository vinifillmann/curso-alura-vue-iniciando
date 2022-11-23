import { TipoNotificacoes } from "@/interfaces/NotificacoesInterface"
import { NOTIFICAR } from "@/store/mutations"
import { store } from "@/store"

export const NotificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacoes, titulo: string, texto: string) {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
    },
}