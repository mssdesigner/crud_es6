class MessagesController {

    constructor(element) {
        this._element = element;
    }

    template(typeMessage, txtMessage) {

        return `
            <div class="alert alert-${typeMessage} alert-dismissible fade in animated slideInDown">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                ${txtMessage}
            </div>
        `;
    }
    
    update(typeMessage, txtMessage) {
        this._element.innerHTML = this.template(typeMessage, txtMessage); 
        this._element.querySelector('div').style.opacity = 1; 
        setTimeout(() =>  this._element.querySelector('div').style.display = "none", 5000);
    }
   
}