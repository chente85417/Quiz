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

    fetch("http://localhost:8888/questionsCount").then(res => res.json()).then(data => {
        let questionsNumber = data;
        ++questionsNumber;
        let key = `question${questionsNumber}`;

        const question = {};

        question[key] = {
            "title": textoPregunta,
            "options" : options,
            "solution" : solution,
            "selected" : "undefined"
        };

        fetch("http://localhost:8888/newQuestion", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers' : '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
            }
        ).then(res => res.text()).then(data => {
            console.log(data);
        });
    });   
});