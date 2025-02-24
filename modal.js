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


  success : true,
  formDataValue: [],


  InitializeEvent: function()  {

    const formElement = document.querySelector('.modal-body form');
    // console.log(formElement);
    formElement.addEventListener('submit', form.handleSubmit);
  },

  handleSubmit: function(event) {



    event.preventDefault();
    // refresh tab for unique value
    form.formDataValue =[];
    form.checkfield();

    // parcours tout les FormData pour  trouver si il y a une erreur
    for (let attrError of formData){
      if(attrError.getAttribute('data-error')){
        form.success = false;
      }

    }
    // avec Set un nouveau tableau est crééer avec des valeurs uniques
    // let Data = [new Set(form.formDataValue)];
    if(form.success){
      console.log(form.formDataValue);
      formSuccess.displaymodal();
    }


  },

  checkfield: function(){

    // champ prénom
    form.checkfieldInputText('first', ' Veuillez entrer 2 caractères ou plus pour le champ du prénom.', 2);
    // champ nom
    form.checkfieldInputText('last', ' Veuillez entrer 2 caractères ou plus pour le champ du nom.', 2);
    // champ email
    form.checkfieldInputEmail('email',' merci de rensiegner une addresse mail valide');
    // champ birthdate
    form.checkfieldInputBirthdate('birthdate', 'merci de renseigner une date de naissance valide');
    // champ quantity
    form.checkfieldInputNumber('quantity', "merci de renseigner un nombre positif");
    // champ tournoi
    form.checkfieldInputRadio('input[type=radio]','Vous devez coché  un tournoi');
    // champ condition d'utilisation
    form.checkfieldInputCheckbox('checkbox1', 'vous devez acceptez les conditions d\'utilisation');

    // récuperation du dernier checkbox
    const inputElement = document.getElementById('checkbox2');
    if(form.success){
      form.formDataValue.push('event:'+ inputElement.checked);
    }

  },


  checkIsValid : function(inputElement,texterror,isInvalid,fieldId = '')
  {
     // on récupère sa valeur
    // const checkfieldValue = inputElement.value.trim();
    let checkfieldValue = inputElement.value.trim();
    // on remonte au parent afin d'afficher le message d'erreur
    const divElement = inputElement.closest('.formData');


    if (isInvalid){
      divElement.setAttribute('data-error',texterror);
      divElement.setAttribute('data-error-visible',true);
      form.success = false;
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
      // si la valeur est correct on la rentre de le tableau
      switch (fieldId) {
        case 'first':
          checkfieldValue ='prénom:' + inputElement.value.trim();
          form.formDataValue.push(checkfieldValue);
          break;
        case 'last':
          checkfieldValue ='nom:' + inputElement.value.trim();
          form.formDataValue.push(checkfieldValue);
          break;
        case 'quantity':
          checkfieldValue = 'tournoi :' + parseInt(inputElement.value);
          form.formDataValue.push(checkfieldValue);
          break;
        case 'email':
          checkfieldValue ='email:' + inputElement.value.trim();
          form.formDataValue.push(checkfieldValue);
          break;
        case 'checkbox1':
          checkfieldValue ='conditions:' + inputElement.checked;
          form.formDataValue.push(checkfieldValue);
          break;
        case 'birthdate':
          checkfieldValue ='birthdate:' + inputElement.value;
          form.formDataValue.push(checkfieldValue);
          break;
        default:
          null;
      }
      form.success = true;
    }

  },

  checkfieldInputText: function(fieldId,texterror , minlenght)
  {
    // on récupère l'élément  qui nous interesse
    const inputElement = document.getElementById(fieldId);

    // on vérifie que cette valeur est correct au nombre de caratère
    const inputLength = inputElement.value.trim().length;

    const isInvalid = inputLength < minlenght || inputElement.value.trim() === '';
    form.checkIsValid(inputElement,texterror,isInvalid,fieldId);

  },

  checkfieldInputEmail: function(fieldId,texterror)
  {
    // on récupère l'élément  qui nous interesse
    const inputElement = document.getElementById(fieldId);

    // condition pour être valide
    let pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/;
    isInvalid = !pattern.test(inputElement.value.trim());

    form.checkIsValid(inputElement,texterror,isInvalid,fieldId);

  },

  checkfieldInputBirthdate : function(fieldId,texterror)
  {
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);
    //console.log(inputElement.valueAsDate);
    // on récupère la date saisie avec new date pou pouvoir la décomposer
    const dateValue = new Date(inputElement.value);
    // le jour
    const dayValue = dateValue.getDate();

    // le mois  getMonth récupère de 0 à 11 donc ajouter 1 pour le mois
    const monthValue = dateValue.getMonth() + 1;

    //l'année
    const yearValue = dateValue.getFullYear();

    //console.log('mois',monthValue , 'année:',yearValue, 'jour:', dayValue);
    //récupére la date du jour
    const localDate = Date.now();
    const today = new Date(localDate);
    const dayToday = today.getDate();
    const monthToday = today.getMonth() + 1;
    const yearToday = today.getFullYear();
     if (dayValue === dayToday && monthValue === monthToday){
       alert(' Joyeux annivarsaire !!!!');
     }

    // condition pour être valide
     isInvalid = yearValue === yearToday || (yearToday - yearValue) > 100 || yearValue > yearToday || (yearToday - yearValue) < 18 || inputElement.value ==="";

     if ((yearToday - yearValue) < 18){
       texterror = " vous devez être majeur";
     } else if ((yearToday - yearValue) > 100 ){
      texterror = " vous devez être trop vieux ";
     }

     form.checkIsValid(inputElement,texterror,isInvalid,fieldId);
  },

  checkfieldInputNumber :function(fieldId,texterror)
  {
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);

     // on récupère sa valeur
     const inputValue = parseInt( inputElement.value);

     // condition pour être valide
     isInvalid = inputValue < 0 || isNaN(inputValue);
     form.checkIsValid(inputElement,texterror,isInvalid,fieldId);

  },

  checkfieldInputRadio: function(fieldType, texterror)
  {
      const radioElement = document.querySelectorAll(fieldType);

      // on parcour tout les élements afin de savoir si checked
      for( const element of radioElement){
        // console.log('radio',element.checked);
        const divElement = element.closest('.formData');


          if(!element.checked){

            divElement.setAttribute('data-error',texterror);
            divElement.setAttribute('data-error-visible',true);
            form.success = false;

          }else {
            divElement.removeAttribute('data-error');
            divElement.removeAttribute('data-error-visible');
            form.success = true;
            form.formDataValue.push(element.value + ',check:'+ element.checked);
            break;
        }
        }


  },

  checkfieldInputCheckbox: function(fieldId,texterror){
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);

      // condition pour être valide
      isInvalid = !inputElement.checked;
      form.checkIsValid(inputElement,texterror,isInvalid ,fieldId);
  }


}

