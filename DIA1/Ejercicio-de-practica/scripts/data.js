// Estructura de datos inicial
const DATOS_INICIALES = {
    campers: [],
    trainers: [],
    rutas: [
        {
            id: "R001",
            nombre: "NodeJS",
            modulos: [
                {
                    nombre: "Fundamentos de Programación",
                    tecnologias: ["Algoritmia", "PSeInt", "Python"]
                },
                {
                    nombre: "Programación Web",
                    tecnologias: ["HTML", "CSS", "Bootstrap"]
                },
                {
                    nombre: "Programación Formal",
                    tecnologias: ["JavaScript"]
                },
                {
                    nombre: "Bases de Datos",
                    principal: "MongoDB",
                    alternativo: "MySQL",
                    tecnologias: ["MongoDB", "MySQL"]
                },
                {
                    nombre: "Backend",
                    tecnologias: ["NodeJS", "Express"]
                }
            ],
            duracionMeses: 6
        },
        {
            id: "R002",
            nombre: "Java",
            modulos: [
                {
                    nombre: "Fundamentos de Programación",
                    tecnologias: ["Algoritmia", "PSeInt", "Python"]
                },
                {
                    nombre: "Programación Web",
                    tecnologias: ["HTML", "CSS", "Bootstrap"]
                },
                {
                    nombre: "Programación Formal",
                    tecnologias: ["Java"]
                },
                {
                    nombre: "Bases de Datos",
                    principal: "MySQL",
                    alternativo: "PostgreSQL",
                    tecnologias: ["MySQL", "PostgreSQL"]
                },
                {
                    nombre: "Backend",
                    tecnologias: ["Spring Boot"]
                }
            ],
            duracionMeses: 6
        },
        {
            id: "R003",
            nombre: "NetCore",
            modulos: [
                {
                    nombre: "Fundamentos de Programación",
                    tecnologias: ["Algoritmia", "PSeInt", "Python"]
                },
                {
                    nombre: "Programación Web",
                    tecnologias: ["HTML", "CSS", "Bootstrap"]
                },
                {
                    nombre: "Programación Formal",
                    tecnologias: ["C#"]
                },
                {
                    nombre: "Bases de Datos",
                    principal: "PostgreSQL",
                    alternativo: "MySQL",
                    tecnologias: ["PostgreSQL", "MySQL"]
                },
                {
                    nombre: "Backend",
                    tecnologias: ["NetCore", "ASP.NET"]
                }
            ],
            duracionMeses: 6
        }
    ],
    matriculas: [],
    salones: [
        { id: "S001", nombre: "Salón Apollo", capacidad: 33, ocupacion: 0 },
        { id: "S002", nombre: "Salón Artemis", capacidad: 33, ocupacion: 0 },
        { id: "S003", nombre: "Salón Sputnik", capacidad: 33, ocupacion: 0 }
    ]
};

// Estados posibles de un camper
const ESTADOS_CAMPER = {
    PROCESO_INGRESO: "En proceso de ingreso",
    INSCRITO: "Inscrito",
    APROBADO: "Aprobado",
    CURSANDO: "Cursando",
    GRADUADO: "Graduado",
    EXPULSADO: "Expulsado",
    RETIRADO: "Retirado"
};

// Roles del sistema
const ROLES = {
    COORDINADOR: "Coordinador",
    TRAINER: "Trainer",
    CAMPER: "Camper"
};

// Configuración de evaluaciones
const CONFIG_EVALUACION = {
    NOTA_APROBATORIA: 60,
    PESO_TEORICA: 0.30,
    PESO_PRACTICA: 0.60,
    PESO_TRABAJOS: 0.10
};