const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
let cuadrados = []
let serpiente = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalodeTiempo = 1000
let velocidad = 0.9
let timerId = 0

function createGrid() {
    for (let i = 0; i < 100; i++) { // Tenemos que crear 100 elementos div utilizando un for loop
        const cuadradito = document.createElement("div") // Crear elementos y guardar en una constante
        cuadradito.classList.add("square") // Añadir clase css a nuestro elemento
        grid.appendChild(cuadradito) // Añadir este elemento nuevo dentro del elemneto con clase .grid
        cuadrados.push(cuadradito) // Empujar este elemnto en un Array que se llamara squares 
    }
}
createGrid()

serpiente.forEach(i => cuadrados[i].classList.add("snake")) // Utilizando entrada en la serpiente como indice para añadir clase css para nuestra serpiente representada en cuadrados

function starGame() {
    // Eliminar la serpiente del cuadrado grid
    serpiente.forEach(i => cuadrados[i].classList.remove("snake"))
    // Eliminar la manzana del grid
    cuadrados[appleIndex].classList.remove("apple")
    // Parar el tiempo(timerId)
    clearInterval(timerId)
    // Resetear la puntuacion en score
    score = 0
    // Poner la puntuacion en el DOM a 0
    scoreDisplay.textContent = score
    // Resetear serpiente
    serpiente = [2, 1, 0]
    // Resetear la direccion
    direction = 1
    // Generar una nueva la manzana con llamar la funcion se genererá 
    generateApple()
    // Resetear el intervalo de tiempo
    intervalodeTiempo = 1000
    // Poner la serpiente en el grid
    serpiente.forEach(i => cuadrados[i].classList.add("snake"))
    // Iniciar el temporizador (Se inicia el juego)
    timerId = setInterval(move, intervalodeTiempo)
}


function move() {
    // averiguar si la serpiente a chocado contra la botella y en caso positivo parara el juego
    if (
        (serpiente[0] % width === 0 && direction === -1) || // izquierda
        (serpiente[0] % width === width - 1 && direction === 1) ||// derecha
        (serpiente[0] - width < 0 && direction === -width) || // arriba
        (serpiente[0] + width >= width * width && direction === +width) || // abajo
        cuadrados[serpiente[0] + direction].classList.contains("snake")  // contra si misma
    ) {
        return clearInterval(timerId) // Parar el juego
    }

    const culodeSerpiente = serpiente.pop() // Eliminar el ultimo elemento
    cuadrados[culodeSerpiente].classList.remove('snake') // Eliminar el estilo del último elemento
    serpiente.unshift(serpiente[0] + direction) // Agregue cuadradito en la dirección a la que nos dirigimos

    if (cuadrados[serpiente[0]].classList.contains("apple")) {
        //Eliminar la clase apple
        cuadrados[serpiente[0]].classList.remove("apple")
        //Hacer crecer la serpiente
        cuadrados[culodeSerpiente].classList.add("snake")
        //Hacer crecer nuestro Array
        serpiente.push(culodeSerpiente)
        //Generar una nueva manzana
        generateApple()
        //Agregar uno a la puntuacion 
        score++
        //Mostrar nuestra puntuacion 
        scoreDisplay.textContent = score
        // Velocidad para la serpiente
        clearInterval(timerId)
        intervalodeTiempo = intervalodeTiempo * velocidad
        timerId = setInterval(move, intervalodeTiempo)
    }
    cuadrados[serpiente[0]].classList.add("snake") // Agregar estilo para poder verlos
}

// Generar manzana y colocar a nuestros cuadrados (grid)
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * cuadrados.length) // sacar numero aleatorio
    } while (cuadrados[appleIndex].classList.contains("snake")) // si contiene serpiente repetir
    cuadrados[appleIndex].classList.add("apple") // si no contiene añadir manzana 
}
generateApple()

function controldeDireccion(eventoTeclado) { // controla la direccion de la serpiente utilizando evento.keyCode que se va a utilizar uno nuevo
    if (eventoTeclado.key === "ArrowRight") {
        direction = 1
    } else if (eventoTeclado.key === "ArrowUp") {
        direction = -width
    } else if (eventoTeclado.key === "ArrowLeft") {
        direction = -1
    } else if (eventoTeclado.key === "ArrowDown") {
        direction = +width
    }
}
document.addEventListener("keyup", controldeDireccion)
startButton.addEventListener("click", starGame)