const formSuccess = {


  // method for open a new modal
  displaymodal: function() {
    const modalsuccess = document.querySelector('.bground');
    modalsuccess.style.display="block";
    // cache le form afin d'afficher une modal vierge
    const formElt = modalsuccess.querySelector('.modal-body');
    formElt.style.display="none";


    formSuccess.display(modalsuccess);

  },

  // method  for display message success submit
  display:function (modalElement){

    const divElement = modalElement.querySelector('.content');

    //divElement.classList.add('content--success');
    divElement.classList.toggle('content--success');
    //create  h2
    const titleElement = document.createElement('h2');
    titleElement.innerHTML = "Merci pour<br> votre inscription";
    titleElement.classList.add("title-success");
    divElement.appendChild(titleElement);

    // create button
    const buttonElement = document.createElement('button');
    buttonElement.classList.add("button-success", "btn-success");
    buttonElement.textContent="fermer";
    divElement.appendChild(buttonElement);

    buttonElement.addEventListener('click',function(){

        modalElement.style.display = "none";
        // display element of form
        const formElt = modalElement.querySelector('.modal-body');
        formElt.style.display = "block";

        // delete all element create
            // add toggle ligne 306
        // divElement.classList.remove('content--success');
        divElement.removeChild(titleElement);
        divElement.removeChild(buttonElement);

        // cible tout les champs input et remet les valeurs à zero sauf l'input de type submit
        const inputElement = document.querySelectorAll('input:not([type="submit"])');
        for (let input of inputElement) {
          input.value = '';
          input.checked = false;
        }
        // vide les données stockés
        form.formDataValue = [];
        // rafraichis  la page auto
        //  location.reload();
    });

  },



}

document.addEventListener('DOMContentLoaded', app.init);

