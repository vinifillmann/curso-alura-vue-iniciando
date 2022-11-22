import ProjetoInterface from "./ProjetoInterface"

export default interface TarefaInterface {
    duracaoEmSegundos: number
    descricao: string
    projeto: ProjetoInterface
}