/**
 * cartes.js - Retournement des cartes projets au clic + lightbox images
 * Portfolio - Aline Rostagnat
 *
 * Compatibilité : Chrome, Firefox, Safari, Edge
 */

(function () {
  'use strict';

  var cartes = document.querySelectorAll('.carte-conteneur');

  /* ==============================
     FLIP DES CARTES
  ============================== */
  cartes.forEach(function (carte) {

    carte.addEventListener('click', function (e) {
      if (e.target.closest('.bouton-fermer')) {
        carte.classList.remove('retournee');
        return;
      }
      if (carte.classList.contains('retournee') && e.target.closest('a')) {
        return;
      }
      /* Ne pas retourner si clic sur l'image (géré par la lightbox) */
      if (carte.classList.contains('retournee') && e.target.closest('.arriere-media img')) {
        return;
      }
      carte.classList.toggle('retournee');
    });

    carte.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        carte.classList.toggle('retournee');
      }
      if (e.key === 'Escape') {
        carte.classList.remove('retournee');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.carte-conteneur') && !e.target.closest('#lightbox')) {
      cartes.forEach(function (carte) {
        carte.classList.remove('retournee');
      });
    }
  });

  /* ==============================
     LIGHTBOX
  ============================== */
  var lightbox       = document.getElementById('lightbox');
  var lightboxImg    = document.getElementById('lightbox-img');
  var lightboxFermer = document.getElementById('lightbox-fermer');

  function ouvrirLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('ouverte');
    document.body.style.overflow = 'hidden';
  }

  function fermerLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('ouverte');
    document.body.style.overflow = '';
    setTimeout(function () { lightboxImg.src = ''; }, 300);
  }

  /* Clic sur une image — uniquement si la carte parente est retournée */
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.arriere-media img');
    if (!img) return;

    var carteParente = img.closest('.carte-conteneur');
    if (!carteParente || !carteParente.classList.contains('retournee')) return;

    e.stopPropagation();
    ouvrirLightbox(img.src, img.alt);
  });

  /* Fermeture : clic sur le fond, l'image ou le bouton */
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightboxImg) {
        fermerLightbox();
      }
    });
  }

  if (lightboxFermer) {
    lightboxFermer.addEventListener('click', fermerLightbox);
  }

  /* Fermeture au clavier */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('ouverte')) {
      fermerLightbox();
    }
  });

})();