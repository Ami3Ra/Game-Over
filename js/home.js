// ? ===========>   GLOBAL    ===========>
let loading = document.querySelector(".loading");
let mode = document.getElementById("mood");
// ! ============>     WHEN START      ===============>
getGames('mmorpg');

if(localStorage.getItem("theme") !=null){
   const themeData = localStorage.getItem("theme");
   if(themeData === "light"){
      mode.classList.replace("fa-sun" , "fa-moon")
   }else{
      mode.classList.replace( "fa-moon" , "fa-sun")
   }
   document.querySelector("html").setAttribute("data-theme" , themeData)
}

// * =============>  EVENTS  ===============>
document.querySelectorAll('.menu a').forEach(function(link){
    link.addEventListener("click", function(){
        document.querySelector('.menu .active').classList.remove('active');
        link.classList.add('active');
    //    console.log( link.getAttribute('data-category'));  
    const category = link.getAttribute('data-category');
       console.log(category);
       getGames(category);
       
    });
});

document.querySelector(".logout-btn").addEventListener("click" , function(){
    localStorage.removeItem("uToken");
    location.href = "./index.html";
});

mode.addEventListener("click" , function(){
   if(mode.classList.contains("fa-sun")){
      document.querySelector("html").setAttribute("data-theme" , "light")
      mode.classList.replace("fa-sun" , "fa-moon")  // ----> change icon moon
      localStorage.setItem("theme" , "light")
   }else{
      document.querySelector("html").setAttribute("data-theme" , "dark")
      mode.classList.replace("fa-moon", "fa-sun")  // ----> change icon moon
      localStorage.setItem("theme" , "dark")
   }
  
})



// ! ============>     FUNCTION      ===============>
  
async function getGames(categoryName){
    loading.classList.remove('d-none'); // show loader
    const options = {
        method: "GET",
        headers: {
           "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
           "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
     };


    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}` , options);
    const data = await api.json();
    console.log(data);
    displayData(data);
    loading.classList.add('d-none'); // hide loader
}  
function displayData(gamesData){
    let gamesBox = ``;
    for(let i=0 ; i < gamesData.length ; i++){
        let videoPath =gamesData[i].thumbnail.replace('thumbnail.jpg' , 'videoplayback.webm');
        gamesBox +=`
        
        <div class="col">
      <div   onmouseleave="stopVideo(event)"  onmouseenter="showVideo(event)"  onclick="showDetailes(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">

            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />

             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videoPath}">
              </video>

            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small"> ${gamesData[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text text-secondary small text-center">
                  ${gamesData[i].short_description}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${gamesData[i].genre}</span>
            <span class="badge badge-color">${gamesData[i].platform}</span>

         </footer>
      </div>
   </div> `
    }

    document.getElementById("gamesData").innerHTML = gamesBox;
}


function showVideo(event){
    let videoEl = event.target.querySelector('video');
    videoEl.classList.remove('d-none');
    videoEl.muted = true;
    videoEl.play();
    
}
function stopVideo(event){
    let videoEl = event.target.querySelector('video');
    videoEl.classList.add('d-none');
    videoEl.muted = true;
    videoEl.pause();
    
}

function showDetailes(id){
    location.href = `./detailes.html?id=${id}`;
}