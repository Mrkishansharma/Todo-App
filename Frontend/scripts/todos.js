

const BASEURL = 'https://green-sheath-dress.cyclic.app'

const tbody = document.querySelector('tbody');

const token = localStorage.getItem('usertoken') || null;

let myTodos = []

if (token) {
    fetchTodos()
} else {
    alert('Please LogIn First.')
    location.href = 'login.html'
}


async function fetchTodos() {
    let res = await fetch(`${BASEURL}/todo/get`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.ok) {
        res = await res.json();
        myTodos = res
        renderTodos(res)
    } else {
        alert('Please LogIn First.')
    }
}


function renderTodos(data) {
    tbody.innerHTML = ''

    let todoData = data.map(ele => {
        return getRows(ele)
    }).join('')

    tbody.innerHTML = todoData

}

function getRows({ TaskName, Status, _id }) {

    return `<tr>
                <td class="tdTodo">${_id}</td>
                <td class="tdTodo">${TaskName}</td>
                <td class="tdTodo">${Status ? "Completed" : "Pending"}</td>

                    <td class="createTodoBtn" onClick="handleClickEdit('${_id}')" type="button"  data-bs-toggle="modal"
                        data-bs-target="#editTodo" data-bs-whatever="@mdo" style="border-top: 1px solid black; width:100%; padding-top:5px">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </td>


                <td class="tdTodo" onclick="handleClickDelete('${_id}')" > <i class="fa-solid fa-trash"></i> </td>
            </tr>`
}








let creatTodoForm = document.getElementById('creatTodoForm')

creatTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!creatTodoForm.c_taskName.value && !creatTodoForm.c_status.value) {
        alert('Please fill all detail')
        return
    }

    let payload = {
        TaskName: creatTodoForm.c_taskName.value,
        Status: creatTodoForm.c_status.value
    }


    fetch(`${BASEURL}/todo/add`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((data) => {
            alert('Successfully Created')
            location.reload()
        })
        .catch((err) => {
            alert('Something went wrong')
        })

})


let editTodoForm = document.getElementById('editTodoForm')

editTodoForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let todoid = editTodoForm.e_todoid.value
    let todoname = editTodoForm.e_taskName.value
    let todostatus = editTodoForm.e_status.value

    let payload = {
        TaskName: todoname,
        Status: todostatus
    }

    fetch(`${BASEURL}/todo/update/${todoid}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((data) => {

            if (data.error) {
                alert(data.error)
            } else {
                alert('Successfully updated todo.')
                location.reload()
            }

        })
        .catch((err) => {
            alert('Something went wrong')
        })

})

function handleClickEdit(id) {
    fetch(`${BASEURL}/todo/getone/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {

            // auto fill data
            editTodoForm.e_todoid.value = data._id;
            editTodoForm.e_taskName.value = data.TaskName;
            editTodoForm.e_status.value = data.Status;

        })
        .catch((err) => {
            alert('Something went wrong')
        })
}


function handleClickDelete(id) {
    fetch(`${BASEURL}/todo/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {

            console.log(data);
            alert(data.msg)

            location.reload()

        })
        .catch((err) => {
            alert('Something went wrong')
        })
}






// ****************************** Filter Functionality

let taskSearch = document.getElementById('taskSearch');
let taskFilter = document.getElementById('taskFilter');


taskFilter.addEventListener('change', filterFunc);
taskSearch.addEventListener('input', filterFunc);


function filterFunc(event){
    
    let url = `${BASEURL}/todo/get?TaskName=${taskSearch.value}&Status=${taskFilter.value}`

    fetchTodosWithQuery(url)

}


async function fetchTodosWithQuery(url) {
    let res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.ok) {
        res = await res.json();
        renderTodos(res)
    } else {
        alert('Please LogIn First.')
    }
}
