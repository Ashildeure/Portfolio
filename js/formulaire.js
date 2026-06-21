/**
 * formulaire.js - Gestion de l'envoi du formulaire de contact via EmailJS
 * Portfolio - Aline Rostagnat
 *
 * Compatibilité : Chrome, Firefox, Safari, Edge
 * Dépendance : EmailJS (chargé via CDN dans le HTML)
 */

(function () {
  'use strict';

  /* Initialisation d'EmailJS */
  if (typeof emailjs !== 'undefined') {
    emailjs.init('clYV_MaSNhAPCYdE9');
  }

  var formulaire = document.getElementById('formulaire-contact');

  if (!formulaire) return;

  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();

    var bouton = formulaire.querySelector('button[type="submit"]');
    if (!bouton) return;

    /* Retour visuel pendant l'envoi */
    bouton.textContent = 'Envoi…';
    bouton.disabled = true;

    if (typeof emailjs !== 'undefined') {
      emailjs.sendForm('service_qe446jj', 'template_56394hs', formulaire)
        .then(function () {
          bouton.textContent = 'Envoyé ✓';
          formulaire.reset();
        }, function (erreur) {
          console.error('Erreur EmailJS :', erreur);
          bouton.textContent = 'Erreur - réessayer';
          bouton.disabled = false;
        });
    } else {
      /* Fallback si EmailJS n'est pas chargé */
      setTimeout(function () {
        bouton.textContent = 'Envoyer →';
        bouton.disabled = false;
      }, 1000);
    }
  });

})();