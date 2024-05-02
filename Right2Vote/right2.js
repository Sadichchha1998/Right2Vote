class Instrument {
    constructor(weight, volume, baseValue) {
        this.weight = weight;
        this.volume = volume;
        this.baseValue = baseValue;
    }
}

function calculateTotalValue(instruments) {
    return instruments.reduce((totalValue, instrument) => totalValue + instrument.baseValue, 0);
}

function selectInstruments(instruments, payloadCapacity, volumeCapacity) {
    let maxTotalValue = 0;
    let selectedInstruments = [];
    
   
    for (let i = 0; i < Math.pow(2, instruments.length); i++) {
        let totalWeight = 0;
        let totalVolume = 0;
        let totalValue = 0;
        let currentSelection = [];
        
        for (let j = 0; j < instruments.length; j++) {
            if ((i & (1 << j)) !== 0) {
                currentSelection.push(instruments[j]);
                totalWeight += instruments[j].weight;
                totalVolume += instruments[j].volume;
                totalValue += instruments[j].baseValue;
            }
        }
        if (totalWeight <= payloadCapacity && totalVolume <= volumeCapacity && totalValue > maxTotalValue) {
            maxTotalValue = totalValue;
            selectedInstruments = currentSelection;
        }
    }
    
    return {
        selectedInstruments: selectedInstruments,
        totalWeight: selectedInstruments.reduce((total, instrument) => total + instrument.weight, 0),
        totalVolume: selectedInstruments.reduce((total, instrument) => total + instrument.volume, 0),
        totalValue: maxTotalValue
    };
}

const instruments = [
    new Instrument(3, 2, 10),
    new Instrument(4, 3, 15),
    new Instrument(2, 1, 8),
    new Instrument(5, 4, 20)
];
const payloadCapacity = 10;
const volumeCapacity = 7;
const result = selectInstrumentsBruteForce(instruments, payloadCapacity, volumeCapacity);
console.log("Selected Instruments:", result.selectedInstruments);
console.log("Total Weight:", result.totalWeight, "kg");
console.log("Total Volume:", result.totalVolume, "m^3");
console.log("Total Scientific Value:", result.totalValue);