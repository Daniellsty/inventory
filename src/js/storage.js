const product=[
    {id:1,
        title:'react.js',
        category:'frontend',
        updated:'2023-03-13T15:25:53.477Z',
        },
        {id:2,
            title:'vue.js',
            category:'frontend',
            updated:'2023-03-13T15:25:53.477Z',
            },
            {id:3,
                title:'next.js',
                category:'frontend',
                updated:'2023-03-13T15:25:53.477Z',
                },
]


const category=[

    {id:1,
     title:'frontend',
     description:'frontend of app',
     createdAt:'2023-03-13T15:25:53.477Z',
    },
    {id:2,
        title:'backend',
        description:'backend of app',
        createdAt:'2023-02-13T15:25:53.477Z',
       },
    
]


export default class storage {


    static getAllCategories(){

        const savedCategory = JSON.parse(localStorage.getItem('category')) || []


        savedCategory.sort((a,b)=>{

         return new Date(a.createdAt) > new Date(b.createdAt) ?  -1 : 1;

        })

        return savedCategory


    }

    static setAllCategories(categorytosave){

        const savedCategory = storage.getAllCategories()
       const existedItem = savedCategory.find((item)=>{

           return item.id === categorytosave.id
        })

        if(existedItem){

            existedItem.title = categorytosave.title
            existedItem.description = categorytosave.description
        }else{

            categorytosave.id = new Date().getTime()
            categorytosave.createdAt = new Date().toISOString()
            savedCategory.push(categorytosave)
        }

        localStorage.setItem('category', JSON.stringify(savedCategory))

    }


    static getAllProducts(value = 'newest'){
        
        const savedProduct = JSON.parse(localStorage.getItem('product')) || []


        if(value === 'newest'){
            savedProduct.sort((a,b)=>{

                return  new Date(a.createdAt) > new Date(b.createdAt) ?  -1 : 1;
        
                })
        
        }else if(value === 'oldest'){
            savedProduct.sort((a,b)=>{

                return  new Date(a.createdAt) > new Date(b.createdAt) ?  1 : -1;
        
                })
           
        }
        
       
        return savedProduct

    }

    static setAllProducts(productsTOSave){
        const savedProduct = storage.getAllProducts()
     
      



        const existedItem = savedProduct.find((item)=>{
            return item.id === productsTOSave.id
         })
 
         if(existedItem){
 
             existedItem.title = productsTOSave.title
             existedItem.quantity = productsTOSave.quantity
             existedItem.category = productsTOSave.category
         }else{
 
             productsTOSave.id = new Date().getTime()
             productsTOSave.createdAt = new Date().toISOString()
             savedProduct.push(productsTOSave)
         }
 
         localStorage.setItem('product', JSON.stringify(savedProduct))
 
     }


     static removeBtn(id){

       const deletedProduct = this.getAllProducts().filter((item)=>{

           return item.id != id
        })

        localStorage.setItem('product',JSON.stringify(deletedProduct))
     }


    

}

 new storage()