import { ApiRequests } from "./ApiRequests.js"
import {Toast} from "./Toastify.js"

class Logar{
    static efetuarLogin(){
        /*
        const token = window.localStorage.getItem("@blog:token")
        if (token){
            window.location.assign("src/pages/homePage.html")
        }
        */

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
                const res = await ApiRequests.efetuarLogin(data)
                if (res.message){
                    Toast.create(res.message, "red", 5000)
                } else {
                    window.localStorage.setItem("@blog:token", res.token)
                    window.localStorage.setItem("@blog:userId", res.userId)
                    window.location.assign("src/pages/homePage.html")
                }
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