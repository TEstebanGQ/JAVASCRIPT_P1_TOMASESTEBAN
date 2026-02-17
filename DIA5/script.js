//Una promesa es un objeto que representa la eventual finalización o fracaso de una operación asíncrona.
//"Te prometo entregar algo"
// Si cumplo hago algo --> Resultado exitoso
// Si no cumplo  --> Resultado fallido(Error)

//Estados de una promesa:
//1. Pendiente: La promesa está en estado pendiente cuando se crea y aún no se ha resuelto ni rechazado.
//2. Fulfilled (Cumplida): La promesa se resuelve exitosamente y se cumple con un valor específico.
//3. Rejected (Rechazada): La promesa se rechaza debido a un error o una razón específica.

/*Ciclo de vida de una promesa:
1. Nace en pendiente --> Pasara una sola vez a cumplida o rechazada --> quedara en "asentada" (fulfilled o rejected), donde no cambira jamas
--> Evitar doble entrega.
*/

//1er ejercicio
// Plantillas generales

// Utilidades
const log = (...args) => console.log(...args);

const titulo = (n, nombre) => {
  log("\n" + "=".repeat(50));
  log(`EJERCICIO ${n}: ${nombre}`);
  log("=".repeat(50));
};

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// /**
//  * Plantilla para una promesa que se RESULEVE.
//  */
// const resolverEn  = (ms, valor) =>
//     new Promise((resolve) => setTimeout(() => resolve(valor), ms));

// /**
//  * Plantilla para una promesa que se RECHAZA.
//  */
// const rechazarEn = (ms, error) =>
//     new Promise((_, reject) => setTimeout(() => reject(error), ms));

// // ej: promesa que resuelve
// function runEjercicio1() {
//     titulo(1, "Promesa que se resuelve");
//     function saludarAsync(nombre) {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(`Hola, ${nombre}!`);
//             }, 1200);
//         });
//     }
//     log("Antes de llamar a saludarAsync");
//     saludarAsync("Pedro").then((msg) => log("✅ then", msg)).catch((err) => log("❌ catch", err.message)).finally(() => log("✅ finally: Promesa finalizada"));
//     log("Después de llamar a saludarAsync");
// }
// runEjercicio1();
/*
A. Ejercicio 1 — Promesa básica con delay
Objetivo: Crear una promesa que se resuelva después de cierto tiempo.

Instrucciones

Crea una función mensajeAsync(texto, tiempo)

Debe devolver una Promise

Después de tiempo milisegundos debe resolver con el texto recibido

Consumirla con .then()

Agregar un .finally()

Validación esperada

Antes de la llamada se imprime: "Iniciando..."

Después del tiempo: el mensaje

Finalmente: "Proceso finalizado"
*/
// function runEjercicio2() {
//     titulo(2, "Promesa con delay");
//     function mensajeAsync(texto, tiempo) {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(texto);
//             }, tiempo);
//         });
//     }
//     log("Iniciando...");
//     mensajeAsync("¡Mensaje recibido!", 2000)
//         .then((msg) => log("✅ then", msg))
//         .catch((err) => log("❌ catch", err.message))
//         .finally(() => log("✅ finally: Proceso finalizado"));
// }
// runEjercicio2();
/*
B. Ejercicio 2 — Rechazo condicional
Objetivo: Comprender resolve vs reject.

Instrucciones

Crea verificarNumeroAsync(numero)

Si el número es par → resolve "Número válido"

Si es impar → reject "Número inválido"

Maneja ambos casos

Validación

Probar con:

4 → debe entrar en .then()

5 → debe entrar en .catch()
*/
function runEjercicio3() {
    titulo(3, "Rechazo condicional");
    function verificarNumeroAsync(numero) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (numero % 2 === 0) {
                    resolve("Número válido");
                } else {
                    reject(new Error("Número inválido"));
                }
            }, 1500);
        });
    }
    verificarNumeroAsync(4)
        .then((msg) => log("✅ then", msg))
        .catch((err) => log("❌ catch", err.message));
    verificarNumeroAsync(5)
        .then((msg) => log("✅ then", msg))
        .catch((err) => log("❌ catch", err.message));
}
runEjercicio3();
