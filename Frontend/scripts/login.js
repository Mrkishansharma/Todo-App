
const BASEURL = 'https://green-sheath-dress.cyclic.app'

// import serverroom from './serverroom.js';

// const BASEURL = serverroom()


const loginform = document.getElementById("login");

const useremail = document.getElementById("l_email");

const userpass = document.getElementById("l_password");

loginform.addEventListener("submit", function (e){

    e.preventDefault();
    
    userLogin();

});



function userLogin(){
    
    let user = {

        Email:useremail.value,
        Password:userpass.value

    }

    LoginNewUser(user);

}



function LoginNewUser(user){

    fetch(`${BASEURL}/user/login`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then((res)=>{

        return res.json()
    })

    .then((data)=>{

        console.log(data);

        if(data.token){

            localStorage.setItem("usertoken",data.token);

            alert("Login Successfull")

            location.href = "../index.html" 
        }

        else{

            alert("Oops ! Wrong Password ")

        }

    })
    .catch((err)=>{

        alert("Login Failed")
        
    })
   

}








// Dark Mode   Light Mode


let darkModeBtn = document.getElementById('darkModeBtn');

darkModeBtn.addEventListener('click', ()=>{
    let modeInfo = localStorage.getItem('todoMode') || null;
    if(!modeInfo){
        modeInfo = 'L';
        localStorage.setItem('todoMode', modeInfo);
    }
    
    if(modeInfo === 'L'){
        
        modeInfo = 'D'
        localStorage.setItem('todoMode', modeInfo);
    }else{

        modeInfo = 'L'
        localStorage.setItem('todoMode', modeInfo);
    }
    darkModeKeLiyeFunction()
})



// function for dark light mode
darkModeKeLiyeFunction()

function darkModeKeLiyeFunction(){
    
    let modeInfo = localStorage.getItem('todoMode') || null;
    if(!modeInfo){
        modeInfo = 'L';
        localStorage.setItem('todoMode', modeInfo);
    }
    
    if(modeInfo === 'L'){

// Light Mode
        document.body.style.backgroundColor = 'white'
        document.body.style.color = 'black'



        let allA = document.querySelectorAll('a')
        for(let ele of allA){
            ele.style.color = 'black'
        }

        let allTH = document.querySelectorAll('th')
        for(let ele of allTH){
            ele.style.color = 'black'
        }
        
    }else{

// Dark Mode
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'aqua'


        document.getElementById('welcomeText').style.color = 'aqua'

        let allA = document.querySelectorAll('a')
        for(let ele of allA){
            ele.style.color = 'white'
        }

        let allTH = document.querySelectorAll('th')
        for(let ele of allTH){
            ele.style.color = 'white'
        }

    }
}