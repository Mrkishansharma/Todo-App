
const MAINURL = 'https://green-sheath-dress.cyclic.app'

let usertoken = localStorage.getItem('usertoken') || null;

let logedInUser = {};

if (usertoken) {
    fetchUserDetails()
}


async function fetchUserDetails() {
    try {

        let res = await fetch(`${MAINURL}/user/get`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${usertoken}`
            }
        });

        if (res.ok) {

            res = await res.json();

            logedInUser = res;

            renderUserName()
            

        } else {

            localStorage.removeItem('usertoken');

            alert('Something went wrong');
            location.reload()

        }


    } catch (error) {
        
        localStorage.removeItem('usertoken');

        alert('Something went wrong');
        location.reload()

    }
}


let signin_up_button = document.getElementById('signin_up_button');

let showUserName = document.getElementById('showUserName');



function renderUserName(){
    
    showUserName.innerHTML = `<i class="fa-solid fa-user"></i> ${logedInUser.Name}` ;
    showUserName.style.display = 'block';

    signin_up_button.innerHTML = `Logout`
}

signin_up_button.addEventListener('click', ()=>{
    if(signin_up_button.innerHTML == 'Logout'){
        localStorage.removeItem('usertoken');
        location.reload()
    }
})







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
            ele.style.border = '1px solid #666'
            ele.style.color = 'white'
        }

    }
}