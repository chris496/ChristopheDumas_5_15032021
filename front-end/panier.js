////////// Déclaration des variables ///////////

const urlPost = `http://127.0.0.1:3000/api/teddies/order`;
const teddiesInLocalstorage = JSON.parse(localStorage.getItem("article"));



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
            console.log(properties)
        }
    }
}

addTeddiesInBasket()

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