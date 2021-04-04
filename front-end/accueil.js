////////// Déclaration des variables ///////////

const urlApi = `http://127.0.0.1:3000/api/teddies/`;
const teddiesCard = document.getElementById("teddiesCard");

////////// Fonction Fetch pour appeler l'api teddies //////////

function getApi(){
    return fetch (urlApi)
    .then(function(response){
        return response.json()
    })
    .then(function(teddies){
        return teddies
    })
    .catch(function(error){
        alert(error)
    })
};

////////// Fonction pour afficher les peluches disponibles //////////

async function displayTeddies(){
    const teddies = await getApi()
    console.log(teddies)
    teddiesCard.innerHTML = teddies.map(function(data){
        return `<div class="col-12 col-sm-6 col-lg-4 p-2" >
        <div class="card shadow">
            <img src="${data.imageUrl}" alt="peluche" class="card-img-top" id="photo">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text" id="description">${data.description}</p>
                <a href="produit.html?id=${data._id}" class="text-danger stretched-link" id="price">${data.price /100 + " " + "€"}</a>
            </div>
            <div class="card-footer color">
                Différents coloris disponibles
            </div>
        </div>
        </div>`
    }).join('')
};




getApi();
displayTeddies();