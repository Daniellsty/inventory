import storage from "./storage.js";
const categoryTitle = document.querySelector('#category-title')
const categorydescription = document.querySelector('#category-desc')
const addCategory = document.querySelector("#add-category-btn")
const selectCategory = document.querySelector('#category-select')

class categoryView{


    constructor(){

        addCategory.addEventListener('click',(e)=> this.addnewCategory(e))
        this.categories = []
    }

   
    setApp(){

        this.categories = storage.getAllCategories()
    }

    addnewCategory(e){

   
        const title = categoryTitle.value
        const description = categorydescription.value
        if(!title || !description) return

        storage.setAllCategories({title,description})
        this.createdListItems()
        categoryTitle.value =' '
        categorydescription.value = ' '
        
    }

    createdListItems(){

        let result= `<option value=""> select a category ... </option>`;
        this.categories.forEach((item)=>{
           
          result +=  `
             <option value="${item.id}"> ${item.title} </option>
            `
        });
     
        selectCategory.innerHTML = result;
    }


}

export default new categoryView()