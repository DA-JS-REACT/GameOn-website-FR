function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close Modal form
const modalClose = document.querySelector(".close");

modalClose.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
}


// model  for application  initialisation for event
const app = {


  init:function() {
    console.log('init');
    form.InitializeEvent();
  }

}

// model  for form
const form = {

  InitializeEvent: function()  {

    let formElement = document.querySelector('.modal-body form');
    // console.log(formElement);
    formElement = document.addEventListener('submit', form.handleSubmit);
  },

  handleSubmit: function(event) {

    let itsOk = true;
    console.log(itsOk);

    if (itsOk = false) {
      event.preventDefault();
    }


    let AllFormElement = event.currentTarget;
    // console.log(AllFormElement);

    // champ prénom
    // let firstName = AllFormElement.getElementById('first');
    // let newFirstName = firstName.value;
    // console.log(newFirstName);

    // champ nom
    let lastName = AllFormElement.getElementById('last');
    let newLastName = lastName.value;
    console.log(newLastName);

    if(!form.checkfieldInputText('first', ' nope', 2)){
      itsOk = false;
    }

    // champ email
    let email = AllFormElement.getElementById('email');
    let newEmail = email.value;
    console.log(newEmail);

    // champ birthdate
    let birthdate = AllFormElement.getElementById('birthdate');
    let newBirthdate = birthdate.value;
    console.log(newBirthdate);

    // champ quantity
    let quantity = AllFormElement.getElementById('quantity');
    let newQuantity = quantity.value;
    console.log(newQuantity);

  },

  checkfieldInputText: function(fieldId,texterror , minlenght)
  {
    // on récupère l'élément  qui nous interesse
    const inputElement = document.getElementById(fieldId);

    // on récupère sa valeur
    const inputValue = inputElement.value.trim();
    console.log(inputValue);

    // on vérifie que cette valeur est correct
    const inputLength = inputValue.length;
    console.log(inputLength);

    if (inputLength < minlenght){
      inputElement.classList.add('data-error');
      console.log(texterror);
    }

  }
}

document.addEventListener('DOMContentLoaded', app.init);

