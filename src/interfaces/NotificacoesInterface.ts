export enum TipoNotificacoes {
    SUCESSO,
    FALHA,
    ATENCAO
}

export default interface NotificacoesInterface {
    titulo: string
    texto: string
    tipo: TipoNotificacoes
    id: number
}