document.querySelector("#edit").addEventListener("submit", (evento) => {
    //Intercepción del evento submit del formulario para evitarlo
    evento.preventDefault();
    //Extracción de los datos insertados por el usuario para la nueva pregunta
    const textoPregunta = document.querySelector("#textoPregunta").value;

    const options = [];

    options.push(document.querySelector("#option1").value);
    options.push(document.querySelector("#option2").value);
    options.push(document.querySelector("#option3").value);
    options.push(document.querySelector("#option4").value);

    const solution = document.querySelector("input[name='option']:checked").value;

    //Se pide a firebase el número de preguntas actualmente existentes
    firebase.database().ref("questionsCount").once("value").then((snapshot) => {
        //Se crea un nuevo objeto json para la nueva pregunta
        let questionsNumber = snapshot.val();
        ++questionsNumber;
        let key = `question${questionsNumber}`;

        const question = {};

        question[key] = {
            "title": textoPregunta,
            "options" : options,
            "solution" : solution,
            "selected" : "undefined"
        }

        //Insertamos la nueva pregunta y actualizamos el contador
        firebase.database().ref("questions").update(question);
        firebase.database().ref("questionsCount").set(questionsNumber);
    });

    

    
});