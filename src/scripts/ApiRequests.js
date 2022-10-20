import { Toast } from "./Toastify.js";

export class ApiRequests {

    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blog:token")
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async criarUsuario(body){
        const novoUsario = await fetch(`${this.baseUrl}/users/register`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            window.location.assign("../../index.html")

            return res
        })
        .catch(err => console.log(err))

        return novoUsario
    }

    static async efetuarLogin(body){
        const usuario = await fetch(`${this.baseUrl}/users/login`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.token)
            console.log(res.userId)
            window.localStorage.setItem("@blog:token", res.token)
            window.localStorage.setItem("@blog:userId", res.userId)
            window.location.assign("src/pages/homePage.html")
            return res
        })
        .catch(err => console.log(err))

        return usuario
    }
}