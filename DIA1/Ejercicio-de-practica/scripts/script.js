// El departamento académico de CampusLands desea crear un programa que le permita llevar el seguimiento académico de todos los ***campers*** que se encuentran matriculados en el programa intensivo de programación.

// Para ello usted es contratado para liderar el desarrollo del programa que debe cumplir con las siguientes especificaciones:

// 1. El programa debe permitir a las personas encargadas de procesar las inscripciones
// a el programa; la información que se tiene por cada ***camper*** es la siguiente : 

// - # de identificación.
// - Nombres.
// - Apellidos.
// - Dirección.
// - Acudiente.
// - Teléfonos de contacto(# de celular y #fijo).
// - Estado (En proceso de ingreso, Inscrito, Aprobado,Cursando, Graduado, Expulsado, Retirado).
// - Riesgo.

// 2. Campus cuenta con diferentes rutas de entrenamiento las cuales deben cumplir los candidatos que superen la prueba inicial. 

// Las rutas son las siguientes: 

// - Ruta NodeJS
// - Ruta Java
// - Ruta NetCore

// 3. El programa debe tener tres roles: **Camper, Trainer y Coordinador**, donde esta última persona debe contar con una opción en el programa que le permita registrar la nota de los ***campers*** que se han registrado y con ello cambiar su estado a “**Aprobado**”. La prueba es aprobada si el promedio entre la nota teórica y la nota practica es mayor o igual a 60.

// 4. Campus cuenta con diferentes áreas de entrenamiento en la cuales los ***campers*** aprenden los diferentes stacks tecnológicos dependiendo de las rutas de entrenamiento. Por el momento se cuenta con tres áreas de entrenamiento con una capacidad máxima de 33 **campers (Tener en cuenta que hay clases cada 4 horas)**.

// 5. La **coordinación académica** desea poder crear nuevas rutas de entrenamiento las cuales contienen la siguiente información (módulos):

// - Fundamentos de programación (Introducción a la algoritmia, PSeInt y Python)
// - Programación Web (HTML, CSS y Bootstrap).
// - Programación formal (Java, JavaScript, C#).
// - Bases de datos (Mysql, MongoDb y Postgresql). Cada ruta tiene un SGDB principal y un alternativo.
// - Backend (NetCore, Spring Boot, NodeJS y Express).

// 6. Los ***campers*** que pasaron de “**Inscritos**” a “**Aprobados**” podrán ser asignados a cualquiera de las rutas que se han creado previamente. Se debe tener en cuenta que no se puede exceder la capacidad de cada una de las áreas de entrenamiento.

// 7. **CampusLands** cuenta con **Trainers** expertos encargados de dirigir cada una de las rutas de entrenamiento. Esto quiere decir que a cada uno se le podrán asignar diferentes rutas de entrenamiento teniendo en cuenta su horario.

// 8. La **coordinación académica** desea contar con un módulo de matriculas que le permita
// asignar los ***campers*** aprobados, **trainer** encargado, ruta de entrenamiento asignada, fecha de inicio, fecha finalización y salón de entrenamiento.

// 9. Periódicamente los ***campers*** son evaluados para conocer las habilidades adquiridas durante el proceso de entrenamiento, donde cuando finaliza cada modulo los ***campers*** deben presentar una prueba teórica y una prueba practica. Esta prueba es considerada como aprobada si el promedio de las dos dan un valor mayor o igual a 60. Aqui la prueba teórica tiene un peso de 30% y la prueba practica tiene un peso del 60%, donde durante dicho proceso el **Trainer** realizará quizes, trabajos los cuales tienen un peso del 10%. Al finalizar el proceso de evaluación se considerará aprobado el modulo si la nota final es mayor a 60.

// 10. La **coordinación académica** cuando finaliza cada uno de los módulos de las rutas
// evalúa el rendimiento de cada uno de los **campers** teniendo en cuenta la nota obtenida en cada modulo. Si la nota es menor a 60 el **camper** queda en rendimiento bajo lo cual genera un llamado de atención. Por esto mismo, se deberá permitir consultar los **campers** que se encuentren en riesgo alto.

// 11. El módulo de reportes debe tener las siguientes funcionalidades: 

