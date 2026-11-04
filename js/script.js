/* ============================================================
   IRON CLEAN — JavaScript
   Ce fichier rend la page INTERACTIVE :
   1. Menu mobile (bouton burger)
   2. En-tête qui devient opaque quand on fait défiler
   3. Lien du menu surligné selon la section affichée
   4. Apparition en douceur des blocs au défilement
   5. Comparateurs avant / après
   6. Boutons "Réserver" : présélection de la formule dans le formulaire
   7. Formulaire : date minimale = aujourd'hui
   8. Année automatique dans le pied de page
   ============================================================ */

// Remarque : la classe "js" est ajoutée sur <html> directement dans index.html
// (balise <script> dans le <head>), pour que l'animation d'apparition fonctionne sans clignotement.


/* ------------------------------------------------------------
   1. MENU MOBILE
   ------------------------------------------------------------ */
const burger = document.getElementById("burger");   // le bouton à 3 traits
const menu = document.getElementById("menu");       // le menu de navigation

// Fonction qui ouvre ou ferme le menu
function basculerMenu(ouvrir) {
  burger.classList.toggle("ouvert", ouvrir);          // transforme le burger en croix
  menu.classList.toggle("ouvert", ouvrir);            // affiche/cache le menu
  document.body.classList.toggle("menu-ouvert", ouvrir); // bloque le défilement de la page
  burger.setAttribute("aria-expanded", ouvrir);       // information pour les lecteurs d'écran
  burger.setAttribute("aria-label", ouvrir ? "Fermer le menu" : "Ouvrir le menu");
}

// Au clic sur le burger : on inverse l'état actuel
burger.addEventListener("click", function () {
  const estOuvert = menu.classList.contains("ouvert");
  basculerMenu(!estOuvert);
});

// Quand on clique sur un lien du menu, on referme le menu
menu.querySelectorAll("a").forEach(function (lien) {
  lien.addEventListener("click", function () {
    basculerMenu(false);
  });
});

// La touche "Échap" ferme aussi le menu
document.addEventListener("keydown", function (evenement) {
  if (evenement.key === "Escape") {
    basculerMenu(false);
  }
});


/* ------------------------------------------------------------
   2. EN-TÊTE AU DÉFILEMENT
   Dès qu'on descend de plus de 30 pixels, on ajoute un fond
   noir à l'en-tête pour qu'il reste lisible.
   ------------------------------------------------------------ */
const header = document.getElementById("header");

function majHeader() {
  header.classList.toggle("header--scrolle", window.scrollY > 30);
}

window.addEventListener("scroll", majHeader);
majHeader(); // on l'appelle une première fois au chargement


/* ------------------------------------------------------------
   3. LIEN ACTIF DANS LE MENU
   "IntersectionObserver" est un outil du navigateur qui nous
   prévient quand un élément entre ou sort de l'écran.
   ------------------------------------------------------------ */
const liensMenu = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll("main section[id]");

const observateurSections = new IntersectionObserver(function (entrees) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {
      const id = entree.target.id;
      // On retire "actif" de tous les liens, puis on l'ajoute au bon
      liensMenu.forEach(function (lien) {
        lien.classList.toggle("actif", lien.getAttribute("href") === "#" + id);
      });
    }
  });
}, {
  // La section est considérée "active" quand elle traverse le milieu de l'écran
  rootMargin: "-50% 0px -50% 0px"
});

sections.forEach(function (section) {
  observateurSections.observe(section);
});


/* ------------------------------------------------------------
   4. APPARITION AU DÉFILEMENT
   Chaque élément ".reveal" reçoit la classe "visible" quand il
   arrive à l'écran ; le CSS se charge de l'animation.
   ------------------------------------------------------------ */
const elementsReveal = document.querySelectorAll(".reveal");

const observateurReveal = new IntersectionObserver(function (entrees, observateur) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {
      entree.target.classList.add("visible");
      observateur.unobserve(entree.target); // l'animation ne se joue qu'une fois
    }
  });
}, {
  threshold: 0.15 // déclenché quand 15 % de l'élément est visible
});

elementsReveal.forEach(function (element) {
  observateurReveal.observe(element);
});


/* ------------------------------------------------------------
   5. COMPARATEURS AVANT / APRÈS
   Quand on bouge le curseur, on met à jour la variable CSS
   "--position", qui déplace la ligne et rogne l'image "après".
   ------------------------------------------------------------ */
document.querySelectorAll(".comparateur__cadre").forEach(function (cadre) {
  const curseur = cadre.querySelector(".comparateur__curseur");

  function majPosition() {
    cadre.style.setProperty("--position", curseur.value + "%");
  }

  curseur.addEventListener("input", majPosition); // à chaque mouvement
  majPosition();                                  // position de départ
});


/* ------------------------------------------------------------
   6. BOUTONS "RÉSERVER" → FORMULAIRE
   Chaque bouton porte un attribut data-formule. Au clic, la page
   descend au formulaire (lien #rendez-vous) et on choisit la
   formule correspondante dans la liste déroulante.
   ------------------------------------------------------------ */
const choixFormule = document.getElementById("formule");

document.querySelectorAll("[data-formule]").forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    if (!choixFormule) return;
    choixFormule.value = bouton.dataset.formule;
    // Petit effet visuel pour montrer que la formule a été choisie
    choixFormule.classList.add("preselection");
    setTimeout(function () {
      choixFormule.classList.remove("preselection");
    }, 1800);
  });
});


/* ------------------------------------------------------------
   7. FORMULAIRE : DATE MINIMALE
   On empêche de choisir une date déjà passée.
   ------------------------------------------------------------ */
const champDate = document.getElementById("date");

if (champDate) {
  const aujourdhui = new Date();
  // Format attendu par le champ date : AAAA-MM-JJ (heure locale)
  const mois = String(aujourdhui.getMonth() + 1).padStart(2, "0");
  const jour = String(aujourdhui.getDate()).padStart(2, "0");
  champDate.min = aujourdhui.getFullYear() + "-" + mois + "-" + jour;
}


/* ------------------------------------------------------------
   8. ANNÉE AUTOMATIQUE
   Le pied de page affiche toujours l'année en cours.
   ------------------------------------------------------------ */
document.getElementById("annee").textContent = new Date().getFullYear();
