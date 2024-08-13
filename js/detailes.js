// ? ===========>   GLOBAL    ===========>
   let mode = document.getElementById("mood");
// ! ============>     WHEN START      ===============>
   const searchParams = location.search;
   console.log(searchParams);
   const params = new URLSearchParams(searchParams);
   const id = params.get('id');
   console.log(id);
   

   let containerDetails = {};

(async function(){
    const options = {
        method: "GET",
        headers: {
           "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
           "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
     };
     const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
  
     const responseData = await api.json();
  
     containerDetails = responseData;
     displayData();
  
     console.log(responseData);
})();

if(localStorage.getItem("theme") !=null){
   const themeData = localStorage.getItem("theme");
   if(themeData === "light"){
      mode.classList.replace("fa-sun" , "fa-moon")
   }else{
      mode.classList.replace( "fa-moon" , "fa-sun")
   }
   document.querySelector("html").setAttribute("data-theme" , themeData)
};


// * =============>  EVENTS  ===============>

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

function displayData(){
    const detailesBox = `
    
    <div class="col-md-4">
   <figure>
      <img src="${containerDetails.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${containerDetails.title}</li>
         </ol>
      </nav>

      <h1>${containerDetails.title}</h1>

      <h3>About ${containerDetails.title}</h3>
      <p>${containerDetails.description}</p>

      
   </div>
</div>`

document.getElementById("detailesData").innerHTML = detailesBox;
const backgroundImg = containerDetails.thumbnail.replace('thumbnail' , 'background');
document.body.style.cssText = `
   background-image:url('${backgroundImg}') ;
   background-size:cover;
   background-position:center;`;
}
   
   