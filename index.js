function Personaje(nombre, descripcion, vida, defensa, ataque) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.vida = vida;
    this.defensa = defensa;
    this.ataque = ataque;
}

const tanque = new Personaje("Titán de avance", "Gran vitalidad y capacidades físicas. La primera línea que todo ejército desea.", 500, 45, 30);
const soldado = new Personaje("Cyborg", "Tiene un ataque débil pero es tan rápido que mientras su adversario lo ataca, el ya ha atacado dos veces.", 200, 30, 30);
const guerrero = new Personaje("Asesino Élite", "Muy talentoso pero con un cuerpo frágil, dotado de un armamento élite que le permite resistir y asestar golpes mortales.", 150, 45, 45);
const vikingo = new Personaje("Devora Mentes", "Pierde el control al atacar logrando inflingir el máximo daño al cuerpo y mente del rival, pero quedando al descubierto ante cualquier ataque enemigo.", 300, 15, 65);
const monstruo = new Personaje("Guardián de la puerta", "Monstruo básico, ni muy fácil ni muy difícil", 500, 10, 66);

const url = "objetosextra.json";


soldado.ataque = 30*2;


let personajes = [tanque, soldado, guerrero, vikingo];

//Copié estos arrays por si en el futuro, tienen alguna funcionalidad
let ataquePersonajes = personajes.map((atq) => atq.ataque);
let defensaPersonajes = personajes.map((def) => def.defensa);
let vidaPersonajes = personajes.map((hp) => hp.vida);


//Desestructurando los arrays de arriba
let [a,b,c,d] = ataquePersonajes;


console.log("El mayor ataque es " + (a, d));



const tanqueSel = document.getElementById("tanqueSel"),
      soldadoSel = document.getElementById("soldadoSel"),
      guerreroSel = document.getElementById("guerreroSel"),
      vikingoSel = document.getElementById("vikingoSel");



let nom1 = document.getElementById("nom1"),
    nom2 = document.getElementById("nom2"),
    nom3 = document.getElementById("nom3"),
    nom4 = document.getElementById("nom4"),
    listaMejoras = document.getElementById("listaMejoras"),
    contPersonajes = document.querySelector(".contPersonajes"), 
    btnCargar = document.getElementById("btnCargar"),
    btnGuardar = document.getElementById("btnGuardar"),
    seleccion,
    elementoCliqueado = false,
    anuncios = document.getElementById("anuncios");

function modoOscuro() {
var element = document.body;
    element.classList.toggle("modo-oscuro");
    }

function limpiarElementos() {
    let solSpan = document.getElementById("solSpan"),
        tanSpan = document.getElementById("tanSpan"),
        guerSpan = document.getElementById("guerSpan"),
        vikSpan = document.getElementById("vikSpan");

        solSpan.innerHTML = "";
        tanSpan.innerHTML = "";
        guerSpan.innerHTML = "";
        vikSpan.innerHTML = "";
        anuncios.innerHTML = "";
        removerPorClase("mejora");
}

function seleccionarPersonaje(personaje) {
    limpiarElementos();
    
    localStorage.clear();
    switch (personaje) {
        case 1:
            document.getElementById("solSpan").innerHTML = "Seleccionado";
            localStorage.clear();
            localStorage.setItem("personaje", JSON.stringify({nombre: "Cyborg", vida: 200, defensa: 30, ataque: 30*2}));
            break;
    
        case 2:
            document.getElementById("tanSpan").innerHTML = "Seleccionado";
            localStorage.clear();
            localStorage.setItem("personaje", JSON.stringify({nombre: "Titán de avance", vida: 500, defensa: 45, ataque: 30}));
            break;

        case 3:
            document.getElementById("guerSpan").innerHTML = "Seleccionado";
            localStorage.clear();
            localStorage.setItem("personaje", JSON.stringify({nombre: "Asesino Élite" ,vida: 150, defensa: 45, ataque: 45}));
            break;

        case 4:
            document.getElementById("vikSpan").innerHTML = "Seleccionado";
            localStorage.clear();
            localStorage.setItem("personaje", JSON.stringify({nombre: "Devora Mentes" ,vida: 300, defensa: 15, ataque: 65}));
            break;

    }

    btnGuardar.addEventListener("click", clickGuardar)
            function clickGuardar(){
                const guardarSelected = JSON.stringify(selected);
                localStorage.setItem("Archivo Guardado", guardarSelected);
                Swal.fire(
                    "Progreso Guardado",
                    "Tu selección de personaje ha sido guardada",
                    "success"
                  )
            }
            btnCargar.addEventListener("click", clickCargar)
            function clickCargar(){
                const cargarGuardarSelected = localStorage.getItem("Archivo Guardado");
                const cargarSelected = JSON.parse(cargarGuardarSelected);
            }
}


