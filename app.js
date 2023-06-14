let ville = 'Orléans';

// Afficher à l'entrée de la page une température d'une ville par défaut, ici Paris
// Pour ca on appelle la fonction recevoirTemperature();

recevoirTemperature(ville);

function recevoirTemperature(ville) {

// Clé API
let appid = '166472416bdbf564b04d6b39c02e5558';

const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville +'&appid='+ appid + '&lang=fr&units=metric';

// Objet du navigateur accessible en JavaScript qui permet d'obtenir des données au format XML, JSON
let requete = new XMLHttpRequest();

requete.open('GET', url); // on veut décupérer des informations + url ressources à obtenir
requete.responseType = 'json'; // Type de réponse
requete.send(); // on envoie la requête

requete.onload = function() { // au chargement de la requête
    console.log(requete);
    if (requete.readyState == XMLHttpRequest.DONE) {    
        // if (requete.readyState == XMLHttpRequest.DONE) {     // si c'est 4 c'est que ça fonctionne 
            if (requete.status === 200) { // si c'est 200 on commence toutes les instructions
                let temp = requete.response.main.temp; // dans la console est dans XMLHttpRequest/response/main/temp
                let ville =  requete.response.name;
                let icone = requete.response.weather[0].icon;
                let min = requete.response.main.temp_min;
                let max = requete.response.main.temp_max;
                
                let newDiv = document.createElement('div');
                newDiv.innerHTML = '<p>Min : <span class="text-primary font-weight-bold">'+ min + '°C</span>' + '</p> <p>Max : <span class="text-danger font-weight-bold"> ' + max + '°C</span></p>';
                
                let img = document.createElement('img');
                img.src = 'https://openweathermap.org/img/wn/'+icone+'@2x.png';

                let selectVille = document.querySelector('#ville') // on sélectionne l'id #ville (changer de ville)
                selectVille.innerHTML = '<h2>' + ville + '</h2>'; // on la remplace par la ville qu'on a saisi

                selectVille.append(img);
                selectVille.append(newDiv);

                let selectTemp = document.querySelector('#temperature_label') // on sélectionne l'id #temperature_label 
                selectTemp.textContent = temp; // on le remplace par la température de la ville sélectionnée
            }    
            else {
                let error = document.querySelector('#error');
                error.innerHTML='Un problème est intervenu, merci de ressaisir une nouvelle ville ou de revenir plus tard.'
                error.style.color = 'red'
                error.style.fontWeight = 'bolder'
                error.style.marginTop = '20px'

            }    
        }    
        
    }    
}    

let bouton = document.querySelector('#changer');
bouton.addEventListener('click', () => {

    let villeChoisie = ville; // ville = c'est la ville en paramètre de la fonction recevoirTemperature()

    villeChoisie = prompt('Quelle ville souhaitez-vous choisir ?');
    
    recevoirTemperature(villeChoisie);
})

