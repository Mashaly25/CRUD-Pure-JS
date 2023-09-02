let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let catagory = document.getElementById('catagory')
let search = document.getElementById('search')
let submit = document.getElementById('submit')

let mood = "create"
let tmp


function getTotal() {
    if (price.value != ""){
        let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }
    else{
        total.innerHTML = ""
        total.style.background = '#ce3d3d'
    }
}


// Create product
let dataPro
if (localStorage.Product != null) {
    dataPro = JSON.parse(localStorage.Product)
} 
else {
    dataPro = []
}


submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catagory:catagory.value.toLowerCase(),
    }

    if(title.value != ''){
            if(mood === 'create'){
        if (newPro.count>1){
            for (let i=0; i<newPro.count;i++){
                dataPro.push(newPro)
            }
        }
        else{
            dataPro.push(newPro)
        }
        

    }
    else{
    }


        dataPro[tmp]= newPro
        mood= 'create'
        submit.innerHTML = 'Create'
        count.style.display= 'block'
    }

    localStorage.Product = JSON.stringify(dataPro) 
    clear()
    showData()

}



// Clear inputs

function clear(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catagory.value = '';
}


// Read

function showData(){
    getTotal()
    let table = ''
    for (let i = 0; i < dataPro.length; i++ ){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catagory}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>

    </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table
    let btnDeletAll = document.getElementById('deletAll')
    if (dataPro.length>0){
        btnDeletAll.innerHTML = `<button onclick='deletAll()'>Delete All (${dataPro.length})</button>`
    }
    else{
        btnDeletAll.innerHTML=''
    }
    
}
showData()



// delete

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.Product = JSON.stringify(dataPro)
    showData()
}

function deletAll(){
    dataPro.splice(0)
    localStorage.clear
    showData()
}

// Update

function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display= 'none'
    catagory.value = dataPro[i].catagory
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior: 'smooth'
    })
}


// Search 

let searchMood = 'title';

function getSearchMood(id){
    if( id === 'searchTitle'){
        searchMood = 'title'
        search.placeholder = 'Search By Title'
    }else{
        searchMood = 'catagory'
        search.placeholder = 'Search By Catagory'
    }
    search.focus()
    search.value = ''
    showData()
}

function searchData(value){
    console.log(value)
    let table = ''
    if (searchMood == 'title'){
        for(let i=0; i< dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catagory}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>

                </tr>
                `
            }
        }


    }
    
    else{
        for(let i=0; i< dataPro.length; i++){
            if(dataPro[i].catagory.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catagory}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>

                </tr>
                `
            }
        }
        
    }
    document.getElementById('tbody').innerHTML = table;
}