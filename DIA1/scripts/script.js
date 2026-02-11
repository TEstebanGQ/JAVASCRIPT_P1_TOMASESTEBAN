// Nuestro primer script
console.log("Hola Mundo");
// Datos primitivos
numero1 = 1; //tipo number --> "La mayoria de numeros"
numero2 = 2;
console.log(typeof numero1);
texto1 = "Textito"; //tipo string
texto2 = "Otro textito";
console.log(typeof texto1);
operacionesBasicas = ((((5*8)+5)-2));
console.log(operacionesBasicas);
unionDeTextos = texto1 + texto2; //Concatenacion de textos
console.log(unionDeTextos);
// Funciones con parametros y con retorno
function suma(a,b){
    return a + b;
}
resultadoSuma = suma(5,8);
console.log(resultadoSuma);
// Funciones con parametros y sin retorno
function saludoConNombre(nombre){
    console.log("Hola, soy " + nombre);
}
saludoConNombre("Tomas");
// Funciones sin parametros y sin retorno
function saludo(){
    console.log("Hola,soy Tomas y estoy saludando");
}
saludo();
// Funciones sin parametros y con retorno
function numeroRandom(){
    return Math.random();
}
console.log(numeroRandom());
// Funciones con parametros y con retorno
function sumar(a,b){
    return a+b;
}

console.log(sumar(5,7));

// Funciones con parametros y sin retorno
function sumarSR(a,b){
    console.log(a+b);
}

sumarSR(8,9);

// Funciones sin parametros y sin retorno
function funcionSPSR(){
    console.log("Esta es una función sin parametros y sin retorno");
}

funcionSPSR();

// Funciones sin parametros y con retorno
function funcionSPCR(){
    return ("Esta es una función sin parametros y con retorno");
}

console.log(funcionSPCR());
// Ingresar datos externos
nombrePersona = prompt("Ingrese su nombre");
console.log("Tu nombre es: " + nombrePersona);