const projeto = {
    id: 1,
    descricao: "Alura Tracker 3.0"
}


const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave) {
        console.log(`Alguém pediu a chave ${chave} do projeto`)
        return objetoOriginal[chave]
    },
    set(objetoOriginal, chave, valor) {
        console.log(`Alguém alterou a chave para o valor ${valor}`)
        objetoOriginal[chave] = valor
    }
})

proxy.descricao = "Reatividade show"

console.log(proxy.descricao)