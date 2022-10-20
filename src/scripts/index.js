import { ApiRequests } from "./ApiRequests.js"
import {Toast} from "./Toastify.js"

class Logar{
    static efetuarLogin(){
        const form = document.querySelector("form")
        const entrarBtn = document.getElementById("entrar")

        entrarBtn.addEventListener("click", async (event) => {
            event.preventDefault()

            if (form.checkValidity()){
                const data = {
                    email: form.email.value,
                    password: form.senha.value
                }
    
                //console.log(data)
                await ApiRequests.efetuarLogin(data)
            } else {
                form.reportValidity()
            }

        })
    }

    static irParaRegistro(){
        const registrarBtn = document.getElementById("registrar")

        registrarBtn.addEventListener("click", (event) => {
            event.preventDefault()

            window.location.assign("/src/pages/registrar.html")
        })
    }
}

Logar.efetuarLogin()
Logar.irParaRegistro()