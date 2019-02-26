class Controller{
    constructor(){
        this.ViewModel = {}
        this.Component = document.getElementById('component-gridview');
        this.GridView = new GridViewController(this.Component);
        this.Messages = new MessagesController(document.getElementById('messages'));
        this.BtnAdd = document.getElementById('btn-add');
        this.BtnSave = document.getElementById('btn-save');
        this.ComponentName = document.getElementById('usr');
        this.ComponentEmail = document.getElementById('email');
        this.ComponentIdade = document.getElementById('idade');
        this.ComponentNascimento = document.getElementById('nascimento');
        this.Index = null;
    }

    load(){
       this.loadComponentName();
       this.loadComponentEmail();
       this.loadComponentIdade();
       this.loadComponentNascimento();  
       
    }

    add(){
        
        if(this.ComponentName.value === ""){
            this.Messages.update("danger", "O campo nome está vazio");
            this.ComponentName.focus();
            return false;
        }
        if(this.ComponentEmail.value === ""){
            this.Messages.update("danger", "O campo email está vazio");
            this.ComponentEmail.focus();
            return false;
        }
        if(this.ComponentIdade.value === ""){
            this.Messages.update("danger", "O campo idade está vazio");
            this.ComponentIdade.focus();
            return false;
        }
        if(this.ComponentNascimento.value === ""){
            this.Messages.update("danger", "O campo data de nascimento está vazio");
            this.ComponentNascimento.focus();
            return false;
        }
        this.GridView.insertRow(this.ViewModel);
        this.ComponentName.value = "";
        this.ComponentEmail.value = "";
        this.ComponentIdade.value = "";
        this.ComponentNascimento.value = "";
        this.ViewModel = {};

        this.eventButtonEdit();
     }

     save(){

        this.Component.getElementsByTagName('tbody')[0].rows[this.Index].cells[0].innerHTML = this.ComponentName.value;
        this.Component.getElementsByTagName('tbody')[0].rows[this.Index].cells[1].innerHTML = this.ComponentEmail.value;
        this.Component.getElementsByTagName('tbody')[0].rows[this.Index].cells[2].innerHTML = this.ComponentIdade.value;
        this.Component.getElementsByTagName('tbody')[0].rows[this.Index].cells[3].innerHTML = moment(this.ComponentNascimento.value).format("DD/MM/YYYY");

        if(this.ComponentName.value === ""){
            this.Messages.update("danger", "O campo nome está vazio");
            return false;
        }
        if(this.ComponentEmail.value === ""){
            this.Messages.update("danger", "O campo email está vazio");
            return false;
        }
        if(this.ComponentIdade.value === ""){
            this.Messages.update("danger", "O campo idade está vazio");
            return false;
        }
        if(this.ComponentNascimento.value === ""){
            this.Messages.update("danger", "O campo data de nascimento está vazio");
            return false;
        }

        this.BtnAdd.style.display = "block";
        this.BtnSave.style.display = "none";
        document.getElementById('btn-remove').classList.remove('disabled');

        this.ComponentName.value = "";
        this.ComponentEmail.value = "";
        this.ComponentIdade.value = "";
        this.ComponentNascimento.value = "";
        this.ViewModel = {};

     }

    loadComponentName(){

        this.ComponentName.removeEventListener("blur", (e) => { });

        this.ComponentName.addEventListener("blur", (e) => {

            if (e.target.value !== "")
                this.ViewModel["Nome"] = e.target.value;
        });
    }

    loadComponentEmail(){

        this.ComponentEmail.removeEventListener("blur", (e) => { });

        this.ComponentEmail.addEventListener("blur", (e) => {

            if (e.target.value !== "")
                this.ViewModel["Email"] = e.target.value;
        });
    }

    loadComponentIdade(){

        this.ComponentIdade.removeEventListener("blur", (e) => { });

        this.ComponentIdade.addEventListener("blur", (e) => {

            if (e.target.value !== "")
                this.ViewModel["Idade"] = e.target.value;
        });
    }


    loadComponentNascimento(){

        this.ComponentNascimento.removeEventListener("blur", (e) => { });

        this.ComponentNascimento.addEventListener("blur", (e) => {

            if (e.target.value !== "")
                this.ViewModel["Nascimento"] = moment(e.target.value).format("DD/MM/YYYY");
        });
    }

    eventButtonEdit(){
        let lista = Array.from(this.Component.getElementsByTagName('tbody')[0].rows);

        lista.map((e) => { 
            e.querySelector("#btn-edit").addEventListener("click", () => {
                this.Index = e.rowIndex -1;
                document.querySelectorAll('#btn-remove')[this.Index].classList.add('disabled');
                this.ComponentName.value = e.cells[0].innerText;
                this.ComponentEmail.value = e.cells[1].innerText;
                this.ComponentIdade.value = e.cells[2].innerText;
                this.ComponentNascimento.value = moment(e.cells[3].innerText, "DD/MM/YYYY").format("YYYY-MM-DD");
            })
        })
    }

    editRow(){
        this.BtnAdd.style.display = "none";
        this.BtnSave.style.display = "block";
    }

    tableToJSON(tableSelector){
        let array = new Array();
        let $thead = $(tableSelector).find("thead > tr > th");
        let $tbody = $(tableSelector).find("tbody > tr");
      
        $tbody.each(function(x){
          var obj = new Object();  
          var $row = $(this);
          $thead.each(function(i){
            var attributeName = $(this).text();
            obj[attributeName] = $row.find("td")[i].innerText
          });
          array.push(obj);
        });	 
        return array;
    }
}