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

            const divDataImagem = document.createElement("div")
            divDataImagem.classList.add("data__imagem")

            const imagem = document.createElement("img")
            imagem.src = user.avatarUrl
            imagem.alt = "Avatar do usuário"

            divDataImagem.append(imagem)

            const nome = document.createElement("h2")
            nome.innerText = user.username

            div.append(divDataImagem, nome)
        }
    }

    static async renderizarPosts(){
        const listElement = document.querySelector(".posts__list")
        const posts = await ApiRequests.buscarPostagens()

        listElement.innerHTML = ""

        posts.data.forEach((post) => {
            const li = document.createElement("li")

            const divPostCabecalho = document.createElement("div")
            divPostCabecalho.classList.add("post__cabecalho")

            const divPostImage = document.createElement("div")
            divPostImage.classList.add("cabecalho__imagem")

            const imagem = document.createElement("img")
            imagem.src = post.user.avatarUrl
            imagem.alt = "Avatar do usuário"
            imagem.classList.add("imagem__cover")

            divPostImage.append(imagem)
            divPostCabecalho.append(divPostImage)

            const divPostConteudo = document.createElement("div")
            divPostConteudo.classList.add("post__conteudo")

            const nome = document.createElement("h2")
            nome.innerText = post.user.username

            const conteudo = document.createElement("p")
            conteudo.innerText = post.content

            divPostConteudo.append(nome, conteudo)


            const divPostRodape = document.createElement("div")
            divPostRodape.classList.add("post__rodape")

            const divRodapeData = document.createElement("div")
            divRodapeData.classList.add("rodape__data")

            let data
            if (post.updatedAt){
                data = new Date(post.updatedAt)
            } else {
                data = new Date(post.createdAt)
            }
            const dataElement = document.createElement("span")
            dataElement.innerText = data.toLocaleDateString()

            divRodapeData.append(dataElement)

            let divRodapeButtons = false

            if (post.user.id == localStorage.getItem("@blog:userId")){
                divRodapeButtons = document.createElement("div")
                divRodapeButtons.classList.add("rodape__buttons")

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

                divRodapeButtons.append(editarImagem, lixeiraImagem)
            }

            if (divRodapeButtons){
                divPostRodape.append(divRodapeData, divRodapeButtons)
            } else {
                divPostRodape.append(divRodapeData)
            }

            li.append(divPostCabecalho, divPostConteudo, divPostRodape)
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
