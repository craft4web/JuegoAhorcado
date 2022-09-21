//funcion no nativa
String.prototype.replaceAt=function(index, character) 
{ return this.substring(0, index) + character + this.substring(index+character.length); } 

//funcion para validar tipo de dato
function isLetter(str) {
	if ( str.match(/[a-z]/i)){ 
		    return true; 
			} 
			return false;
}

//obteniendo los elementos del Dom
const btnCheck = document.querySelector("#button");
const secret = document.querySelector("#secret");
const texFirst = document.querySelector("#textFirst");
const texFinish = document.querySelector("#textFinish");
const replay = document.querySelector("#replay");
const letra = document.querySelector("#letra");

//estableciendo el array con las palabras para el juego
const words =  ["carro" , "avion", "casa", "gato" ];

//de manera aleatoria elegimos la palabra 
const word =  words[Math.floor(Math.random()*words.length)];

//asignamos guiones a la palabra secreta 
let script = word.replace(/./g,"_ ")
secret.innerHTML = script;

//inicializando contador de errores por adivinar
let contador = 0;

btnCheck.addEventListener("click",() =>{

  let letraValue= letra.value;
  let fallo = true;

	if(isLetter(letraValue)){
		//buscando la igualdad en letra secreta y reemplazandola
		for(let x=0;x<word.length;x++){
			if(letraValue == word[x]){
				script = script.replaceAt(x*2, letraValue);
				fallo = false;
			}}
	
		//evaluando la bandera de acierto o fallo
		if(fallo){
			contador++;
			//cambiando de posicion la imagen por cada fallo
			document.querySelector("#img").style.backgroundPosition = -(310*contador)+"px 0";
	
			if(contador == 4){
				texFirst.style.display = "none"
				texFinish.innerHTML = "Has PERDIDO el juego"
				texFinish.style.color = "red";
				replay.style.display = "block";
				btnCheck.disabled = true;
			}
			//evaluando si no hay ningun guion en la palabra secreta
			}else if(script.indexOf("_")<0){
				texFirst.style.display = "none"
				texFinish.innerHTML = "Has GANADO el juego"
				texFinish.style.color = "green";
				replay.style.display = "block";
				btnCheck.disabled = true;
	
		}
		
		//cambios varios en el Dom en el evento click
		secret.innerHTML = script;
		letra.value = "";
		letra.focus();
	}else{
		alert("Ingrese solo letras porfavor...")
	}
	
	})
	replay.addEventListener("click", ()=>{
	location.reload();
	
})

