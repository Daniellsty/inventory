import storage from "./storage.js"
const productTitle = document.querySelector('#product-title')
const productQuantity = document.querySelector('#product-quantity')
const selectCategory = document.querySelector('#category-select')
const addBtn = document.querySelector('#add-product-btn')
const productContainer = document.querySelector('.product-list-container')
const search = document.querySelector('.search-product')
const selectProduct = document.querySelector('#sort-product')
class productPreviw{

    constructor(){

        addBtn.addEventListener('click',(e)=> this.addNewProduct(e) )
        search.addEventListener('input',(e)=> this.searchProduct(e))
        selectProduct.addEventListener('change',(e)=> this.selectproducts(e))
        this.products= []
        

    }

    addNewProduct(){

        if(!productTitle || !productQuantity || !selectCategory) return

        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = selectCategory.value
        this.createlistItems(this.products)
        storage.setAllProducts({title,quantity,category})

        productTitle.value = ' '
        productQuantity.value = ' '
        window.location.reload()
    }


    setApp(){

        this.products = storage.getAllProducts()

    }

    createlistItems(products){

       
        let result = ' ';
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        products.forEach((item)=>{
            
            
            const mainItems = storage.getAllCategories().find((c)=> {
              return  c.id == item.category
            })
           
            result += `<div class="flex justify-between my-5" id="products-list">
            <div class="right">
            <h1 class="text-slate-400 mx-5">${item.title}</h1>
            </div>
            <div class="left flex items-center text-slate-400 mb-5">
            <div class="date">
            <h1>${new Date().toLocaleDateString("fa-ir" , options)}</h1> 
            </div>
            <div class="title mx-5">
            <h1 style=" padding:2px 10px" class="border p-1 mx-2 rounded-full"> ${mainItems.title} </h1>
            </div>
            <div class="number mx-5">
            <h1 style=" padding:2px 15px" class=" border  p-2 mx-2 rounded-full mx-2">${item.quantity}</h1>
            </div>
            <div class="delete  m-5">
            <button  style="width:60px; padding:5px;" class="delete-btn  border border-red-300 w-[10px] h-4  text-red-500 rounded-full" data-id= ${item.id}>delete</button>
            </div>
            </div>
            </div> 

            `;
            
            
            
        });
        productContainer.innerHTML = result;
            let deleteBtn = document.querySelectorAll('.delete-btn')
            deleteBtn.forEach((item)=>{
              const deletedProduct =  item.addEventListener('click',(e)=> this.deleteBtn(e))
            })
}

    deleteBtn(e){

          
        const value = e.target.getAttribute('data-id');
        storage.removeBtn(value)
        this.products = storage.getAllProducts();
        this.createlistItems(this.products)
        
    }


    searchProduct(e){

        const value = e.target.value.toLowerCase().trim();
        const searchedProduct =  this.products.filter((item)=>{
           
           return  item.title.includes(value)
        })

        this.createlistItems(searchedProduct)
    }

    selectproducts(e){

       
        const value = e.target.value;
        this.products = storage.getAllProducts(value)
        this.createlistItems(this.products)
    }

}

export default new productPreviw()