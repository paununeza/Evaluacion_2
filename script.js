const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDisplay = document.getElementById("averageDisplay");
averageDisplay.textContent = "Promedio de Calificaciones: No Disponible";
const totalStudents = document.getElementById("totalStudents");
totalStudents.textContent = "Total de estudiantes: 0";
const numAprobados = document.getElementById("numAprobados");
numAprobados.textContent = "Cantidad de aprobados: 0";
const numReprobados = document.getElementById("numReprobados");
numReprobados.textContent = "Cantidad de reprobados: 0";


// Agregar evento al formulario para capturar el evento de envío (submit)
document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)) {
        alert("Error Datos Incorrectos");
        return;
    }
    // Guardar datos en el array
    const student = {name, lastName, grade};
    students.push(student);
    addStudentToTable(student);
    updateAverage();
    // Limpiar el formulario después de agregar el estudiante
    this.reset();
    countStudent();
});

// Función para agregar un estudiante a la tabla
function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td> 
           <button class = "edit">Editar</button>
           <button class = "delete">Eliminar</button>
        </td>
    `;

    row.querySelector(".delete").addEventListener("click", function(){
        deleteEstudiante(student,row);
    });
    row.querySelector(".edit").addEventListener("click", function () {
        editEstudiante(student, row);
    });

    tableBody.appendChild(row);   
}

// Función para editar fila estudiante
function editEstudiante(student, row) {
    // Llenar el formulario con los datos del estudiante
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;

    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        row.remove();
        updateAverage();
    }
}

// Función para eliminar fila estudiante
function deleteEstudiante(student, row){
    // Busca el estudiante en el array
    const index = students.indexOf(student);
    if (index > -1){
        students.splice(index, 1);
        row.remove();
        updateAverage();
        countStudent();
    }
}

// Función para calcular promedio de calificaciones
function updateAverage() {
    if (students.length === 0) {
        averageDisplay.textContent = "Promedio de Calificaciones: No Disponible";
        return;
    }
    const totalGrades = students.reduce((sum, student) => sum + parseFloat(student.grade), 0);
    const average = (totalGrades / students.length).toFixed(2);
    averageDisplay.textContent = `Promedio de Calificaciones: ${average}`;
}

// Función para estadísticas
function countStudent() {
    if (students.length === 0){
        totalStudents.textContent = "Total de estudiantes: 0";
        numAprobados.textContent = "Cantidad de aprobados: 0";
        numReprobados.textContent = "Cantidad de reprobados: 0";
        return;
    }
    let totalEstudiantes = students.length;
    totalStudents.textContent = `Total de estudiantes: ${totalEstudiantes}`;

    const aprobado = students.filter(student => student.grade >= 4.0).length;
    numAprobados.textContent = `Cantidad de aprobados: ${aprobado}`;

    const reprobado = students.filter(student => student.grade < 4.0).length;
    numReprobados.textContent = `Cantidad de reprobados: ${reprobado}`;
}

// Agregar mensajes de error en cada input en español
document.getElementById("name").addEventListener("invalid", function (e) {
    if (this.validity.valueMissing) {
        this.setCustomValidity("Por favor, complete el campo 'Nombre'.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("lastName").addEventListener("invalid", function (e) {
    if (this.validity.valueMissing) {
        this.setCustomValidity("Por favor, complete el campo 'Apellido'.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("grade").addEventListener("invalid", function (e) {
    if (this.validity.valueMissing) {
        this.setCustomValidity("Por favor, ingrese una calificación.");
    } else if (this.validity.rangeUnderflow || this.validity.rangeOverflow) {
        this.setCustomValidity("La calificación debe estar entre 1.0 y 7.0.");
    } else if (this.validity.typeMismatch || this.validity.stepMismatch) {
        this.setCustomValidity("Ingrese un número válido con un decimal como máximo.");
    } else {
        this.setCustomValidity("");
    }
});