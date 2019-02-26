class GridViewController {

    constructor(component, model){
        this._component = component;
        this._model = model;
    }

    templateHeader(model) {

        return `
            ${model.map(T => `
            <tr>
                <th class="col-xs-1">${T.coluna1}</th>
                <th class="col-xs-3">${T.coluna2}</th>
                <th class="col-xs-4">${T.coluna3}</th>
                <th class="col-xs-4">Ações</th>
            </tr>     
            `).join('')}
        `;
    } 

    templateBody(model) {

        return `
            <tr>
                <td class="col-xs-3">${model.Nome}</td>
                <td class="col-xs-3">${model.Email}</td>
                <td class="col-xs-2">${model.Idade}</td>
                <td class="col-xs-2">${model.Nascimento}</td>
                <td class="col-xs-2 actions">
                    <a id="btn-edit" href="javascript:void(0)" class="btn btn-warning btn-sm" onclick="controller.editRow()" >Editar</a>
                    <a id="btn-remove" data-toggle="modal" data-target="#excludeConfirm" class="btn btn-danger btn-sm" data-toggle="modal">Excluir</a>
                </td>
            </tr>     
            `
    } 

    insertRow(model){
        this._component.getElementsByTagName("tbody")[0].insertAdjacentHTML('afterbegin', this.templateBody(model));
    }

    removeRow(){
        this._component.getElementsByTagName('tbody')[0].deleteRow(0);
        $('#excludeConfirm').modal('hide');
    }
    
}