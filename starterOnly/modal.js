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
    formElement.addEventListener('submit', form.handleSubmit);
  },

  handleSubmit: function(event) {


    form.checkfield();

    for (let attrError of formData){
      if(attrError.getAttribute('data-error')){
        event.preventDefault();
      }else {
       console.log('success');
      }
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
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
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
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
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
    }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
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

     }else {
       divElement.removeAttribute('data-error');
       divElement.removeAttribute('data-error-visible');

     }

  },

  checkfieldInputRadio: function(fieldType, texterror)
  {
      let radioElement = document.querySelectorAll(fieldType);
      console.log(radioElement.length);
      // const divElement = element.closest('.formData');
      // let count = 0;
      // for(let i = 0; i < radioElement.length; i++){
      //   if(radioElement[i].checked){
      //     count++;
      //     return count;
      //   }

      //   //   if( count == 0){
      //   //     divElement.setAttribute('data-error',texterror);
      //   //     divElement.setAttribute('data-error-visible',true);
      //   //   }else {
      //   //     divElement.removeAttribute('data-error');
      //   //     divElement.removeAttribute('data-error-visible');

      //   //     console.log('div',divElement);
      //   // }
      // }

      for( const element of radioElement){
        // console.log('radio',element.checked);
        const divElement = element.closest('.formData');
        element.addEventListener('click', function(e){
          console.log(e.currentTarget.checked);
          
          if(!e.target.checked){
            console.log('no',e.target.checked);
            divElement.setAttribute('data-error',texterror);
            divElement.setAttribute('data-error-visible',true);
  
          }else {
            divElement.removeAttribute('data-error');
            divElement.removeAttribute('data-error-visible');
            console.log('yes',e.target.checked);
            console.log('div',divElement);
        }
        });
       
    }
  },

  checkfieldInputCheckbox: function(fieldId,texterror){
     // on récupère l'élément  qui nous interesse
     const inputElement = document.getElementById(fieldId);
     console.log('check',inputElement.checked);
     const divElement = inputElement.closest('.formData');

     if(!inputElement.checked) {
      divElement.setAttribute('data-error',texterror);
      divElement.setAttribute('data-error-visible',true);
     }else {
      divElement.removeAttribute('data-error');
      divElement.removeAttribute('data-error-visible');
  }

  }


}

const FormSuccess = {


  displaymodal: function() {
    console.log('yes');

  }
}

document.addEventListener('DOMContentLoaded', app.init);

