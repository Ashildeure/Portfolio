/**
 * navigation.js - Menu mobile + mise en évidence du lien actif au défilement
 * Portfolio - Aline Rostagnat
 *
 * Compatibilité : Chrome, Firefox, Safari, Edge
 */

(function () {
  'use strict';

  var boutonMenu = document.getElementById('bouton-menu');
  var menuMobile = document.getElementById('menu-mobile');
  var liensNav   = document.querySelectorAll('.liens-nav a');
  var sections   = document.querySelectorAll('section[id]');

  /* ==============================
     MENU HAMBURGER (mobile)
  ============================== */
  if (boutonMenu && menuMobile) {
    boutonMenu.addEventListener('click', function () {
      boutonMenu.classList.toggle('ouvert');
      menuMobile.classList.toggle('ouvert');
    });
  }

  /* Fermeture du menu mobile au clic sur un lien */
  var liensMobile = document.querySelectorAll('#menu-mobile a');
  liensMobile.forEach(function (lien) {
    lien.addEventListener('click', function () {
      if (boutonMenu) boutonMenu.classList.remove('ouvert');
      if (menuMobile) menuMobile.classList.remove('ouvert');
    });
  });

  /* ==============================
     LIEN ACTIF AU DÉFILEMENT
  ============================== */
  function mettreEnEvidenceLienActif() {
    var positionActuelle = '';

    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) {
        positionActuelle = section.id;
      }
    });

    liensNav.forEach(function (lien) {
      if (lien.getAttribute('href') === '#' + positionActuelle) {
        lien.style.color = 'var(--or-clair)';
      } else {
        lien.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', mettreEnEvidenceLienActif, { passive: true });

})();