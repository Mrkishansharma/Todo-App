
const BASEURL = 'https://green-sheath-dress.cyclic.app'

// import serverroom from './serverroom.js';

// const BASEURL = serverroom()

let registerForm = document.getElementById('register');


registerForm.addEventListener('submit',(event)=> {
    event.preventDefault();

    if(registerForm.r_confirm_pass.value !== registerForm.r_pass.value){

        alert('Password Not Match 🚫');

    }else{
        
        registerUser();

    }

})


const registerUser = () => {

    let payload = {
        Email: registerForm.r_email.value,
        Name: registerForm.r_name.value,
        Password: registerForm.r_pass.value,
        Age: registerForm.r_age.value,
        Location: registerForm.r_address.value,
        Contact: registerForm.r_number.value
    }

    console.log(payload);
    insertUserToDB(payload);   

}

const insertUserToDB = async (payload) => {
     try {

        let res = await fetch(`${BASEURL}/user/register`, {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(res.ok){

            res = await res.json();

            alert('Your Account Successfully created.');

            location.href = 'login.html';

        }else{

            alert('Something went wrong. Please enter detail correctly.');

        }
        
        
    } catch (error) {

        alert('Something went wrong');

    }
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


        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'aqua'

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