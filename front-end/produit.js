////////// Récupération de l'id dans l'url //////////

const recupId = window.location.search;
const urlSearch = new URLSearchParams(recupId);
const id = urlSearch.get("id");
console.log(id)

////////// Déclaration des variables ///////////

const urlApiId = `http://127.0.0.1:3000/api/teddies/${id}`
const teddieCard = document.getElementById("teddieCard")

////////// Fonctions //////////

// Fonction fetch pour récupérer le contenu de l'API

function getTeddies(){
    return fetch (urlApiId)
    .then(function(response){
        return response.json()
    })
    .then(function(teddies){
        return teddies
    })
    .catch(function(error){
        alert(error)
    })
}

// Fonction pour afficher la carte peluche sélectionnée sur la page accueil

async function displyOneTeddies(){
    const teddies = await getTeddies()
    teddieCard.innerHTML = 
        `<div class="card shadow">
            <img src="${teddies.imageUrl}" alt="peluche" class="card-img-top">
            <div class="card-body d-flex flex-column">
                <h5 class="cart-title">${teddies.name}</h5>
                <p class="card-text">${teddies.description}</p>
                <div class="list mb-4 text-left">
                    <label for="color">Choix couleur :</label>
                    <select class="form-control col-6" id="color"></select>
            </div>
                <p class="text-danger text-right">${teddies.price /100 + " " + "€"}</p>   
                
            </div>
        </div>`
}

// Fonction pour sélectionner la bonne couleur

async function colors(){
    const teddies = await getTeddies();
    const colors = Object.values(teddies.colors)
            
        for (let properties of colors){
            console.log(properties)
            document.getElementById("color").innerHTML += `<option>${properties}</option>`
        }
}

// Fonction pour ajouter l'article au panier (via localstorage)

async function addToCart(e){
    const teddies = await getTeddies();
    let teddiesInLocalStorage = JSON.parse(localStorage.getItem("article"))
    if(teddiesInLocalStorage === null){
        teddiesInLocalStorage = []
    }
    else{
        teddiesInLocalStorage = JSON.parse(localStorage.getItem("article")) 
        console.log(teddiesInLocalStorage)
    }
    teddiesInLocalStorage.push(teddies)
    localStorage.setItem("article", JSON.stringify(teddiesInLocalStorage))
}

// pour clic bouton ajout panier
const buttonAddCart = document.getElementById("cart");

////////// Evévenements //////////
//Ajoute l'article au panier au clic sur le bouton "ajouter au panier"/

document.getElementById("cart").addEventListener("click", addToCart);

//const test = buttonAddCart.addEventListener("click", addToCart);
//console.log(test)

getTeddies()
displyOneTeddies()
colors()

