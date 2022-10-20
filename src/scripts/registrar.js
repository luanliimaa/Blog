import { ApiRequests } from "./ApiRequests.js"
import {Toast} from "./Toastify.js"

class Registro{

    static criarUsuario(){
        const form = document.querySelector("form")
        const registrarBtn = document.getElementById("registrar")

        registrarBtn.addEventListener("click", async (event) => {
            event.preventDefault()

            if (form.checkValidity()){
                const data = {
                    username: form.nome.value,
                    email: form.email.value,
                    avatarUrl: form.foto.value,
                    password: form.senha.value
                }
    
                //console.log(data)
                await ApiRequests.criarUsuario(data)
            } else {
                form.reportValidity()
            }

        })
    }

    static irParaLogin(){
        const loginBtn = document.getElementById("login")

        loginBtn.addEventListener("click", (event) => {
            event.preventDefault()

            window.location.assign("../../index.html")
        })
    }
}

Registro.criarUsuario()
Registro.irParaLogin()