const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDisplay = document.getElementById("averageDisplay");
averageDisplay.textContent = "Promedio de Calificaciones: No Disponible";

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

});

// Función para agregar un estudiante a la tabla
function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>`;    
    tableBody.appendChild(row);   
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