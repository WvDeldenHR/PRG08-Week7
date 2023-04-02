const nn = ml5.neuralNetwork({ task: 'regression', debug: true });

nn.load('./models/model.json', modelLoaded);

function modelLoaded() {
    const resoloutionField = document.getElementById("resoloution");
    const ppiField = document.getElementById("ppi");
    const coresField = document.getElementById("cores");
    const cpuField = document.getElementById("cpu");
    const memoryField = document.getElementById("memory");
    const storageField = document.getElementById("storage");
    const batteryField = document.getElementById("battery");
   
    const predictButton = document.getElementById("predictionsButton");
    const result = document.getElementById("result");
   
    predictButton.addEventListener("click", makePrediction);
    async function makePrediction() {
        const resoloution = Number(resoloutionField.value);
        const ppi = Number(ppiField.value);
        const cores = Number(coresField.value);
        const cpu = Number(cpuField.value);
        const memory = Number(memoryField.value);
        const storage = Number(storageField.value);
        const battery = Number(batteryField.value);

        const results = await nn.predict({ resoloution, ppi, cores, cpu, memory, storage, battery });
        const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
        const estimatedPrice = fmt.format(results[0].price);
   
        result.innerText = `Predicted Price: ${estimatedPrice}`
    }
}