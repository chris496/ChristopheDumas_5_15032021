////////// Récupération de l'id dans l'url //////////

const recupId = window.location.search;
const urlSearch = new URLSearchParams(recupId);
const id = urlSearch.get("id");
console.log(id)

////////// Déclaration des variables ///////////

const urlApiId = `http://127.0.0.1:3000/api/teddies/${id}`
// pour clic bouton ajout panier
const buttonAddCart = document.getElementById("cart");

