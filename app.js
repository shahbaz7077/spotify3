let curr = null;
let indexSong=0;

let songs = ["/song/song1.mp3",
   "/song/song2.mp3",
   "/song/song3.mp3",
   "/song/song4.mp3",
   "/song/song5.mp3"

];
songs = await get();
// async function get() {
//    let a = await fetch("/song/");
//    let res = await a.text();
//    let div = document.createElement("div");
//    div.innerHTML = res;
//    let as = div.getElementsByTagName("a");
   
//    for (let index = 0; index < as.length; index++) {
//       const element = as[index];
//       if (element.href.endsWith(".mp3")) {
//          // Extract just the filename
//             songs.push(element.href)
//          let filename = element.href
//       }
//    }
//    return songs;
// }
// let songs = [
//    "/song/song1.mp3",
//    "/song/song2.mp3",
//    "/song/song3.mp3"
// ];

function loadSongs() {
   let list = document.querySelector(".list ul");
   list.innerHTML = "";

   for (let i = 0; i < songs.length; i++) {
      let song = songs[i];
      let name = song.split("/").pop();

      let li = document.createElement("li");
      li.innerHTML = `<div class="card">${name}</div>`;

      li.addEventListener("click", () => {
         playM(song);
      });

      list.appendChild(li);
   }
}

loadSongs();


function playM(track) {
   if (curr) {
      curr.pause();
      curr.currentTime = 0;
   }

   curr = new Audio(track);

   curr.play().catch(err => console.log(err));

   document.querySelector(".N").innerHTML = track.split("/").pop();

   curr.addEventListener("timeupdate", () => {
      document.querySelector(".T").innerHTML =
         `${runtime(curr.currentTime)}/${runtime(curr.duration)}`;

      document.querySelector(".cir").style.left =
         (curr.currentTime / curr.duration) * 100 + "%";
   });
}
function runtime(sec){
   if (isNaN(sec))  return "00:00";
    let m=Math.floor(sec/60);
   let s= Math.floor(sec%60);
  
   return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}
 function prevSong() {
   indexSong= (indexSong-1+songs.length)%songs.length;
      playM(songs[indexSong])
  }
  function nextSong() {
   indexSong= (indexSong+1)%songs.length;
      playM(songs[indexSong])
  }
let  c1=document.querySelector(".a");
let  c2=document.querySelector(".b");
let  c3=document.querySelector(".c");
let  c4=document.querySelector(".d");
let  c5=document.querySelector(".f");

document.querySelector(".back").addEventListener("click", prevSong);
  document.querySelector(".next").addEventListener("click", nextSong);
//   document.querySelector(".play").addEventListener("click", togglePlay);


async function main() {
   let songs = await get();
   console.log(songs);
   let list = document.querySelector(".list").getElementsByTagName("ul")[0];

   list.innerHTML = "";
   
   let htmlContent = "";
   for (const son of songs) {
      htmlContent += `<li><div class="card">${decodeURI(son).replace("http://127.0.0.1:3000/" , " " )}</div></li>`;
   }
   list.innerHTML = htmlContent;

   Array.from(document.querySelector(".list").getElementsByTagName("li")).forEach(e => {
      e.addEventListener("click", element => {
         let songName = e.querySelector(".card")
         console.log(songName);
         let index = Array.from(e.parentElement.children).indexOf(e);
playM(songs[index]);
      });
   });
   let cards = [c1, c2, c3, c4, c5];

cards.forEach((card, index) => {
   card.addEventListener("click", () => {
      playM(songs[index]);
   });  
});
  let play=document.querySelector(".play");
   
   play.addEventListener("click", () => {
        if (curr.paused) {
            curr.play()
            play.src = "pause.svg"
        }
        else {
            curr.pause()
            play.src = "play.svg"
        }
    })
    
}
  
main();    
 



// let cards = [c1, c2, c3, c4];

// // cards.forEach((card, index) => {
// //    card.addEventListener("click", () => {
// //       playM(songs[index]);
// //    });
// // });let songs = await get(); // your song array
// 
