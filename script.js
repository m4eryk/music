var today= new Date;
var options = {
    month: 'long',
    day: 'numeric',
};
var el_date = document.getElementById("day"); 
el_date.innerHTML =" "+ today.toLocaleString("ru", options);
var mix = false;
var activ=false;
var timer;
var count=0;

var song = [{
      src :"assets/music/Мари Краимбрери – Ты полюби меня пьяную.mp3",
      title : "Ты полюби меня пьяную",
      artist : "Мари Краимбрери",
      img : 'assets/img/song/pyanay.jpg',
      id: 0
    },
    {
      src : "assets/music/tima_belorusskikh_-_nezabudka_(zaycev.net).mp3",
      title : "Незабудка",
      artist : "Тима Беларуских",
      img : 'assets/img/song/nezabudka.jpg',
      id: 1
    },
    {
      src :"assets/music/Smash – Сохрани (ft. Артем Пивоваров).mp3",
      title : "Сохрани",
      artist : "Smash",
      img : 'assets/img/song/sochrani.jpg',
      id: 2
    },
    ,
    {
      src :"assets/music/Артем Пивоваров – Собирай меня.mp3",
      title : "Собирай меня",
      artist : "Артем Пивоваров",
      img : 'assets/img/song/sobiraymena.jpg',
      id: 3
    },
    {
      src :"assets/music/Infected Mushroom - Becoming Insane.mp3",
      title : "Becoming Insane",
      artist : "Infected Mushroom",
      img : 'assets/img/ba3e6de7138bda3be6193a3a37ff26b0.1000x1000x1.jpg',
      id: 4
    }  
];


function changColor(elm) {
  if ( elm.style.color=="deepskyblue" && elm.className!="fas fa-volume-up fa-1x"){
    elm.style.color="#b0b0b0";
  }
  else if (elm.className=="fas fa-volume-mute fa-1x"){
    elm.style.color="#b0b0b0";
  }
  else{
    elm.style.color="deepskyblue";
  }
}


function Mix(elm){
  if(mix){
    mix=false;
  }
  else{
    mix=true;
  }
  changColor(elm);
}

function Loop(elm){
  var audio = document.getElementById('audio');
  if(audio.loop && audio.played){
    audio.loop=false;
  }
  else if(audio.played){
    audio.loop=true;
  }
  changColor(elm);
}

function Mute(elm) {
  var audio = document.getElementById('audio');
  if ( elm.className=="fas fa-volume-up fa-1x"){
    elm.className="";
    elm.className="fas fa-volume-mute fa-1x";
    audio.muted=true;
  }
  else{
    elm.className="";
    elm.className="fas fa-volume-up fa-1x";
    audio.muted=false;
  }
}
function next(){
  var audio = document.getElementById('audio'); 
  var title= document.getElementById('title');
  var artist=document.getElementById('artist');
  var banner=document.getElementById('banner');

  if(mix){
    count=Math.random(0, song.length).toFixed(0);
    console.log(count);
  }
  else{
    incCount();
  }

  audio.src=song[count].src;
  audio.pause();
  banner.src=song[count].img;
  title.innerHTML=song[count].title;
  artist.innerHTML=song[count].artist;
  playOrPause();
}

function previous(){
  if(mix){
    count=Math.random(0, song.length).toFixed(0);
  }
  else{
    decCount();
  }
  
  var audio = document.getElementById('audio'); 
  var title= document.getElementById('title');
  var artist=document.getElementById('artist');
  var banner=document.getElementById('banner');
  audio.src=song[count].src;
  audio.pause();
  banner.src=song[count].img;
  title.innerHTML=song[count].title;
  artist.innerHTML=song[count].artist;
  playOrPause();
} 


function selctSong(id)
{
  
}

function playOrPause(){
  var progressElm=document.getElementById('progress');
  var audio = document.getElementById('audio'); 
  var start = document.getElementById('start');
  var end = document.getElementById('end');
  if(!activ){
    activ=true;
    timer= setInterval(()=>{
        progressElm.value=audio.currentTime.toFixed(0);
        start.innerHTML=(audio.currentTime / 60).toFixed(2);
        progressElm.max=audio.duration.toFixed(0);
        end.innerHTML=(audio.duration / 60).toFixed(2);
        if(audio.currentTime>=audio.duration){
          next()
        }
    })
  }
  var audio = document.getElementById('audio'); 
  if(audio.src== ''){
    audio.src=song[0].src;
    title.innerHTML=song[0].title;
  artist.innerHTML=song[0].artist;
  }
  audio.paused ? audio.play() : audio.pause();
  changIconPlay();
}


function changIconPlay(){
  var elm= document.getElementById('playIcon');
  if(audio.paused){
    elm.className="";
    elm.className="fas fa-play fa-2x";
  }
  else{
    elm.className="";
    elm.className="fas fa-pause fa-2x";
  }
  
  progress(1000);
}

function progress(time){
  var progressElm=document.getElementById('progress');
  var audio = document.getElementById('audio'); 
  if(!activ){
    activ=true;
    timer= setInterval(()=>{
        progressElm.value=audio.currentTime.toFixed(0);
        progressElm.max=audio.duration.toFixed(0);
    })
  }
}


function incCount(){
  if(count >= song.length-1){
    count=0;
  }
  else{
    count++;
  }
}

function decCount(){
  if(count <= 0){
    count=song.length-1;
    console.log(count);
  }
  else{
    console.log(count);
    count--;
  }
}

