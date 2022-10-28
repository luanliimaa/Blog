export class Modal{
    static mostrar(type){
        if (type){
            const modal = document.getElementById(`modal-${type}`)
            modal.classList.add("show-modal")
        }
    }

    static fechar(type){
        if (type){
            const modal = document.getElementById(`modal-${type}`)
            if (modal){
                modal.classList.toggle("show-modal")
            }
        } 
    }

    static fecharModals(){
        const fecharBtns = document.querySelectorAll(".modal-close")
        fecharBtns.forEach(btn => {
            btn.addEventListener("click", event => {
                const modal = event.path[3]
                modal.classList.toggle("show-modal")
            })
        })

        const modal = document.querySelector(".modal-wrapper")
        if (modal){
            modal.addEventListener("click", (event) => {
                if (event.target === modal){
                    modal.classList.toggle("show-modal")
                }
            })
        }
    }
}

