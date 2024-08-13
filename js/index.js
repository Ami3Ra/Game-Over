// ? ===========>   GLOBAL    ===========>
  const inputs = document.querySelectorAll("input");
const formData = document.querySelector("form");
const btnLogIn = document.getElementById("btnRegister");
let mode = document.getElementById("mood");
let isValid = false;

// ! ============>     WHEN START      ===============>
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
    formData.addEventListener("submit" , function(e){
        e.preventDefault()
        if(isValid){
            setForm()
        }
       
    });

    formData.addEventListener("input" , function(){
        if(validationEmail() && validationPassword()){
            isValid = true;
        }else{
            isValid = false;
        }
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
       
     });



// ! ============>     FUNCTION      ===============>
    function setForm(){
        let user={ 
          email:inputs[0].value,  
          password:inputs[1].value,  

        };
        logInForm(user) 
        
    } 

    async function logInForm(userData){
        const api = await fetch(`https://movies-api.routemisr.com/signin` ,{
            method:"post",
            body:JSON.stringify(userData),
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },

        });
        const response = await api.json()

        if(response.message === "success"){
          localStorage.setItem("uToken",response.token)
            location.href = './home.html';
        }else{
            document.getElementById("msg").innerHTML = response.message;
        }
        console.log(response);
        
    }

    function validationEmail(){
       const regexStyle =

      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      
            if(regexStyle.test(inputs[0].value)){  // data ok
            inputs[0].classList.add('is-valid')
            inputs[0].classList.remove('is-invalid')
            return true;
        }else{  // data error
            inputs[0].classList.add('is-invalid')
            inputs[0].classList.remove('is valid')
            return false;
        }
  
    }


    function validationPassword(){
       const regexStyle =
             /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      
            if(regexStyle.test(inputs[1].value)){  // data ok
            inputs[1].classList.add('is-valid')
            inputs[1].classList.remove('is-invalid')
            return true;
        }else{  // data error
            inputs[1].classList.add('is-invalid')
            inputs[1].classList.remove('is valid')
            return false;
        }
  
    }

    

    