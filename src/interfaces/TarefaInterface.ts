import ProjetoInterface from "./ProjetoInterface"

export default interface TarefaInterface {
    id: number
    duracaoEmSegundos: number
    descricao: string
    projeto: ProjetoInterface
}