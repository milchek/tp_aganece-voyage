$(document).ready( () => {
    // Récupérer le container pour les formulaires de photos
    let containerEtapes = $('.container-etapes');

    // Créer le bouton d'ajout de photo
    let addNewEtape = $('<a href="#">Ajouter une nouvelle étape</a>');

    // Ajoute le bouton au container
    containerEtapes.append(addNewEtape);

    // Numeroter les panels pour qu'ils soit tous différent
    // Ici je créer un attribut data-index dans ma div containerEtapes. 
    // Cela me permet de récupérer ensuite le nombre de 'card-photo' (formulaire) dans mon container
    containerEtapes.data('index', containerEtapes.find('.card-photo').length);

    // Fonction qui permet d'ajouter dynamiquement le formulaire d'ajout de photo au DOM
    function addNewForm() {
        // Récupération des informations du formulaire.
        // Via le prototype
        let prototype = containerEtapes.data('prototype');
        // console.log(prototype);

        // Je créer une variable index qui récupère le nombre de card-photo dans mon container
        let index = containerEtapes.data('index');

        // Créer le formulaire grâce au prototype
        let newForm = prototype;
        
        // On définit ici l'index du formulaire qui est créé.
        newForm = newForm.replace(/__name__/g, index); 
        
        // On fait l'incrémentation de l'index
        containerEtapes.data('index', index+1);

        // je crée une nouvelle card qui va contenir notre formulaire
        let card = $('<div class="card-photo"></div>');

        // Ajout du formulaire à la card
        card.append(newForm);

        // Ici on ajoute pour chaque card (chaque formulaire) un bouton de suppression
        addRemoveButton(card);

        // Enfin, on ajoute la card avec le formulaire au DOM
        addNewEtape.before(card);
    }

    // On Capte le click du bouton 'Ajouter une Photo'
    addNewEtape.click(function (e) {
        // On stopper l'action par défaut
        e.preventDefault();

        // On appel la fonction addNewForm pour créer un formulaire à chaque click
        addNewForm();
    });

    function addRemoveButton(card){
        // Création du bouton remove
        let removeButton = $('<a href="#">Supprimer la photo</a>');

        card.append(removeButton);

        // A chaque click de mon bouton de suppression je souhaite supprimer la card qui à pour class '.card-photo'
        removeButton.click(function (e) {  
            e.preventDefault();
            // Je récupère le parent de mon bouton qui à pour class '.card-photo'
            // J'utilise slideUp pour faire un effet de style et je lui dit que je souhaite supprimer la card en question.
          /*   $(e.target).parents('.card-photo').slideUp(500, function () { 
                $(this).remove();
            }) */
            $(card).slideUp(500, function () { 
                $(this).remove();
            })
            
        })
    }

     containerEtapes.find('.card-photo').each(addRemoveButton($(this)));

} )