// - Listar los **campers** que se encuentren en estado de inscrito.
// - Listar los **campers** que aprobaron el examen inicial.
// - Listar los entrenadores que se encuentran trabajando con **CampusLands**.
// - Listar los **campers** que cuentan con bajo rendimiento.
// - Listar los **campers** y **trainers** que se encuentren asociados a una ruta de entrenamiento.
// - Mostrar cuantos **campers** perdieron y aprobaron cada uno de los módulos teniendo en cuenta la ruta de entrenamiento y el entrenador encargado.

const camper1 = {
    id: 1,
    nombres: "Tomas",
    apellidos: "Esteban",
    direccion: "Calle falsa 123",
    acudiente: "Maria",
    telefonos: {
        celular: "1234567890",
        fijo: "0987654321"
    },
    estado: "Inscrito",
    riesgo: "Alto"
}

const camper2 = {
    id: 2,
    nombres: "Juan",
    apellidos: "Perez",
    direccion: "Calle verdadera 456",
    acudiente: "Carlos",
    telefonos: {
        celular: "1234567890",
        fijo: "0987654321"
    },
    estado: "Aprobado",
    riesgo: "Bajo"
}

const camper3 = {
    id: 3,
    nombres: "Maria",
    apellidos: "Gomez",
    direccion: "Calle falsa 789",
    acudiente: "Ana",
    telefonos: {
        celular: "1234567890",
        fijo: "0987654321"
    },
    estado: "Inscrito",
    riesgo: "Alto"
}

const campers = [camper1, camper2, camper3];

function listarCamperInscritos(campers){
    return campers.filter(camper => camper.estado === "Inscrito");
}

console.log(listarCamperInscritos(campers));

function listarCamperAprobados(campers){
    return campers.filter(camper => camper.estado === "Aprobado");
}

console.log(listarCamperAprobados(campers));

function listarCamperRiesgoAlto(campers){
    return campers.filter(camper => camper.riesgo === "Alto");
}

console.log(listarCamperRiesgoAlto(campers));

const trainer1 = {
    id: 1,
    nombres: "Pedro",
    apellidos: "Gomez",
    direccion: "Calle falsa 123",
    telefonos: {
        celular: "1234567890",
        fijo: "0987654321"
    },
    rutas: ["Ruta NodeJS", "Ruta Java"]
}

const trainer2 = {
    id: 2,
    nombres: "Ana",
    apellidos: "Lopez",
    direccion: "Calle verdadera 456",
    telefonos: {
        celular: "1234567890",
        fijo: "0987654321"
    },
    rutas: ["Ruta NetCore"]
}

const trainers = [trainer1, trainer2];

function listarTrainers(trainers){
    return trainers.map(trainer => trainer.nombres + " " + trainer.apellidos);
}

console.log(listarTrainers(trainers));

function listarCamperTrainerRuta(campers, trainers, ruta){
    const campersEnRuta = campers.filter(camper => camper.estado === "Aprobado");
    const trainersEnRuta = trainers.filter(trainer => trainer.rutas.includes(ruta));
    return {
        campers: campersEnRuta,
        trainers: trainersEnRuta
    }
}

console.log(listarCamperTrainerRuta(campers, trainers, "Ruta NodeJS"));

const modulo1 = {
    nombre: "Fundamentos de programacion",
    pesoTeorico: 0.3,
    pesoPractico: 0.6,
    pesoQuizes: 0.1
}

function evaluarCamper(modulo, notaTeorica, notaPractica, notaQuizes){
    const notaFinal = (notaTeorica * modulo.pesoTeorico) + (notaPractica * modulo.pesoPractico) + (notaQuizes * modulo.pesoQuizes);
    return notaFinal >= 60 ? "Aprobado" : "Reprobado";
}

console.log(evaluarCamper(modulo1, 70, 80, 90));

const modulo2 = {
    nombre: "Programacion Web",
    pesoTeorico: 0.3,
    pesoPractico: 0.6,
    pesoQuizes: 0.1
}

function evaluarCamper(modulo, notaTeorica, notaPractica, notaQuizes){
    const notaFinal = (notaTeorica * modulo.pesoTeorico) + (notaPractica * modulo.pesoPractico) + (notaQuizes * modulo.pesoQuizes);
    return notaFinal >= 60 ? "Aprobado" : "Reprobado";
}

console.log(evaluarCamper(modulo2, 50, 40, 30));

