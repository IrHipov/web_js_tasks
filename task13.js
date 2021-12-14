class ElectroProvider {
    electricityPerDay;
    electricityPerNight;

    constructor(electricityPerDay, electricityPerNight) {
        this.electricityPerDay = electricityPerDay;
        this.electricityPerNight = electricityPerNight;
    }
}

class PowerLine {
    capacity;
    pricePerWatt;

    constructor(capacity, pricePerWatt) {
        this.capacity = capacity;
        this.pricePerWatt = pricePerWatt;
    }
}

class Apartment {
    intakePerDay;
    intakePerNight;

    constructor(intakePerDay, intakePerNight) {
        this.intakePerDay = intakePerDay;
        this.intakePerNight = intakePerNight;
    }
}

class SolarPanel extends ElectroProvider {
    constructor(electricityPerDay, electricityPerNight) {
        super(electricityPerDay, electricityPerNight);
    }
}

class PowerPlant extends ElectroProvider {
    constructor(electricityPerDay, electricityPerNight) {
        super(electricityPerDay, electricityPerNight);
    }
}

class Building {
    apartments;

    constructor(apartments) {
        this.apartments = apartments;
    }

    getIntakeElectricityPerDay() {
        return this.apartments.reduce((acc, next) => acc.intakePerDay + next.intakePerDay);
    }

    getIntakeElectricityPerNight() {
        return this.apartments.reduce((acc, next) => acc.intakePerNight + next.intakePerNight);
    }
}

class ElectricSystem {
    powerPlants;
    solarPanels;
    buildings;
    powerLines;

    constructor(powerPlants, solarPanels, buildings, powerLines) {
        this.powerPlants = powerPlants;
        this.solarPanels = solarPanels;
        this.buildings = buildings;
        this.powerLines = powerLines;
    }

    getStatistic() {
        const intakeElectricityPerDay = this.buildings.reduce((acc, next) =>
            acc.getIntakeElectricityPerDay() + next.getIntakeElectricityPerDay());
        const intakeElectricityPerNight = this.buildings.reduce((acc, next) =>
            acc.getIntakeElectricityPerNight() + next.getIntakeElectricityPerNight());
        ;

        const {
            perDay: electricityPerDay,
            perNight: electricityPerNight
        } = this.countElectricity(this.solarPanels, this.powerPlants);

        console.log('\n\tDAY\n');
        this.getStatisticPer(intakeElectricityPerDay, electricityPerDay);

        console.log('\n\tNIGHT\n');
        this.getStatisticPer(intakeElectricityPerNight, electricityPerNight);
    }

    getStatisticPer = function(consumedElectricity, producedElectricity) {
        if (consumedElectricity < producedElectricity) {
            const extraEnergy = producedElectricity - consumedElectricity;

            const {
                sum: income,
                generalAmount: soldEnergyAmount,
                lostEnergyAmount: lostEnergyAmount
            } = this.sum((a, b) => b.pricePerWatt - a.pricePerWatt, extraEnergy);

            console.log(`External energy: ${extraEnergy}`);
            console.log(`Income: ${income}`);
            console.log(`Amount energy: ${soldEnergyAmount}`);
            console.log(`Lost energy: ${lostEnergyAmount}`);
        } else if (consumedElectricity === producedElectricity) {
            console.log(`Oy! We have energy balance!`);
        } else {
            const energyNeededToBuy = consumedElectricity - producedElectricity;

            const {
                sum: cost,
                generalAmount: energyAmountStillNeedToBuy,
                leftEnergyAmount: lostEnergyAmount
            } = this.sum((a, b) => a.pricePerWatt - b.pricePerWatt, energyNeededToBuy);

            console.log(`Недостатня кількість енергії --> ${energyNeededToBuy}`);
            console.log(`Витрати на докуплену енергію --> ${cost}`);
            console.log(`Кількість докупленої енергії --> ${energyAmountStillNeedToBuy}`);
            console.log(`Кількість енергії, яку немає де докупити --> ${lostEnergyAmount}`);
        }
    }

    sum = function(sortFunc, energyAmount) {
        let sum = 0;
        let generalAmount = 0;
        let powerLineIndex = 0;
        const sortedPowerLines = this.powerLines.sort(sortFunc, energyAmount);

        while (energyAmount > 0 && sortedPowerLines.length > powerLineIndex) {
            const capacity = sortedPowerLines[powerLineIndex].capacity;
            const pricePerWatt = sortedPowerLines[powerLineIndex].pricePerWatt;

            if (energyAmount >= capacity) {
                generalAmount += capacity;
                energyAmount -= capacity;
                sum += capacity * pricePerWatt;
                powerLineIndex++;
            } else {
                generalAmount += energyAmount;
                sum += energyAmount * pricePerWatt;
                energyAmount = 0;
                return {sum, generalAmount, leftEnergyAmount: energyAmount};
            }
        }

        return {sum, generalAmount, leftEnergyAmount: energyAmount};
    }

    countElectricity = function(...electroProviderList) {
        let sum = {perDay: 0, perNight: 0};

        electroProviderList.forEach(electroProvider => {
            electroProvider.forEach(e => {
                sum.perDay += e.electricityPerDay;
                sum.perNight += e.electricityPerNight;
            });
        });

        return sum;
    }
}
