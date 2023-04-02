import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({task: 'regression', debug: true})

let testData = []

function loadData() {
    Papa.parse("./data/mobilephones.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: results => checkData(results.data)
    })
}
loadData()

function checkData(data) {
    console.table(data)

    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))    
    testData  = data.slice(Math.floor(data.length * 0.8) + 1)

    for(let mobilephones of trainData){
        nn.addData({ resoloution: mobilephones.resoloution, ppi: mobilephones.ppi, storage: mobilephones.storage, cores: mobilephones.cores, cpu: mobilephones.cpu, memory: mobilephones.memory, battery: mobilephones.battery }, { price: mobilephones.price })
    }
    nn.normalizeData()

    nn.train({ epochs: 10 }, () => finishedTraining())

    const chartdata = data.map(mobile => ({
        x: mobile.price,
        y: mobile.storage,
    }))

    // for (let mobile of data) {
    //     nn.addData({ price: mobile.price }, { storage: mobile.storage })
    // }

    createChart(chartdata)
}

async function finishedTraining() {
    // let predictions = []
    // for (let pr = 80; pr < 260; pr += 1) {
    //     const pred = await nn.predict({price: pr})
    //     predictions.push({x: pr, y: pred[0].storage})
    // }
    // updateChart("Predictions", predictions)

    console.log('Prediction Succesfull')
    makePrediction()
}

async function makePrediction() {
    const testMobilePhones = { resoloution: testData[0].resoloution, ppi: testData[0].ppi, storage:testData[0].storage, cores:testData[0].cores, cpu:testData[0].cpu, memory:testData[0].memory, battery:testData[0].battery }
    const pred = await nn.predict(testMobilePhones)
    console.log(pred[0].price)
    // const results = await nn.predict({ price: 90 })
    // console.log(`Geschat verbruik: ${results[0].storage}`)
}