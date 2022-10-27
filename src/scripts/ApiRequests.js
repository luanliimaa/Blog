import { Toast } from "./Toastify.js";

export class ApiRequests {

    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = window.localStorage.getItem("@blog:token")
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
            //window.location.assign("../../index.html")

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
        .then(res =>  res)
        .catch(err => console.log(err))

        return usuario
    }

    static async buscarUsuario(id){
        const user = await fetch(`${this.baseUrl}/users/${id}`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        return user
    }

    static async buscarPostagens(){
        const posts = await fetch(`${this.baseUrl}/posts?page=1`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        return posts
    }

    static async buscarPostagem(id){
        const post = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        return post
    }

    static async criarPost(body){
        const post = await fetch(`${this.baseUrl}/posts`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        return post
    }

    static async editarPost(body, id){
        const post = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        return post
    }

    static async deletarPost(id){
        const post = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "DELETE",
            headers: this.headers
        })
        .then(res => res)
        .catch(err => console.log(err))

        return post
    }
}