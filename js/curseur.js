/**
 * curseur.js — Curseur personnalisé animé
 * Portfolio — Aline Rostagnat
 *
 * Compatibilité : Chrome, Firefox, Safari, Edge
 * Désactivé automatiquement sur mobile (touch)
 */

(function () {
  'use strict';

  /* Détection d'un appareil tactile : on désactive le curseur */
  var estTactile = ('ontouchstart' in window) ||
                   (navigator.maxTouchPoints > 0) ||
                   (navigator.msMaxTouchPoints > 0);

  if (estTactile) return;

  var point  = document.getElementById('curseur-point');
  var anneau = document.getElementById('curseur-anneau');

  if (!point || !anneau) return;

  var sourisX = 0, sourisY = 0;
  var anneauX = 0, anneauY = 0;

  /* Suivi de la souris pour le point (réactif) */
  document.addEventListener('mousemove', function (e) {
    sourisX = e.clientX;
    sourisY = e.clientY;
    point.style.left = sourisX + 'px';
    point.style.top  = sourisY + 'px';
  });

  /* Animation fluide de l'anneau (inertie) */
  function animerAnneau() {
    anneauX += (sourisX - anneauX) * 0.12;
    anneauY += (sourisY - anneauY) * 0.12;
    anneau.style.left = anneauX + 'px';
    anneau.style.top  = anneauY + 'px';
    window.requestAnimationFrame(animerAnneau);
  }

  animerAnneau();

})();