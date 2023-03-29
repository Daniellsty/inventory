import categoryView from "./categoryView.js";
import productView from "./productView.js";

class app{


    constructor(){

        categoryView.setApp()
        categoryView.createdListItems()


        productView.setApp()
        productView.createlistItems(productView.products)
    }
    
}

new app()