function listarCamperRendimientoBajo(campers){
    return campers.filter(camper => camper.riesgo === "Bajo");
}

console.log(listarCamperRendimientoBajo(campers)); 
const modulo3 = {
    nombre: "Programacion formal",
    pesoTeorico: 0.3,
    pesoPractico: 0.6,
    pesoQuizes: 0.1
}

function evaluarCamper(modulo, notaTeorica, notaPractica, notaQuizes){
    const notaFinal = (notaTeorica * modulo.pesoTeorico) + (notaPractica * modulo.pesoPractico) + (notaQuizes * modulo.pesoQuizes);
    return notaFinal >= 60 ? "Aprobado" : "Reprobado";
}

console.log(evaluarCamper(modulo3, 80, 90, 100));

const modulo4 = {
    nombre: "Bases de datos",
    pesoTeorico: 0.3,
    pesoPractico: 0.6,
    pesoQuizes: 0.1
}

function evaluarCamper(modulo, notaTeorica, notaPractica, notaQuizes){
    const notaFinal = (notaTeorica * modulo.pesoTeorico) + (notaPractica * modulo.pesoPractico) + (notaQuizes * modulo.pesoQuizes);
    return notaFinal >= 60 ? "Aprobado" : "Reprobado";
}

console.log(evaluarCamper(modulo4, 40, 50, 60));

const modulo5 = {
    nombre: "Backend",
    pesoTeorico: 0.3,
    pesoPractico: 0.6,
    pesoQuizes: 0.1
}

function evaluarCamper(modulo, notaTeorica, notaPractica, notaQuizes){
    const notaFinal = (notaTeorica * modulo.pesoTeorico) + (notaPractica * modulo.pesoPractico) + (notaQuizes * modulo.pesoQuizes);
    return notaFinal >= 60 ? "Aprobado" : "Reprobado";
}

console.log(evaluarCamper(modulo5, 90, 80, 70));

const modulo6 = {
    nombre: "Programacion avanzada",
    pesoTeorico: 0.3,
    pesoPractico: 0.6,
    pesoQuizes: 0.1
}

function evaluarCamper(modulo, notaTeorica, notaPractica, notaQuizes){
    const notaFinal = (notaTeorica * modulo.pesoTeorico) + (notaPractica * modulo.pesoPractico) + (notaQuizes * modulo.pesoQuizes);
    return notaFinal >= 60 ? "Aprobado" : "Reprobado";
}

console.log(evaluarCamper(modulo6, 70, 60, 50));

const coordinador1 = {
    id: 1,
    nombres: "Laura",
    apellidos: "Martinez",
    direccion: "Calle falsa 123",
    telefonos: {
        celular: "1234567890",
        fijo: "0987654321"
    }
}

const coordinadores = [coordinador1];

function listarCoordinadores(coordinadores){
    return coordinadores.map(coordinador => coordinador.nombres + " " + coordinador.apellidos);
}

console.log(listarCoordinadores(coordinadores));

function registrarNotaCamper(camper, notaTeorica, notaPractica){
    const promedio = (notaTeorica + notaPractica) / 2;
    if(promedio >= 60){
        camper.estado = "Aprobado";
    } else {
        camper.estado = "Reprobado";
    }
}

registrarNotaCamper(camper1, 70, 80);
console.log(camper1.estado);

registrarNotaCamper(camper3, 50, 40);
console.log(camper3.estado);

const matricula1 = {
    camper: camper1,
    trainer: trainer1,
    ruta: "Ruta NodeJS",
    fechaInicio: "2024-01-01",
    fechaFin: "2024-06-30",
    salon: "Salon 1"
}

const matricula2 = {
    camper: camper2,
    trainer: trainer2,
    ruta: "Ruta NetCore",
    fechaInicio: "2024-01-01",
    fechaFin: "2024-06-30",
    salon: "Salon 2"
}

const matriculas = [matricula1, matricula2];

function listarMatriculas(matriculas){
    return matriculas.map(matricula => {
        return {
            camper: matricula.camper.nombres + " " + matricula.camper.apellidos,
            trainer: matricula.trainer.nombres + " " + matricula.trainer.apellidos,
            ruta: matricula.ruta,
            fechaInicio: matricula.fechaInicio,
            fechaFin: matricula.fechaFin,
            salon: matricula.salon
        }
    });
}

console.log(listarMatriculas(matriculas));