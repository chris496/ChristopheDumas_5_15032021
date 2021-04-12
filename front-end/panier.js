////////// Déclaration des variables ///////////

const urlPost = `http://127.0.0.1:3000/api/teddies/order`;
const teddiesInLocalstorage = JSON.parse(localStorage.getItem("article"));
const products = teddiesInLocalstorage

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
                    <div class="row d-flex">
                        <div class="col d-flex justify-content-center">
                            <img src=${properties.imageUrl} alt="peluche" class="teddie" width=80px>
                            <p class="ml-3" id="test">${properties.name}</p>
                        </div>
                        <div class="col text-center">
                            <p id="yo">Black</p>
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
    window.location.reload()
})

// Evenement pour supprimer un article
let btnsuppr = document.querySelectorAll("#deleteRow")
for (let i=0; i<btnsuppr.length;i++){
    btnsuppr[i].addEventListener("click", (e) =>{
        e.preventDefault()
        teddiesInLocalstorage.splice(teddiesInLocalstorage.indexOf(teddiesInLocalstorage[i]),1)
        localStorage.setItem("article", JSON.stringify(teddiesInLocalstorage));  
        window.location.reload()
    })
}

// Fonction pour faire la somme des articles /////////

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

// Evenement pour envoyer les coordonnées et les articles commandés

document.getElementById("buttonForm").addEventListener("click", function postForm(e){
e.preventDefault()
if(validLastName(form.lastName) && validFirstName(form.firstName) && validEmail(form.email) && validAdress(form.address) && validCity(form.city)) {
    // récupération des champs du formulaire saisis par l'utilisateur
    const contact = {
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value
        }
        // envoi des informations dans le localstrorage
        localStorage.setItem("contact", JSON.stringify(contact))
        // envoi de la commande complète au serveur
        fetch('http://127.0.0.1:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify ({contact, products})
    })
    .then(response => response.json())
    // récupération du retour d'info du serveur (id de commande) et envoi dans localstorage
    .then(function(response) {
        localStorage.setItem("idCommande", JSON.stringify(response.orderId))
        window.location.href='./confirmation.html'
    });
  }
})

////////// Validation formulaire avec regex //////////

const form = document.getElementById("validForm");

form.addEventListener('change', function(){
    validLastName(lastName)
    validFirstName(firstName)
    validEmail(email)
    validAdress(address)
    validCity(city)
})

const validLastName = function(lastName){
    const nameRegExp = new RegExp('^[A-z- ]+$')
    let testname = nameRegExp.test(lastName.value)
    console.log(testname)
    if(testname == true){
        document.getElementById("errorlastName").innerHTML = ""
        return true
    }else{
        document.getElementById("errorlastName").style.color = "red"
        document.getElementById("errorlastName").innerHTML = "Nom non valide"
        return false
    }
}

const validFirstName = function(firstName){
    const pnameRegExp = new RegExp('^[A-z- ]+$') 
    let retestname = pnameRegExp.test(firstName.value)
    console.log(retestname)
    if(retestname == true){
        document.getElementById("errorfirstName").innerHTML = ""
        return true
    }else{
        document.getElementById("errorfirstName").style.color = "red"
        document.getElementById("errorfirstName").innerHTML = "Prénom non valide"
        return false
    }
}

const validEmail = function(email){
    const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
    let testEmail = emailRegExp.test(email.value)
    console.log(testEmail)
    if(testEmail == true){
        document.getElementById("errorEmail").innerHTML = ""
        return true
    }else{
        document.getElementById("errorEmail").style.color = "red"
        document.getElementById("errorEmail").innerHTML = "Adresse email non valide"
        return false
    }
}

const validAdress = function(address){
    const nameRegExp = new RegExp('^[A-z- ]+$')
    let testname = nameRegExp.test(address.value)
    console.log(testname)
    if(testname == true){
        document.getElementById("erroraddress").innerHTML = ""
        return true
    }else{
        document.getElementById("erroraddress").style.color = "red"
        document.getElementById("erroraddress").innerHTML = "Adresse non valide"
        return false
    }
}

const validCity = function(city){
    const nameRegExp = new RegExp('^[A-z- ]+$')
    let testname = nameRegExp.test(city.value)
    console.log(testname)
    if(testname == true){
        document.getElementById("errorcity").innerHTML = ""
        return true
    }else{
        document.getElementById("errorcity").style.color = "red"
        document.getElementById("errorcity").innerHTML = "Ville non valide"
        return false
    }
}
//const form = document.getElementById("validForm")

/*form.addEventListener('submit', function(e){
    e.preventDefault()
    
})*/

/*const form = document.getElementById("validForm")
const input = document.getElementById("lastName")
const errorInput = document.getElementById("error")
const regEx = /^[a-zA-Z-\s]+$/


form.addEventListener('submit', function(event){
    if (input.value == ""){
        errorInput.innerHTML = "Votre nom est obligatoire";
        event.preventDefault()
    } else if (regEx.test(input.value) == false){
        errorInput.innerHTML = "le nom doit comporter uniquement des lettres et des tirets";
        event.preventDefault()
    }
})*/

/////////////////////////////////// a finir pour les autres champs ////////////////////////////////




/*let formvalid = document.getElementById("buttonForm")
let lastname = document.getElementById("lastName")
let misslastname = document.getElementById("error")
let regex = /^[a-zA-Z-\s]+$/

formvalid.addEventListener('click', validation)

function validation(event){
    if(lastname.validity.valueMissing){
        event.preventDefault()
        misslastname.textContent = 'no name'

    }else if(regex.test(lastname.value) == false){
        event.preventDefault()
        misslastname.textContent = 'no word name'
    }
}*/

/*const buttonDelete = document.getElementById("delete")
const deleteRow = document.getElementById("deleteRow");
let bg = document.querySelector("#deleteRow p")
let btn = document.querySelectorAll("#yo")*/
