/**
 * animations.js — Apparition des éléments au défilement (IntersectionObserver)
 *                 + effet parallaxe subtil sur le hero
 * Portfolio — Aline Rostagnat
 *
 * Compatibilité : Chrome, Firefox, Safari (14+), Edge
 * Fallback pour les navigateurs sans IntersectionObserver : affichage immédiat
 */

(function () {
  'use strict';

  /* ==============================
     APPARITION AU DÉFILEMENT
  ============================== */
  var elementsApparition = document.querySelectorAll('.apparition');

  if ('IntersectionObserver' in window) {
    /* Navigateurs modernes */
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible');
          observateur.unobserve(entree.target);
        }
      });
    }, { threshold: 0.12 });

    elementsApparition.forEach(function (el) {
      observateur.observe(el);
    });

  } else {
    /* Fallback : affichage immédiat pour les vieux navigateurs */
    elementsApparition.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ==============================
     PARALLAXE HERO (subtil)
  ============================== */
  var sectionAccueil = document.getElementById('accueil');

  if (sectionAccueil) {
    window.addEventListener('scroll', function () {
      var decalage = window.scrollY * 0.25;
      sectionAccueil.style.backgroundPositionY = decalage + 'px';
    }, { passive: true });
  }

})();