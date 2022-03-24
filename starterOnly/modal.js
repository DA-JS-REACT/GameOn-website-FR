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


  InitializeEvent: function()  {

    let formElement = document.querySelector('.modal-body form');
    // console.log(formElement);
    formElement.addEventListener('submit', form.handleSubmit);
  },

  handleSubmit: function(event) {



    event.preventDefault();
    form.checkfield();
    for (let attrError of formData){
      if(attrError.getAttribute('data-error')){
        form.success = false;
      }

    }
    if(form.success){
      formSuccess.displaymodal();
    }


  },

  checkfield: function(){

    // champ prénom
    form.checkfieldInputText('first', ' Veuillez entrer 2 caractères ou plus pour le champ du prenom.', 2);
    // champ nom
    form.checkfieldInputText('last', ' Veuillez entrer 2 caractères ou plus pour le champ du nom.', 2);
    // champ email
    form.checkfieldInputEmail('email',' merci de rensiegner une addresse mail valide');
    // champ birthdate
    form.checkfieldInputBirthdate('birthdate', 'merci de renseigner votre date de naissance');
    // champ quantity
    form.checkfieldInputNumber('quantity', "merci de renseigner un nombre positif");
    // champ tournoi
    form.checkfieldInputRadio('input[type=radio]','Vous devez coché un tournoi');
    // champ condition d'utilisation
    form.checkfieldInputCheckbox('checkbox1', 'vous devez acceptez les conditions d\'utilisation');


  },



  checkNotEmpty : function(inputElement,texterror)
  {
     // on récupère sa valeur
    const checkfieldValue = inputElement.value.trim();
    // on remonte au parent afin d'afficher le message d'erreur
    const divElement = inputElement.closest('.formData');

    // on vérifie si le champ n'est pas vide et il contient 2 caractères
    if (checkfieldValue == ''){
      divElement.setAttribute('data-error',texterror);
      divElement.setAttribute('data-error-visible',true);
      form.success = false;
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
      form.success = true;
    }
  },

  checkfieldInputText: function(fieldId,texterror , minlenght)
  {
    // on récupère l'élément  qui nous interesse
    const inputElement = document.getElementById(fieldId);

    // on récupère sa valeur
    const inputValue = inputElement.value.trim();
    // console.log(inputValue);

    // on vérifie que cette valeur est correct
    const inputLength = inputValue.length;
    // console.log(inputLength);

    // on remonte au parent afin d'afficher le message d'erreur
    const divElement = inputElement.closest('.formData');

    // on vérifie si le champ n'est pas vide et il contient 2 caractères
    if (inputLength < minlenght || inputValue == ''){
      divElement.setAttribute('data-error',texterror);
      divElement.setAttribute('data-error-visible',true);
      form.success = false;
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
      form.success = true;
    }

  },

  checkfieldInputEmail: function(fieldId,texterror)
  {
    // on récupère l'élément  qui nous interesse
    const inputElement = document.getElementById(fieldId);

    // on récupère sa valeur
    const inputValue = inputElement.value.trim();
    // console.log(inputValue);

    // on remonte au parent afin d'afficher le message d'erreur
    const divElement = inputElement.closest('.formData');

    let pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/;
    if (!pattern.test(inputValue )){
      divElement.setAttribute('data-error',texterror);
      divElement.setAttribute('data-error-visible',true);
      form.success = false;
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
      form.success = true;
    }

  },

  checkfieldInputBirthdate : function(fieldId,texterror)
  {
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);

     form.checkNotEmpty(inputElement,texterror);
  },

  checkfieldInputNumber :function(fieldId,texterror)
  {
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);

     // on récupère sa valeur
     const inputValue = parseInt( inputElement.value);
     //console.log(inputValue);

     // on remonte au parent afin d'afficher le message d'erreur
     const divElement = inputElement.closest('.formData');

     // on vérifie si le champ n'est pas vide et il contient 2 caractères
     if ( inputValue < 0 || isNaN(inputValue)){
       divElement.setAttribute('data-error',texterror);
       divElement.setAttribute('data-error-visible',true);
       form.success = false;

     }else {
       divElement.removeAttribute('data-error');
       divElement.removeAttribute('data-error-visible');
       form.success = true;

     }

  },

  checkfieldInputRadio: function(fieldType, texterror)
  {
      let radioElement = document.querySelectorAll(fieldType);
      //console.log(radioElement.length);

      // compte le nombre d'élément  radio
      // let countRadioElement = radioElement.length;
      // let LoactionSelection= false;


      // if (countRadioElement > 0 ){
      //   // parcours le tableau pour chercher si un élément est coché
      //   for(let i =0;i < countRadioElement;i++){
      //     const divElement = radioElement[i].closest('.formData');
      //     if(radioElement[i].checked){
      //       LoactionSelection = true;
      //       //texterror ='';
      //       console.log('ouf', radioElement[i].value);
      //       divElement.removeAttribute('data-error');
      //       divElement.removeAttribute('data-error-visible');
      //       break ;
      //     }else {
      //       LoactionSelection = false;
      //     }
      //     if(!LoactionSelection){
      //       divElement.setAttribute('data-error',texterror);
      //       divElement.setAttribute('data-error-visible',true);
      //     }
      //   }
      // }


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
            //console.log('div',divElement);
            break;
        }
        }


  },

  checkfieldInputCheckbox: function(fieldId,texterror){
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);
     //console.log('check',inputElement.checked);
     const divElement = inputElement.closest('.formData');

     if(!inputElement.checked) {
      divElement.setAttribute('data-error',texterror);
      divElement.setAttribute('data-error-visible',true);
      form.success = false;
     }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
      form.success = true;
  }

  }


}

const formSuccess = {

 


  displaymodal: function() {
   const modalsuccess = document.querySelector('.bground');
   modalsuccess.style.display="block";
   // cache le form afin d'afficher une modal vierge
   let formElt = modalsuccess.querySelector('.modal-body');
  formElt.style.display="none";

    // cible tout les champs input et remet les valeurs à zero
  let inputElement = document.querySelectorAll('input');
  for(let input of inputElement){
    input.value='';
    input.checked= false;
  }


   let divElement = modalsuccess.querySelector('.content');
   console.log(divElement);
   divElement.style.height="750px";

  },
}

document.addEventListener('DOMContentLoaded', app.init);

