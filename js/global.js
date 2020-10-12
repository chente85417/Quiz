"use strict"
/* 
Función que se encarga de crear un nodo del DOM y devolver su referencia.
Los parámetros son:
    * tipoElemento (string): cadena del tipo de nodo a crear ("p", "div", etc.)
    * atributos (array bidimensional): array que define los atributos del nodo a crear.
      El array tiene tantos arrays dentro como atributos a insertar. Cada array consta de dos
      cadenas, la primera con el nombre del argumento y la segunda con el valor. Por ejemplo,
      si se desea añadir class="miclase" id="miID", se ha de escribir [["class", "miclase"],["id", "miID"]]
    * texto (string): cadena del texto del nodo. Útil si se trata de un nodo <p> por ejemplo

Esta factoría evita tener que realizar todas estas acciones repetidamente por todo el código cada vez
que haya que crear elementos del DOM. La función no inserta en el DOM, sólo crea el nodo con sus atributos
y texto y devuelve una referencia al mismo.
*/
function Factoria(tipoElemento, atributos, texto)
{
    //CREACIÓN DEL NODO DEL ELEMENTO
    let nodoElemento = document.createElement(tipoElemento);
    //CREACIÓN DE LOS ATRIBUTOS
    atributos.forEach(function(dataAtributo)
                        {
                            let nodoAtributo = document.createAttribute(dataAtributo[0]);
                            nodoAtributo.value = dataAtributo[1];
                            nodoElemento.setAttributeNode(nodoAtributo);
                        });
    //CREACIÓN DEL TEXTO DEL ELEMENTO
    let nodoTextoElemento = document.createTextNode(texto);
    nodoElemento.appendChild(nodoTextoElemento);
    //Se entrega el elemento creado
    return nodoElemento;
}//Factoria

/*
Definición del objeto JSON que describe la estructura del cuestionario.
Consta de un array de objetos, uno por cada pregunta y el resultado final de la evaluación.
Cada pregunta es igualmente un JSON con el texto del enunciado, un array con la colección de las
posibles opciones y el índice correspondiente a la respuesta correcta y a la opción seleccionada
por el usuario.
Este literal se utiliza en la inicialización para crear el objeto de la clase Quiz con el contenido
completo del cuestionario.
*/
//Definición del objeto quiz conteniendo las preguntas
let quiz = {
    title : "QUIZ, AHÍ VAN UNAS PREGUNTILLAS...",
    questions : [
        {
            title : "¿Cuántos Tour de Francia ha ganado Induráin?",
            options : [
                "No ha ganado ninguno",
                "Ha ganado 4",
                "Ha ganado 5",
                "Ha ganado 6"
            ],
            solution : 2,
            selected : undefined
        },
        {
            title : "¿Cuál es el puerto más alto transitado en un Tour, Giro o Vuelta?",
            options : [
                "El Tourmalet",
                "El passo dello Stelvio",
                "El col de la Bonaigua",
                "El col de la Bonnette"
            ],
            solution : 3,
            selected : undefined
        },
        {
            title : "¿Quién fué el primer español que ganó un Tour de Francia?",
            options : [
                "Perico Delgado",
                "Luis Ocaña",
                "Bahamontes",
                "Alberto Contador"
            ],
            solution : 2,
            selected : undefined
        },
        {
            title : "¿Cómo se llama el sintético de Alien?",
            options : [
                "Bishop",
                "Manolo",
                "Leonard",
                "Mc Quay"
            ],
            solution : 0,
            selected : undefined
        },
        {
            title : "¿Cuál es el único felino que no tiene uñas retráctiles?",
            options : [
                "Doraimon",
                "La pantera de Granada",
                "El guepardo",
                "El león del Atlas"
            ],
            solution : 2,
            selected : undefined
        }
    ],
    qualification : undefined
};

/*
GESTIÓN DE LA PALETA DE COLORES DEL CUESTIONARIO
Se define una clase para la paleta de colores proporcionada desde un array.
Cada color de la paleta es un objeto de la clase Color que tiene el nombre del color
y su código hexadecimal.
Incorpora funciones para cargar los colores comprobando si ya existen y si el código
hexadecimal es correcto contrastándolo contra una expresión regular.
Finalmente la paleta es creada y queda disponible para su uso.
*/
//Definición de la paleta de colores
class Color{
    constructor(name, codeHex){
        this.name       = name;
        this.codeHex    = codeHex;
    };
};

class ColorPalette{
    constructor(){
        this.palette = [];
    };
    //Methods
    //Función para comprobar si un nombre de color se encuentra ya en la paleta
    checkColorName(name){
        for (let cont = 0; cont < this.palette.length; cont++)
        {
            if (this.palette[cont].name === name)
            {
                return true;
            }//if
        }//for
        return false;
    }//checkColorName
    //Función para comprobar si el código hexadecimal de un color ya se encuentra en la paleta
    checkColorHexCode(code){
        let expression = /#[0123456789abcdefABCDEF]{8}$/;
        if  (!expression.test(code.toUpperCase()))
        {
            alert("El código de color: " + code + " no es correcto");
            return true;
        }//if
        for (let cont = 0; cont < this.palette.length; cont++)
        {
            if (this.palette[cont] === code.toUpperCase())
            {
                alert("Ya existe un color en la paleta con el código: " + color.codeHex);
                return true;
            }//if
        }//for
        return false;       
    }//checkColorHexCode
    //Función para comprobar si un color se encuentra en la paleta
    checkColor(color){
        if (this.checkColorName(color.name))
        {
            alert("Ya existe un color en la paleta con el nombre: " + color.name);
            return false;
        }//if
        if (this.checkColorHexCode(color.codeHex))
        {
            return false;
        }//if
        return true;
    }//checkColor
    addColor(newColor){
        //Comprobamos si el color se encuentra en la paleta
        if (this.checkColor(newColor))
        {
            //Se adjunta el color a la paleta
            this.palette.push(newColor);
        }//if
    }//addColor
    //Función para cargar los colores desde un JSON
    loadColorPalette(JColors)
    {
        //Se inyectan los colores en la paleta
        JColors.forEach((color) => {
            this.addColor(new Color(color.name, color.code));
        });
    }//loadColorPalette
    //Función para proporcionar un color de la paleta por su nombre
    getColorByName(name)
    {
        let ret = "";
        this.palette.map((color) => {
                                        if (color.name === name)
                                        {
                                            ret  = color.codeHex;
                                        }//if
                                    });
        return ret;
    }//getColorByName
};

let colorPalette = [
    {name : "Magenta Crayola", code : "#f15bb5ff"},
    {name : "Minion Yellow", code : "#fee440ff"},
    {name : "Capri", code : "#00bbf9ff"},
    {name : "Sea Green Crayola", code : "#00f5d4ff"},
    {name : "Amethyst", code : "#9b5de5ff"},
];

let quizPalette = new ColorPalette();
quizPalette.loadColorPalette(colorPalette);

