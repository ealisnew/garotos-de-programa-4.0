semCadastro = document.querySelector(".semCadastro")
comCadastro = document.querySelector(".comCadastro")
items = document.querySelector("#item")
quantidade = document.querySelector(".quantidade")
preco = document.querySelector(".preco")
adicionaItem = document.querySelector(".adicionaItem")
removerItem = document.querySelector(".removerItem")
removerCadastro = document.querySelector(".removerCadastro")
total = document.querySelector(".total")
marcarConsulta = document.querySelector(".marcarConsulta")
verificarConsulta = document.querySelector(".verificarConsulta")
verificarAnimal = document.querySelector(".verificarAnimal")
opcoes = document.querySelector("#items")

datas = []
horarios = []
clientes = []
nomesClientes = []
cachorros = []
racas = []
index = 0
totalcaixa = 0
totalitems = 0
vendaComCadastro = 0
vendaSemCadastro = 0
consultasMarcadas = 0

semCadastro.addEventListener("click", e => {
    vendaSemCadastro++
    alert(`Venda do item ${items.value} realizada com sucesso!`)
    realizarVenda(Number(quantidade.value), Number(preco.value))
})

comCadastro.addEventListener("click", e => {
    let cpfCadastro = prompt("Insira o CPF do cliente: ")
    if (verificaCPF(cpfCadastro)) {
        alert(`Venda do item ${items.value} realizada com sucesso!`)
        realizarVenda(Number(quantidade.value), Number(preco.value))
        vendaComCadastro++
    }
})

adicionaItem.addEventListener("click", e => {
    e.preventDefault()
    if (prompt("Insira a senha do Gerente: ") == 1010) {
        novoItem = prompt("Insira o nome do novo item: ")
        opcoes.innerHTML += `<option value="${novoItem}" class="${novoItem}"></option>`
        alert("Item inserido com sucesso.")
    } else {
        alert("Senha invalida!")
    }
})

removerItem.addEventListener("click", e => {
    e.preventDefault()
    if (prompt("Insira a senha do Gerente: ") == 1010) {
        removeItem = prompt("Insira o nome do item para deletar: ")
        let lista = document.getElementsByClassName(`${removeItem}`)
        console.log(lista)
        for (let i = 0; i < lista.length; i++) {
            lista[i].remove()
        }
        alert("Item removido com sucesso.")
    } else {
        alert("Senha invalida!")
    }
})

marcarConsulta.addEventListener("click", e => {
    e.preventDefault()
    let cpfC = prompt("Insira o CPF do cliente para marcar a consulta: ")
    if (verificaCPF(cpfC)) {
        data = prompt("Digite a data da consulta")
        horario = prompt("Digite o horario")
        datas[index] = data
        horarios[index] = horario
        alert("Consulta marcada para o dia " + data + " e às " + horario + " horas ")
        consultasMarcadas++
    }
})

verificarConsulta.addEventListener("click", e => {
    e.preventDefault()
    let cpfV = prompt("Insira o CPF do cliente para marcar a consulta: ")
    datav = datas[index]
    horariov = horarios[index]
    if (verificaCPF(cpfV)) {
        if (datav == undefined) {
            alert("O cliente não tem consulta marcada!")
        } else {
            alert(`O cliente está marcado para o dia ${datav} e às ${horariov} horas`)
        }
    }else {
        alert("O cliente não tem consulta marcada!")
    }
})

verificarAnimal.addEventListener("click", e => {
    e.preventDefault()
    cpfA = prompt("Insira o CPF do cliente para encontrar o animal: ")
    if(verificaCPF(cpfA)) {
        alert(`
        Animal cadastrado neste CPF: 
        Nome: ${cachorros[index]}
        Raça: ${racas[index]} 
        `)
        confirmacao = prompt("Você deseja alterar o cadastro do animal? \nDigite 'SIM' ou 'NÃO'")
        if(confirmacao.toLowerCase() === 'sim'){
            if (prompt("Insira a senha do Gerente: ") == 1010) {
                novoNome = prompt("Insira um nome para o animal: ")
                novaRaca = prompt("Insira uma raça para o animal: ")
                cachorros[index] = novoNome
                racas[index] = novaRaca
            } else {
                alert("Senha invalida!")
            }
        }else {
            alert("OK!")
        }
    }
})

removerCadastro.addEventListener("click", e => {
    e.preventDefault()
    cpfRemove = prompt("Insira o CPF para remover o cadastro: ")
    if (verificaCPF(cpfRemove)) {
        if (prompt("Insira a senha do Gerente: ") == 1010) {
            clientes.splice(index, 1)
            nomesClientes.splice(index, 1)
            cachorros.splice(index, 1)
            racas.splice(index, 1)
            alert("Cliente removido com sucesso!")
        } else {
            alert("Senha invalida!")
        }
    }
})

total.addEventListener("click", e => {
    e.preventDefault()
    verifica = prompt("Você tem certeza que deseja finalizar o caixa? \nDigite 'SIM' ou 'NÃO'")
    if (verifica.toLowerCase() === 'sim') {
        if (prompt("Insira a senha do Gerente: ") == 1010) {
            alert(`
            Quantidade de itens vendidos: ${totalitems}
            Total do caixa: R$${totalcaixa}
            Vendas realizadas com cadastro: ${vendaComCadastro}
            Vendas realizadas sem cadastro: ${vendaSemCadastro}
            Consultas marcadas hoje: ${consultasMarcadas}
            `)
            alert("Muito obrigado por usar nosso sistema!")
        } else {
            alert("Senha invalida!")
        }
    }else {
        alert("OK!")
    }
})


function verificaCPF(cpf) {
    if (validaCPF(cpf)) {
        if (verificaCliente(cpf)) {
            alert(`
            Cliente encontrado:
            Nome: ${nomesClientes[index]}
            CPF: ${clientes[index]}

            Cachorro cadastrado: ${cachorros[index]} 
            Raça: ${racas[index]}
            `)
            return true
        } else {
            confirmacao = prompt("Ainda não existe cliente neste CPF! \nDeseja realizar o cadastro? \nDigite 'SIM' para realizar o cadastro e 'NÃO' para cancelar: ")
            if (confirmacao.toLowerCase() === 'sim') {
                nomecliente = prompt("Insira um nome para inserir no cadastro: ")
                cachorro = prompt("Insira o nome do cachorro do cliente: ")
                raca = prompt("Insira a raça do cachorro: ")
                clientes.push(cpf)
                nomesClientes.push(nomecliente)
                cachorros.push(cachorro)
                racas.push(raca)
                alert("Cliente cadastrado com sucesso!")
                return true
            } else {
                alert("OK!")
                return false
            }
        }
    } else {
        alert("CPF inválido")
        alert("Por favor, insira um CPF válido")
    }
}

function validaCPF(campo) {
    const CPF = new ValidaCPF(campo);
    if (!CPF.valida()) {
        return false;
    }
    return true;
}

function verificaCliente(cpf) {
    index = 0
    for (cliente of clientes) {
        if (cliente == cpf) {
            return true
        }
        index++
    }
    return false
}

function realizarVenda(quantidade, preco) {
    totalitems += quantidade
    totalcaixa += (preco * quantidade)
}