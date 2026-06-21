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

  var bouton = document.getElementById('bouton-envoi');
  if (!bouton) return;

  var icone = bouton.querySelector('.bouton-envoi-icone');
  var texte = bouton.querySelector('.bouton-envoi-texte');

  var ICONE_CHECK =
    '<svg viewBox="0 0 24 24"><path d="M4 12.5L9.5 18L20 6"/></svg>';

  var DUREE_AFFICHAGE_ETAT = 2500; /* durée d'affichage du check/erreur avant retour à l'état initial */

  /* ==============================
     GESTION DES ÉTATS DU BOUTON
  ============================== */
  function definirEtat(etat) {
    bouton.classList.remove('en-cours', 'reussi', 'erreur');

    switch (etat) {
      case 'en-cours':
        bouton.classList.add('en-cours');
        bouton.disabled = true;
        icone.innerHTML = '';
        texte.textContent = 'Envoi…';
        break;

      case 'reussi':
        bouton.classList.add('reussi');
        bouton.disabled = true;
        icone.innerHTML = ICONE_CHECK;
        texte.textContent = 'Envoyé';
        break;

      case 'erreur':
        bouton.classList.add('erreur');
        bouton.disabled = false;
        icone.innerHTML = '';
        texte.textContent = 'Erreur - réessayer';
        break;

      default: /* 'repos' */
        bouton.disabled = false;
        icone.innerHTML = '';
        texte.textContent = 'Envoyer →';
        break;
    }
  }

  /* Réinitialise le bouton à son état de repos après un délai */
  function reinitialiserApresDelai() {
    setTimeout(function () {
      definirEtat('repos');
    }, DUREE_AFFICHAGE_ETAT);
  }

  /* ==============================
     SOUMISSION DU FORMULAIRE
  ============================== */
  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Empêche un double-envoi pendant que ça tourne déjà */
    if (bouton.classList.contains('en-cours')) return;

    definirEtat('en-cours');

    if (typeof emailjs !== 'undefined') {
      emailjs.sendForm('service_qe446jj', 'template_56394hs', formulaire)
        .then(function () {
          definirEtat('reussi');
          formulaire.reset();
          reinitialiserApresDelai();
        }, function (erreur) {
          console.error('Erreur EmailJS :', erreur);
          definirEtat('erreur');
          reinitialiserApresDelai();
        });
    } else {
      /* Fallback si EmailJS n'est pas chargé */
      setTimeout(function () {
        definirEtat('erreur');
        reinitialiserApresDelai();
      }, 1000);
    }
  });

})();