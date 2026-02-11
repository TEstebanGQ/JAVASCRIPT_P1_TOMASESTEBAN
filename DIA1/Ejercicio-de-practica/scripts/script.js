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


function crearCamper(id, nombres, apellidos, direccion, acudiente, celular, fijo) {
    return {
        id,
        nombres,
        apellidos,
        direccion,
        acudiente,
        telefonos: { celular, fijo },
        estado: "En proceso de ingreso",
        riesgo: false,
        modulos: []
    }
}

const campers = [
    crearCamper(1, "Tomas", "Esteban", "Calle 1", "Maria", "123", "456"),
    crearCamper(2, "Juan", "Perez", "Calle 2", "Carlos", "789", "111"),
    crearCamper(3, "Maria", "Gomez", "Calle 3", "Ana", "222", "333")
];


function crearTrainer(id, nombres, apellidos, rutas = []) {
    return {
        id,
        nombres,
        apellidos,
        rutas
    }
}

const trainers = [
    crearTrainer(1, "Pedro", "Gomez", ["Ruta NodeJS", "Ruta Java"]),
    crearTrainer(2, "Ana", "Lopez", ["Ruta NetCore"])
];

function crearModulo(nombre) {
    return {
        nombre,
        pesoTeorico: 0.3,
        pesoPractico: 0.6,
        pesoQuizes: 0.1
    }
}

function crearRuta(nombre, sgdbPrincipal, sgdbAlternativo) {
    return {
        nombre,
        sgdbPrincipal,
        sgdbAlternativo,
        modulos: [
            crearModulo("Fundamentos de Programación"),
            crearModulo("Programación Web"),
            crearModulo("Programación Formal"),
            crearModulo("Bases de Datos"),
            crearModulo("Backend")
        ]
    }
}

const rutas = [
    crearRuta("Ruta NodeJS", "MongoDB", "PostgreSQL"),
    crearRuta("Ruta Java", "MySQL", "PostgreSQL"),
    crearRuta("Ruta NetCore", "SQL Server", "MySQL")
];


function registrarNotaInicial(camper, notaTeorica, notaPractica) {
    const promedio = (notaTeorica + notaPractica) / 2;

    if (promedio >= 60) {
        camper.estado = "Aprobado";
    } else {
        camper.estado = "Inscrito";
    }
}

function evaluarModulo(camper, modulo, notaTeorica, notaPractica, notaQuizes) {
    const notaFinal =
        (notaTeorica * modulo.pesoTeorico) +
        (notaPractica * modulo.pesoPractico) +
        (notaQuizes * modulo.pesoQuizes);

    const aprobado = notaFinal >= 60;

    camper.modulos.push({
        nombre: modulo.nombre,
        notaFinal,
        aprobado
    });

    if (!aprobado) {
        camper.riesgo = true;
    }

    return notaFinal;
}



const areas = [
    { nombre: "Salon 1", capacidad: 33 },
    { nombre: "Salon 2", capacidad: 33 },
    { nombre: "Salon 3", capacidad: 33 }
];

const matriculas = [];

function matricularCamper(camper, ruta, trainer, fechaInicio, fechaFin, salon) {

    const campersEnSalon = matriculas.filter(m => m.salon === salon);

    if (campersEnSalon.length >= 33) {
        console.log("Capacidad máxima alcanzada en", salon);
        return;
    }

    if (camper.estado !== "Aprobado") {
        console.log("El camper no ha aprobado el examen inicial");
        return;
    }

    camper.estado = "Cursando";

    matriculas.push({
        camper,
        ruta,
        trainer,
        fechaInicio,
        fechaFin,
        salon
    });

    console.log("Camper matriculado correctamente");
}



function listarInscritos() {
    return campers.filter(c => c.estado === "Inscrito");
}

function listarAprobadosInicial() {
    return campers.filter(c => c.estado === "Aprobado");
}

function listarTrainers() {
    return trainers.map(t => t.nombres + " " + t.apellidos);
}

function listarCampersRiesgo() {
    return campers.filter(c => c.riesgo === true);
}

function listarPorRuta(nombreRuta) {
    return matriculas
        .filter(m => m.ruta.nombre === nombreRuta)
        .map(m => ({
            camper: m.camper.nombres,
            trainer: m.trainer.nombres
        }));
}


function reporteModulo(rutaNombre, moduloNombre) {
    let aprobados = 0;
    let reprobados = 0;

    matriculas
        .filter(m => m.ruta.nombre === rutaNombre)
        .forEach(m => {
            const modulo = m.camper.modulos.find(mod => mod.nombre === moduloNombre);
            if (modulo) {
                modulo.aprobado ? aprobados++ : reprobados++;
            }
        });

    return { aprobados, reprobados };
}

registrarNotaInicial(campers[0], 70, 80);
registrarNotaInicial(campers[1], 50, 40);
registrarNotaInicial(campers[2], 90, 90);


matricularCamper(
    campers[0],
    rutas[0],
    trainers[0],
    "2024-01-01",
    "2024-06-30",
    "Salon 1"
);

evaluarModulo(campers[0], rutas[0].modulos[0], 70, 80, 90);

console.log("Inscritos:", listarInscritos());
console.log("Aprobados Inicial:", listarAprobadosInicial());
console.log("En Riesgo:", listarCampersRiesgo());
console.log("Por Ruta:", listarPorRuta("Ruta NodeJS"));
console.log("Reporte Módulo:", reporteModulo("Ruta NodeJS", "Fundamentos de Programación"));
