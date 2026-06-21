/**
 * theme.js - Bascule thème sombre / lumineux
 * Portfolio - Aline Rostagnat
 *
 * Compatibilité : Chrome, Firefox, Safari, Edge
 * Persistance : localStorage
 */

(function () {
  'use strict';

  var CLEE_THEME = 'portfolio-theme';
  var bouton     = document.getElementById('bouton-theme');
  var racine     = document.documentElement;

  /* ==============================
     APPLIQUER UN THÈME
  ============================== */
  function appliquerTheme(theme) {
    if (theme === 'clair') {
      racine.setAttribute('data-theme', 'clair');
      if (bouton) bouton.classList.add('actif');
    } else {
      racine.removeAttribute('data-theme');
      if (bouton) bouton.classList.remove('actif');
    }
  }

  /* ==============================
     INITIALISATION (lecture préférence sauvegardée)
  ============================== */
  var themeSauvegarde = null;
  try {
    themeSauvegarde = localStorage.getItem(CLEE_THEME);
  } catch (e) { /* localStorage indisponible */ }

  /* Fallback : préférence système */
  if (!themeSauvegarde) {
    var prefereClair = window.matchMedia &&
                       window.matchMedia('(prefers-color-scheme: light)').matches;
    themeSauvegarde = prefereClair ? 'clair' : 'sombre';
  }

  appliquerTheme(themeSauvegarde);

  /* ==============================
     BASCULE AU CLIC
  ============================== */
  if (bouton) {
    bouton.addEventListener('click', function () {
      var estClair = racine.getAttribute('data-theme') === 'clair';
      var nouveauTheme = estClair ? 'sombre' : 'clair';

      appliquerTheme(nouveauTheme);

      try {
        localStorage.setItem(CLEE_THEME, nouveauTheme);
      } catch (e) { /* localStorage indisponible */ }
    });
  }

})();