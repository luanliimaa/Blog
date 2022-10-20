export class Toast{
    static create(text, color, timer){

        Toastify({
            text: text,
            duration: timer,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: color,
            },
    }).showToast();
  }
}