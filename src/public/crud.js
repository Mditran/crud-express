const form = document.getElementById("user-form");
const createUserButton = document.getElementById("create-user-btn");
const updateUserButton = document.getElementById("update-user-btn");

listarUsuario();

createUserButton.addEventListener("click", (event) => {
    event.preventDefault(); // prevenir que se envíe el formulario automáticamente
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    const email = form.elements["email"].value;
    if (name === "" || age === "" || email === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const data = { name, age, email };
    if (validateForm(name, age, email)) {
        fetch("http://localhost:9000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        modal.classList.remove('modal--show');
        alert("Usuario registrado correctamente.");
        // Limpiar los campos del formulario
        
        userTableBody.replaceChildren();
        listarUsuario();
    })
    .catch((error) => console.error(error));
        alert("El formulario se ha enviado correctamente.");
        form.reset();
    }else{
        alert("Por favor, llene todos los campos")
    }
    
});

updateUserButton.addEventListener("click", (event) => {
    event.preventDefault(); // prevenir que se envíe el formulario automáticamente
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    const email = form.elements["email"].value;
    if (name === "" || age === "" || email === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const data = { name, age, email };
    if (validateForm(name, age, email)) {
        fetch(`http://localhost:9000/api/users/${updateUserButton.getAttribute('data-id')}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            modal.classList.remove('modal--show');
            alert("Usuario actulizado correctamente.");
            // Limpiar los campos del formulario
            limpiarDatos();
            userTableBody.replaceChildren();
            listarUsuario();
        })
        .catch((error) => console.error(error));
    }else{
        alert("Por favor, llene todos los campos")
    }
});

function limpiarDatos(){
    form.elements["name"].value = "";
    form.elements["age"].value = "";
    form.elements["email"].value = "";
}

const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    titulo.innerHTML = 'Crear usuario';
    createUserButton.classList.remove('place_order');
    updateUserButton.classList.add('place_order');
    limpiarDatos();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});
const userTableBody = document.getElementById('user-table');

const titulo = document.getElementById('codi');
const codi = document.getElementById('codigoUsuario');

function listarUsuario(){
    fetch('http://localhost:9000/api/users')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const ageCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const accionsCell = document.createElement('td');
            const updateButton = document.createElement('Button');
            const deleteButton = document.createElement('Button');
            const icono1 = document.createElement('i');
            const icono2 = document.createElement('i');

            nameCell.textContent = user.name;
            ageCell.textContent = user.age;
            emailCell.textContent = user.email;
            updateButton.classList.add("edit-btn");
            deleteButton.classList.add("delete-btn");
            icono1.classList.add("fa-pen-to-square");
            icono1.classList.add("fa-solid");
            icono1.classList.add("fa-sharp");
            updateButton.appendChild(icono1);
            updateButton.setAttribute('data-id', user._id);
            deleteButton.setAttribute('data-id', user._id);
            updateButton.onclick = (e)=>{
                updateUserButton.classList.remove('place_order');
                createUserButton.classList.add('place_order');
                modal.classList.add('modal--show');
                titulo.innerHTML = `Editar usuario: ${user.name}`;
                updateUserButton.setAttribute('data-id', updateButton.getAttribute('data-id'))
                form.elements["name"].value = user.name;
                form.elements["age"].value = user.age;
                form.elements["email"].value = user.email;
            }
            icono2.classList.add("fa-solid");
            icono2.classList.add("fa-sharp");
            icono2.classList.add("fa-trash");
            deleteButton.appendChild(icono2);
            deleteButton.onclick = (e)=>{
                if (confirm(`¿Estás seguro que deseas eliminar el usuario con ID ${e.target.getAttribute('data-id')}?`)) {
                    fetch(`http://localhost:9000/api/users/${e.target.getAttribute('data-id')}`, {
                        method: 'DELETE'
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        alert('Usuario eliminado correctamente.');
                        userTableBody.replaceChildren();
                        listarUsuario();
                    })
                    .catch((error) => console.error(error));
                }
            }
            accionsCell.appendChild(updateButton);
            accionsCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(ageCell);
            row.appendChild(emailCell);
            row.appendChild(accionsCell);

            userTableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));
}

function validateForm(name, edad,email) {
    let isValid = true;
    if (name.trim() === "") {
        isValid = false;
    } 
    if (edad.trim() === "") {
        isValid = false;
    }
    if (email.trim() === "") {
        isValid = false;
    } else if (!isEmail(email.trim())) {
        alert("El correo electrónico no es válido");
        isValid = false;
    } 
    return isValid;
}

function isEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.){3}[0-9]{1,3}|(([a-zA-Z0-9]+\.)*[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}