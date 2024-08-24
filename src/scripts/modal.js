import { insertedValues } from "./valuesDatabase.js"
import { renderTransactionList } from "./index.js"

export function newValue () {
    const input = document.querySelector('#new_value')
    const button = document.querySelector('#add_newValue')
    const entrada = document.querySelector('#input_value')
    const saida = document.querySelector('#output_value')
    const modalBut = document.querySelector('.register_value')
    const modal = document.querySelector('.modal')
    const closeModalButton = document.querySelector('.close_modal')
    const cancelar = document.querySelector('.button_cancel')

    modalBut.addEventListener('click', ()=>{
        modal.showModal()
    })

    let categoryID = ''
    entrada.addEventListener('click', function(){
        categoryID = 0
    })
    saida.addEventListener('click', function(){
        categoryID = 1
    })
 
    button.addEventListener('click', function() {
        const value = parseFloat(input.value).toFixed(2);
        if (categoryID === '') {
            alert('Por favor, selecione uma categoria.');
            return;
        }
    
        if (!isNaN(value) && value !== " " && input.value.trim() !== '') {
            const newData = {
                id: insertedValues.length + 1,
                value: value,
                categoryID: categoryID
            };
            insertedValues.push(newData);
           renderTransactionList(insertedValues);
            input.value = '';
            modal.close();
        } else {
            alert('Preencha o campo com um valor válido');
        }
    });

    closeModalButton.addEventListener('click', closeModal)
    cancelar.addEventListener('click', closeModal)
    
}
function closeModal(){
    const modal = document.querySelector('.modal') 
    modal.close()
}
