////////// Récupération de l'id dans l'url //////////

const recupId = window.location.search;
const urlSearch = new URLSearchParams(recupId);
const id = urlSearch.get("id");
console.log(id)

////////// Déclaration des variables ///////////

const urlApiId = `http://127.0.0.1:3000/api/teddies/${id}`
const teddieCard = document.getElementById("teddieCard")

////////// Evévenements //////////
//Ajoute l'article au panier au clic sur le bouton "ajouter au panier"/
document.getElementById("cart").addEventListener("click", addToCart);

////////// Fonctions //////////

// Fonction fetch pour récupérer le contenu de l'API

function getApi(){
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

async function displayOneTeddies(){
    const teddies = await getApi()
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
    const teddies = await getApi();
    const colors = Object.values(teddies.colors)   
        for (let properties of colors){
            document.getElementById("color").innerHTML += `<option>${properties}</option>`
        }
        document.getElementById("color").addEventListener('change', function(){
            let test = document.getElementById("color").options[document.getElementById("color").selectedIndex].text
            console.log(test)
        })
}

// Fonction pour ajouter l'article au panier (via localstorage)

async function addToCart(){
    const teddies = await getApi();
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
    alert("votre article vient d'être ajouté au panier")
}

getApi()
displayOneTeddies()
colors()
