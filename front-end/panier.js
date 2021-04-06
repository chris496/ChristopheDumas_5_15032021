////////// Déclaration des variables ///////////

const urlPost = `http://127.0.0.1:3000/api/teddies/order`;
const teddiesInLocalstorage = JSON.parse(localStorage.getItem("article"));
const products = teddiesInLocalstorage
console.log(products)


////////// Fonctions //////////

// Fonction pour afficher les articles du panier

function addTeddiesInBasket(){
    if(teddiesInLocalstorage === null){
        document.getElementById("addToCart").innerHTML = `<div class="text-center"><p>Votre panier est vide</p></div>`
    }
    else{
        for (let properties of teddiesInLocalstorage){
            document.getElementById("addToCart").innerHTML += 
            `<div class="row" id="deleteRow">
                <div class="col pb-2">
                    <div class="row d-flex align-items-center">
                        <div class="col d-flex align-items-center">
                            <img src=${properties.imageUrl} alt="peluche" class="teddie ml-4" width=80px>
                            <p class="ml-3" id="test">${properties.name}</p>
                        </div>
                        <div class="col text-center">
                            <p>Black</p>
                        </div>
                        <div class="col text-center">
                            <p>${properties.price /100 + " " + "€"}</p>
                        </div>
                        <div class="col text-center">
                            <button type="button" class="btn btn-danger" id="delete">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
}

addTeddiesInBasket()

// Evenement pour supprimer tout les articles

const allDelete = document.getElementById("alldelete")
const remove = document.getElementById("addToCart");

allDelete.addEventListener("click", function alldelete(){
    localStorage.clear("article")
    remove.remove()
})

/*const buttonDelete = document.getElementById("delete");
const deleteRow = document.getElementById("deleteRow");
const test = document.getElementById("test");

buttonDelete.addEventListener("click", func)
function func(e){
    console.log(e)
    deleteRow.remove()
    deleteOneRow(test)
}

function deleteOneRow(deleteRow){
    let array
    if (teddiesInLocalstorage === null){
        array = []
    }
    else{
        array = teddiesInLocalstorage
    }
    const teddieIndex = deleteRow.innerText
    console.log(array.indexOf(teddieIndex))
    array.splice(array.indexOf(teddieIndex), 1)
    console.log(array)
    localStorage.setItem("article", JSON.stringify(teddiesInLocalstorage));
}*/

////////// Validation formulaire avec regex //////////

/*const form = document.getElementById("validForm");
form.email.addEventListener('change', function(){
    validEmail(this)
})

const validEmail = function(email){
    const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
    let testEmail = emailRegExp.test(email.value)
    if(testEmail == true){
        document.getElementById("errorEmail").innerHTML = "adresse email valide"
        return true
    }else{
        document.getElementById("errorEmail").innerHTML = "adresse email non valide"
        return false
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault()
    if(validEmail(form.email)){
        form.submit()
        
    }
})*/

/////////////////////////////////// a finir pour les autres champs ////////////////////////////////

//let formData = new FormData(form)

//console.log(formData)



document.getElementById("buttonForm").addEventListener("click", function(e){
e.preventDefault()

const contact = {
    lastName: document.getElementById("lastName").value,
    firstName: document.getElementById("firstName").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value
    }

    localStorage.setItem("contact", JSON.stringify(contact))
    //console.log(formObject)

    fetch('http://127.0.0.1:3000/api/teddies/order', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify ({contact, products})
})
.then(response => response.json())
.then(response => localStorage.setItem("idCommande", JSON.stringify(response.orderId)));

//document.location.href="./confirmation.html"

})



/*function test(){
    window.location.href="./confirmation.html"
}*/

/*let contact = {
    firstName: "jean",
    lastName: "reyo",
    address:"23 fesffs fsef ff",
    city: "feurs",
    email: "efsefe@fdf"
}

console.log(contact)

let products = ["5be9c8541c9d440000665243"]

console.log(products)

//let commande = {contact: {}, products: []}

fetch('http://127.0.0.1:3000/api/teddies/order', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify ({contact, products})
})
.then(response => response.json())
.then(response => console.log(response));


*/

////////// somme des articles /////////

function sum(){
    const sum = JSON.parse(localStorage.getItem("article"))
    let myTotal = 0     
    for (let properties of sum){
        myTotal += properties.price
    }
    return myTotal
}

document.getElementById("sumTeddies").innerHTML = sum() /100 + " " + "€";
JSON.stringify(localStorage.setItem("sum", sum()/100))