function attack() {
    let selected = JSON.parse(localStorage.getItem("personaje"));
    console.log(selected);
    scroll(100, 2800);
    res = "Seleccionaste " + selected?.nombre;
    resultados(res)
    res = selected?.nombre + " VS " + monstruo?.nombre;
    resultados(res)
    let daño = selected.ataque - monstruo.defensa,
        dañoM = monstruo.ataque - selected.defensa;
    console.log(daño);
    console.log(dañoM);
    
    let monstruoVida = monstruo.vida;
    let personajeVida = selected.vida;

        
    do {monstruoVida -= daño;
        personajeVida -= dañoM;

        if (daño<0){daño=0}
        else if (dañoM<0){dañoM=0}
        res = "Atacas con " + daño + " puntos de daño, HP monstruo: " + (monstruoVida > 0 ? monstruoVida : 0) + "\n" + "Recibes " + dañoM + " puntos de daño, HP Jugador: " + (personajeVida > 0 ? personajeVida : 0) + ".";
        resultados(res);


    } while(monstruoVida > 0 && personajeVida > 0);

            // for (; monstruoVida > 0 && personajeVida > 0; monstruoVida -= daño, personajeVida -= dañoM){
            //     if (daño<0){daño=0}
            //     else if (dañoM<0){dañoM=0}

            //     res = "Atacas con " + daño + " puntos de daño, HP monstruo: " + (monstruoVida > 0 ? monstruoVida : 0) + "\n" + "Recibes " + dañoM + " puntos de daño, HP Jugador: " + (personajeVida > 0 ? personajeVida : 0) + ".";
            //     resultados(res)
                
            // }

            if (monstruoVida <= 0){
                    
                res += "<br>" + "Has ganado, felicidades";
                resultados(res)              
            }
            
            else {
                
                
                    res = "Has muerto..." + "<br>" + "Pero puedes hacerte más fuerte! <br> Haz clic en alguna de las siguientes mejoras:";
                   
                    resultados(res)
                    crearBtnPacto();
                    crearBtnArm();
                    crearBtnReju();               
            }
            
        }

function crearBtnPacto() {
    let boton = document.createElement("button");
    let texto = document.createTextNode("Pacto");
    boton.classList.add("mejora");
    let selected = JSON.parse(localStorage.getItem("personaje"));
    boton.onclick = function(){
        selected.ataque *= 2;
        selected.vida /= 2;
        localStorage.setItem("personaje", JSON.stringify({nombre: selected.nombre, vida: selected.vida, defensa: selected.defensa, ataque: selected.ataque}));
        reset();
        removerPorClase("mejora");
      };
    boton.appendChild(texto);
    document.body.appendChild(boton);
    
}


function crearBtnArm() {
    let boton1 = document.createElement("button");
    let texto = document.createTextNode("Armadura Pesada");
    boton1.classList.add("mejora");
    let selected = JSON.parse(localStorage.getItem("personaje"));
    boton1.onclick = function(){
        selected.defensa *= 1.9;
        selected.vida -= (selected.vida / 4);
        selected.ataque -= (selected.ataque / 4);
        localStorage.setItem("personaje", JSON.stringify({nombre: selected.nombre, vida: selected.vida, defensa: selected.defensa, ataque: selected.ataque}));
        reset();
        removerPorClase("mejora");
      };
    boton1.appendChild(texto);
    document.body.appendChild(boton1);
}

function crearBtnReju() {
    let boton2 = document.createElement("button");
    let texto = document.createTextNode("Rejuvenecedor Celular");
    boton2.classList.add("mejora");
    let selected = JSON.parse(localStorage.getItem("personaje"));
    boton2.onclick = function(){
        selected.vida += 200;
        selected.ataque -= 5;
        localStorage.setItem("personaje", JSON.stringify({nombre: selected.nombre, vida: selected.vida, defensa: selected.defensa, ataque: selected.ataque}));
        reset();
        removerPorClase("mejora");
      };
    boton2.appendChild(texto);
    document.body.appendChild(boton2);
}

fetch(url)
    .then((Response) => Response.json())
    .then((datos) => {
        console.log(datos);
        datos.forEach((mejora) => {
            
        
        const li = document.createElement("li");
        const { nombre, descripcion} = mejora;
        li.innerHTML = `<h3>${nombre}</h3> 
        <hr> 
        <p>${descripcion}</p>`;
        li.className = "mejoras"
        listaMejoras.append(li);

        const btnMejora = document.createElement("button");
        
       });
    });


function resultados(res) {
    anuncios.innerHTML += res + "<br>";
}

function reset(){
    anuncios.innerHTML = "";
    Swal.fire(
        "Mejora seleccionada",
        "Haz click en atacar",
        "success"
    )
}

function removerPorClase(clase){
    const elemento = document.getElementsByClassName(clase);
    while(elemento.length > 0){
        elemento[0].parentNode.removeChild(elemento[0]);
    }
}









