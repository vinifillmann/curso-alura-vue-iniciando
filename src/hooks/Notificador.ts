import { TipoNotificacoes } from "@/interfaces/NotificacoesInterface"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/mutations"

type Notificador = {
    notificar: (tipo: TipoNotificacoes, titulo: string, texto: string) => void
}

export default (): Notificador => {
    const notificar = (tipo: TipoNotificacoes, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }
    return {
        notificar
    }
}