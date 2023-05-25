const addBeats = async () => {
  //on récupère les données de l'api et on crée la div
  const beats = await fetch('http://localhost:3004/beats')
  .then(response => response.json())
  console.log(beats);
  const beatsElement = document.getElementById('beats');
  for (const beat of beats) {
    const beatElement = document.createElement("div");
    beatElement.classList.add("beat");
    const beatCoverElement = document.createElement("img");
    beatCoverElement.classList.add('test');
    beatCoverElement.src = beat.coverUrl;
    beatElement.appendChild(beatCoverElement);
    const beatMp3Element = document.createElement("audio");
    beatMp3Element.classList.add('audiotest');
    beatMp3Element.controls = true;
    beatMp3Element.src = beat.audioUrl;
    beatElement.appendChild(beatMp3Element);
    const beatNameElement = document.createElement("h2");
    beatNameElement.textContent = beat.beatName;
    beatElement.appendChild(beatNameElement);
    const beatAuthorElement = document.createElement("h2");
    beatAuthorElement.textContent = `By: ${beat.beatAuthor}`;
    beatElement.appendChild(beatAuthorElement);
    beatsElement.appendChild(beatElement);
  }
}

$(document).ready(async function(){

  // Obtenez l'élément image
const monImage = document.getElementById('stars');

addBeats();




// Fonction pour ajuster la taille de l'image
function ajusterHauteurImage() {
  const hauteurPage = document.documentElement.scrollHeight;
  monImage.style.height = `${hauteurPage}px`;
  monImage.style.width = '100vw';
}


// Écoutez les événements de redimensionnement de la fenêtre pour ajuster la taille de l'image
// window.addEventListener('resize', ajusterHauteurImage);

  function parallax() {
    var s = document.getElementById("stars");
    var yPos = 0 - window.pageYOffset/100;  
    s.style.top = 0 + yPos + "%"; }

    window.addEventListener("scroll", function(){
      parallax(); 
    });
  
  const form = document.getElementById("beat-form");
  const beats = document.getElementById("beats");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const beatCover = document.getElementById("beat-cover").files[0];
    const beatMp3 = document.getElementById("beat-mp3").files[0];
    const beatName = document.getElementById("beat-name").value;
    const beatAuthor = document.getElementById("beat-author").value;
    
    // requête POST

    // recupere les données du formulaire
    const formData = new FormData();
    formData.append("cover", beatCover);
    formData.append("audio", beatMp3);
    formData.append("beatName", beatName);
    formData.append("beatAuthor", beatAuthor);
    formData.append("beatGenre", 1);

    //envoi des données à L'API

    await fetch("http://localhost:3004/beats", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((beat) => {
        // clear the beats div
        beats.innerHTML = "";
        addBeats();
      });

    form.reset();
  });

  // Délégation d'événements pour lire l'audio sur les éléments "test"
  $(beats).on("click", ".test", function() {
    var audio = $(this).siblings('.audiotest')[0];

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  const formappear = document.getElementById('beat-form')
  const formBtn = document.getElementById('form-btn')
  const bg = document.getElementById('bg')
  const body = document.getElementById('body')

  
  formBtn.addEventListener('click', () => {
    formappear.style.visibility = 'visible';
    formappear.style.filter='opacity(100%)'
    bg.style.visibility = 'visible'
    bg.style.filter ='opacity(100%)'
    body.style.overflowY= 'hidden'

  });


  bg.addEventListener('click', () => {
    formappear.style.visibility = 'hidden';
    formappear.style.filter='opacity(0%)'
    bg.style.visibility = 'hidden'
    bg.style.filter ='opacity(0%)'
    body.style.overflowY= 'auto'


  
      
  
  });


    var nav = document.getElementById('nav-right');
    var burger = document.getElementById('burger');

    burger.addEventListener('click',() =>{
      nav.style.display = 'flex';
      nav.style.justifyContent = 'center';
      nav.style.alignItems= 'center';
      nav.style.display = 'block';
      nav.style.position= 'absolute';
      nav.style.width ='100vw';
      nav.style.height ='100vh';


    });
});





  

  














