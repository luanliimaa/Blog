import { ApiRequests } from "./ApiRequests.js";
import { Modal } from "./modal.js";
import { Toast } from "./Toastify.js";

class HomePage{
    static async renderizarInfoUsuario(){
        const userId = window.localStorage.getItem("@blog:userId")
        if (userId){
            const user = await ApiRequests.buscarUsuario(userId)
            const div = document.querySelector(".user__data")

            div.innerHTML = ""

            const imagem = document.createElement("img")
            imagem.src = user.avatarUrl
            imagem.alt = "Avatar do usuário"

            const nome = document.createElement("h2")
            nome.innerText = user.username

            div.append(imagem, nome)
        }
    }

    static async renderizarPosts(){
        const listElement = document.querySelector(".posts__list")
        const posts = await ApiRequests.buscarPostagens()

        listElement.innerHTML = ""

        posts.data.forEach((post) => {
            const li = document.createElement("li")

            const divUserInfo = document.createElement("div")
            divUserInfo.classList.add("post__user")

            const imagem = document.createElement("img")
            imagem.src = post.user.avatarUrl
            imagem.alt = "Avatar do usuário"

            const nome = document.createElement("h2")
            nome.innerText = post.user.username

            divUserInfo.append(imagem, nome)

            const divPostContent = document.createElement("div")
            divPostContent.classList.add("post__content")

            const conteudo = document.createElement("p")
            conteudo.innerText = post.content

            const divPostInfo = document.createElement("div")
            divPostInfo.classList.add("content_info")

            let data
            if (post.updatedAt){
                data = new Date(post.updatedAt)
            } else {
                data = new Date(post.createdAt)
            }
            const dataElement = document.createElement("span")
            dataElement.innerText = data.toLocaleDateString()

            let divPostDono = false

            if (post.user.id == localStorage.getItem("@blog:userId")){
                divPostDono = document.createElement("div")
                divPostDono.classList.add("content__dono")

                const editarImagem = document.createElement("img")
                editarImagem.src = "../img/editar.png"
                editarImagem.alt = "Icone de editar"
                editarImagem.dataset.id = post.id

                const lixeiraImagem = document.createElement("img")
                lixeiraImagem.src = "../img/lixeira.png"
                lixeiraImagem.alt = "Icone de lixeira"
                lixeiraImagem.dataset.id = post.id

                editarImagem.addEventListener("click", async (event) => {
                    const id = event.target.dataset.id
                    const editarElement = document.querySelector(".editar__text")
                    const editarButton = document.querySelector(".editar__button")
                    editarButton.dataset.id = id
                    const post = await ApiRequests.buscarPostagem(id)
                    editarElement.value = post.content

                    Modal.mostrar("editar")
                })

                lixeiraImagem.addEventListener("click", async (event) => {
                    const id = event.target.dataset.id
                    const deletarElement = document.querySelector(".deletar__text")
                    const deletarButton = document.querySelector(".deletar__button")
                    deletarButton.dataset.id = id
                    const post = await ApiRequests.buscarPostagem(id)
                    deletarElement.value = post.content

                    Modal.mostrar("deletar")
                })

                divPostDono.append(editarImagem, lixeiraImagem)
            }

            if (divPostDono){
                divPostInfo.append(dataElement, divPostDono)
            } else {
                divPostInfo.append(dataElement)
            }

            divPostContent.append(conteudo, divPostInfo)

            li.append(divUserInfo, divPostContent)
            listElement.append(li)
        })

        Modal.fecharModals()
    }

    static criarPost(){
        const postarElement = document.querySelector(".postar__text")
        const postarButton = document.querySelector(".postar__button")

        postarButton.addEventListener("click", async () => {
            if (postarElement.value == "" || postarElement.value.length <= 0){
                return Toast.create("Digite algum comentario", "red", 5000)
            }
            const data = {
                content: postarElement.value
            }

            const res = await ApiRequests.criarPost(data)
            if (res){
                postarElement.value = ""
                HomePage.renderizarPosts()
            }
        })
    }

    static editarPost(){
        const editarElement = document.querySelector(".editar__text")
        const editarButton = document.querySelector(".editar__button")

        editarButton.addEventListener("click", async (event) => {
            const id = event.target.dataset.id
            if (editarElement.value == "" || editarElement.value.length <= 0){
                return Toast.create("Digite algum comentario", "red", 5000)
            }
            const data = {
                content: editarElement.value
            }

            const res = await ApiRequests.editarPost(data, id)
            if (res){
                Toast.create("Comentario editado com sucesso", "green", 5000)
                HomePage.renderizarPosts()
                Modal.fechar("editar")
            }
        })
    }

    static deletarPost(){
        const deletarButton = document.querySelector(".deletar__button")

        deletarButton.addEventListener("click", async (event) => {
            const id = event.target.dataset.id

            const res = await ApiRequests.deletarPost(id)
            if (res){
                Toast.create("Comentario deletado com sucesso", "green", 5000)
                HomePage.renderizarPosts()
                Modal.fechar("deletar")
            }
        })
    }
}


HomePage.deletarPost()
HomePage.criarPost()
HomePage.editarPost()
HomePage.renderizarInfoUsuario()
HomePage.renderizarPosts()
