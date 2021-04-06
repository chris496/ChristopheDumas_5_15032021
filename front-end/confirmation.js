document.getElementById("idCommande").innerHTML = JSON.parse(localStorage.getItem("idCommande"));

document.getElementById("sum").innerHTML = JSON.parse(localStorage.getItem("sum")) + " " + "€";

document.getElementById("accueil").addEventListener("click", function(){
    localStorage.clear()
})