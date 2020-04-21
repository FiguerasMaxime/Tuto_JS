// DOM Elements
// récupération de chaque élément du DOM avec l'id qui correspond
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// Options
const showAmPm = true; //va nous servir pour afficher dans la ternaire la variable amPm

// Show Time  
//cette fonction va servir à afficher l'heure
function showTime() {
    //uitlisation de let pour qu'elle reste uniquement dans la fonction car on la redéfinit plus bas
  let today = new Date(), //permet de set today et de lui dire que son contenu va contenir un objet Date
    hour = today.getHours(), // attribution des heures
    min = today.getMinutes(), // attribution des minutes
    sec = today.getSeconds(); // attribution des secondes
  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM'; // fonction ternaire qui permet de d'afficher AM ou PM en fonction de la variable hour

  // 12hr Format
  hour = hour % 12 || 12; // permet de formater la variable hour sur une boucle de 12, si hour = 13 avec cette boucle grâce à % il va être égal à 1
  console.log(hour)

  // Output Time
  //affichage HTML de time avec une ternaire pour lancer amPm ou sinon renvoie ''
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000); // permet de déclencher showTime() toutes les 1sec
}

// Add Zeros
function addZero(n) { //fonction qui sert à réinitialiser à chaque base de 10 
  return (parseInt(n, 10) < 10 ? '0' : '') + n; //parseInt() renvoie une valeur entière à base de 10 en fonction de n en paramètre
}

// Set Background and Greeting
function setBgGreet() { //adapte le fond en fonction de hour 
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) { //vérification du champ lorsque le contenu de name est null
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name'); // stock ce que le textContent va avoir 
  }
}

// Set Name
function setName(e) { // permet de set le nom dans name lors ce qu'on appuie sur enter
  if (e.type === 'keypress') { // vérification du type de l'interaction
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) { // vérification de la touche enter
      localStorage.setItem('name', e.target.innerText); //stock name et le remplace dans la zone 
      name.blur();  //retire le focus
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}
// ajout des évènements des textes et de la sélection au moment du enter
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Exécution des fonctions 
showTime();
setBgGreet();
getName();
getFocus();
