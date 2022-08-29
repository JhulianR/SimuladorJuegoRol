import Swal from 'sweetalert2';

function Personaje(nombre?: string, descripcion?: string, vida?: number, defensa?: number, ataque?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.vida = vida;
    this.defensa = defensa;
    this.ataque = ataque;
}

const tanque: Object = new Personaje("Titán de avance", "Gran vitalidad y capacidades físicas. La primera línea que todo ejército desea.", 500, 45, 30);
const soldado = new Personaje("Cyborg", "Tiene un ataque débil pero es tan rápido que mientras su adversario lo ataca, el ya ha atacado dos veces.", 200, 30, 30);
const guerrero = new Personaje("Asesino Élite", "Muy talentoso pero con un cuerpo frágil, dotado de un armamento élite que le permite resistir y asestar golpes mortales.", 150, 45, 45);
const vikingo = new Personaje("Devora Mentes", "Pierde el control al atacar logrando inflingir el máximo daño al cuerpo y mente del rival, pero quedando al descubierto ante cualquier ataque enemigo.", 300, 15, 65);
const monstruo: any = new Personaje("Guardián de la puerta", "Monstruo básico, ni muy fácil ni muy difícil", 500, 10, 66);



const url = "objetosextra.json";


soldado.ataque = 30*2;


let personajes = [tanque, soldado, guerrero, vikingo];

//Copié estos arrays por si en el futuro, tienen alguna funcionalidad
let ataquePersonajes = personajes.map((atq) => atq.ataque);
let defensaPersonajes = personajes.map((def) => def.defensa);
let vidaPersonajes = personajes.map((hp) => hp.vida);


//Desestructurando los arrays de arriba
let [a,b,c,d] = ataquePersonajes;

const tanqueSel = document.getElementById("tanqueSel")!,
      soldadoSel = document!.getElementById("soldadoSel")!,
      guerreroSel = document!.getElementById("guerreroSel"),
      vikingoSel = document!.getElementById("vikingoSel");



let nom1 = document.getElementById('nom1')! as HTMLParagraphElement,
    nom2 = document.getElementById("nom2")!,
    nom3 = document.getElementById("nom3"),
    nom4 = document.getElementById("nom4"),
    listaMejoras = document.getElementById("listaMejoras"),
    contPersonajes = document.querySelector(".contPersonajes"), 
    btnCargar = document.getElementById("btnCargar"),
    btnGuardar = document.getElementById("btnGuardar"),
    seleccionado,
    elementoCliqueado = false,
    anuncios = document.getElementById("anuncios")


function modoOscuro() {
var element = document.body;
    element.classList.toggle("modo-oscuro");
    }




function clickTanque(){
    
    attack(tanque);
    
     
}


soldadoSel?.addEventListener("click", clickSoldado)
function clickSoldado(){
    nom2.innerHTML = "<p>SELECCIONADO</p>";
    attack(soldado);  
}


guerreroSel?.addEventListener("click", clickGuerrero)
function clickGuerrero(){
    nom3.innerHTML = "<p>SELECCIONADO</p>";
    attack(guerrero);
}


vikingoSel?.addEventListener("click", clickVikingo)
function clickVikingo(){
    nom4.innerHTML = "<p>SELECCIONADO</p>";
    attack(vikingo);  
}



function attack(selected) {
   
    a = "Seleccionaste " + selected.nombre + ": " + selected?.descripcion;
    resultados(a)
    a = selected?.nombre + " VS " + monstruo?.nombre;
    resultados(a)
    let daño = selected.ataque - monstruo.defensa,
        dañoM = monstruo.ataque - selected.defensa,
        vidaResP1 = selected.vida - dañoM,
        vidaResMons = monstruo.vida - daño;
        seleccionado = selected;
                for (let i = vidaResMons, o = vidaResP1; i > 0 || o > 0; i -= daño, o -= dañoM){
                    if (daño<0){daño=0}
                    else if (dañoM<0){dañoM=0}
                    else if (i<=0){
                    
                    
                       a += "<br>" + "Has ganado, felicidades";
                       resultados(a)
                       
                    break;
                }
                else if (o<=0){
                    
                    
                        a = "Has muerto..." + "<br>" + "Pero puedes hacerte más fuerte! <br> Haz clic en alguna de las siguientes mejoras:";
                       
                      
                        
                        resultados(a)
                        crearBtnPacto();
                        crearBtnArm();
                        crearBtnReju();
                        
                        
                        
                        
                      
                    break;
                }

                else if (o==0 && i==0){
                    a = "HP";
                    resultados(a)
                    break;
                }

                a = "Atacas con " + daño + " puntos de daño, HP monstruo: " + i + "\n" + "Recibes " + dañoM + " puntos de daño, HP Jugador: " + o + ".";
                resultados(a)
                
            }
            btnGuardar?.addEventListener("click", clickGuardar)
            function clickGuardar(){
                const guardarSelected = JSON.stringify(selected);
                localStorage.setItem("Archivo Guardado", guardarSelected);
                Swal.fire(
                    "Progreso Guardado",
                    "Tu selección de personaje ha sido guardada",
                    "success"
                  )
            }
            btnCargar?.addEventListener("click", clickCargar)
            function clickCargar(){
                const cargarGuardarSelected = localStorage.getItem("Archivo Guardado");
                const cargarSelected = JSON.parse(cargarGuardarSelected);
            }
               
            
}

function crearBtnPacto() {
    let boton = document.createElement("button");
    let texto = document.createTextNode("Pacto");
    boton.classList.add("mejora");
    boton.onclick = function(){
        seleccionado.ataque *= 2;
        seleccionado.vida /= 2;
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
    boton1.onclick = function(){
        seleccionado.defensa *= 1.9;
        seleccionado.vida -= (seleccionado.vida / 4);
        seleccionado.ataque -= (seleccionado.ataque / 4);
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
    boton2.onclick = function(){
        seleccionado.defensa -= 5;
        seleccionado.vida += 200;
        seleccionado.ataque -= 5;
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



function resultados(res: (a:string) => void) {
    anuncios = document.getElementById("anuncios");
    anuncios.innerHTML += res + "<br>";
}

function reset(){
    anuncios.innerHTML = "";
    Swal.fire(
        "Mejora seleccionada",
        "Haz click de nuevo en el mismo personaje para jugar con la mejora aplicada",
        "success"
    )
}

function removerPorClase(clase){
    const elemento = document.getElementsByClassName(clase);
    while(elemento.length > 0){
        elemento[0].parentNode.removeChild(elemento[0]);
    }
}



















