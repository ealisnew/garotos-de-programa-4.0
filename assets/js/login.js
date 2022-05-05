let usuario = document.querySelector(".usuario")
let senha = document.querySelector("#senha")
let submit = document.querySelector("#submit")

// Essa parte é so o login mesmo

submit.addEventListener("click", e => {
    if(usuario.value.toLowerCase() == "caixa"){
        if(Number(senha.value) == 2020){
            alert("Login feito com sucesso!")
            //Esse código em especifico ↓ é apenas para direcionar sem a necessidade de um clique do usuario
            window.location.href = "../caixa.html"
        }else {
            alert("Usuário ou senha incorreto!")
        }
    }else{
        alert("Usuário ou senha incorreto!")
    }
})