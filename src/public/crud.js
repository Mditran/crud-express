const form = document.getElementById("user-form");
const createUserButton = document.getElementById("create-user-btn");

listarUsuario();
createUserButton.addEventListener("click", (event) => {
    event.preventDefault(); // prevenir que se envíe el formulario automáticamente

    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    const email = form.elements["email"].value;

    const data = { name, age, email };
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
        limpiarDatos();
        userTableBody.replaceChildren();
        listarUsuario();
    })
    .catch((error) => console.error(error));
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
            const idCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const ageCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const accionsCell = document.createElement('td');
            const updateButton = document.createElement('Button');
            const deleteButton = document.createElement('Button');

            console.log(user._id);
            idCell.textContent = user._id;
            nameCell.textContent = user.name;
            ageCell.textContent = user.age;
            emailCell.textContent = user.email;
            updateButton.classList.add("edit-btn");
            deleteButton.classList.add("delete-btn");
            updateButton.textContent = 'Update';
            updateButton.onclick = (e)=>{
                console.log(e);
                
                modal.classList.add('modal--show');
                titulo.innerHTML = `Editar de ${user.name}`;
                codi.innerHTML = user._id;
                alert(`Actualizar usuario: ${user.name}, ${user.age}, ${user.email}`);
                form.elements["name"].value = user.name;
                form.elements["age"].value = user.age;
                form.elements["email"].value = user.email;

            }
            deleteButton.textContent = 'Delete';
            accionsCell.appendChild(updateButton);
            accionsCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(ageCell);
            row.appendChild(emailCell);
            row.appendChild(accionsCell);

            userTableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));
}

