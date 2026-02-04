// export const addDays = (date, days) => {
//     const result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
// };

// export const predictCycle = ({
//     lastPeriodStart,
//     cycleLength,
//     periodLength,
// }) => {
//     if (!lastPeriodStart || !cycleLength || !periodLength) {
//         throw new Error("Missing required cycle data");
//     }

//     const nextPeriodStart = addDays(lastPeriodStart, cycleLength);

//     const nextPeriodEnd = addDays(
//         nextPeriodStart,
//         periodLength - 1
//     );

//     const ovulationDay = addDays(nextPeriodStart, -14);

//     const fertileWindow = {
//         from: addDays(ovulationDay, -5),
//         to: addDays(ovulationDay, 1),
//     };

//     return {
//         nextPeriodStart,
//         nextPeriodEnd,
//         ovulationDay,
//         fertileWindow,
//     };
// };

// // utils/cyclePrediction.js

// const addDays2 = (date, days) => {
//     const d = new Date(date)
//     d.setHours(0, 0, 0, 0)
//     d.setDate(d.getDate() + days)
//     return d
// }

// export const getNextPeriodStart = (lastPeriodStart, cycleLength = 28) => {
//     if (!lastPeriodStart) return null
//     return addDays2(lastPeriodStart, cycleLength)
// }

// export const getPredictedPeriodRange = (
//     nextPeriodStart,
//     periodLength = 5
// ) => {
//     if (!nextPeriodStart) return null

//     return {
//         from: nextPeriodStart,
//         to: addDays2(nextPeriodStart, periodLength - 1),
//     }
// }

// export const getOvulationDate = (nextPeriodStart) => {
//     if (!nextPeriodStart) return null
//     return addDays2(nextPeriodStart, -14)
// }

// export const getFertileWindow = (ovulationDate) => {
//     if (!ovulationDate) return null

//     return {
//         from: addDays2(ovulationDate, -5),
//         to: ovulationDate,
//     }
// }

// export const calculateCyclePrediction = ({
//     lastPeriodStart,
//     cycleLength = 28,
//     periodLength = 5,
// }) => {
//     if (!lastPeriodStart) return null

//     const nextPeriodStart = getNextPeriodStart(lastPeriodStart, cycleLength)
//     const predictedPeriod = getPredictedPeriodRange(
//         nextPeriodStart,
//         periodLength
//     )
//     const ovulationDate = getOvulationDate(nextPeriodStart)
//     const fertileWindow = getFertileWindow(ovulationDate)

//     return {
//         nextPeriodStart,
//         predictedPeriod,
//         ovulationDate,
//         fertileWindow,
//     }
// }


export const addDays = (date, days) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + days)
    return d
}

export const calculateCyclePrediction = ({
    lastPeriodStart,
    cycleLength = 28,
    periodLength = 5,
}) => {
    if (!lastPeriodStart) return null

    const nextPeriodStart = addDays(lastPeriodStart, cycleLength)
    const nextPeriodEnd = addDays(
        nextPeriodStart,
        periodLength - 1
    )

    const ovulationDate = addDays(nextPeriodStart, -14)

    const fertileWindow = {
        from: addDays(ovulationDate, -5),
        to: addDays(ovulationDate, 1),
    }

    return {
        nextPeriodStart,
        nextPeriodEnd,
        ovulationDate,
        fertileWindow,
    }
}

export const isPeriodLate = (
    predictedNextPeriod,
    today = new Date()
) => {
    if (!predictedNextPeriod) return false

    const grace = new Date(predictedNextPeriod)
    grace.setDate(grace.getDate() + 2)

    return today > grace
}

export const detectCycleIrregularity = (cycleLengths = []) => {
    if (cycleLengths.length < 3) {
        return {
            irregular: false,
            reason: "Not enough data",
        }
    }

    const min = Math.min(...cycleLengths)
    const max = Math.max(...cycleLengths)
    const avg =
        cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length

    if (max - min > 7) {
        return {
            irregular: true,
            reason: "High variation between cycles",
        }
    }

    if (avg < 21 || avg > 35) {
        return {
            irregular: true,
            reason: "Average cycle length out of range",
        }
    }

    return {
        irregular: false,
        reason: "Cycle appears regular",
    }
}

// const generateYearPredictions = ({
//     startDate,
//     cycleLength,
//     periodLength = 5,
//     months = 12,
// }) => {
//     const predictions = []
//     let cursor = new Date(startDate)

//     for (let i = 0; i < months; i++) {
//         const cycle = calculateCyclePrediction({
//             lastPeriodStart: cursor,
//             cycleLength,
//             periodLength,
//         })

//         predictions.push(cycle)
//         cursor = addDays(cursor, cycleLength)
//     }

//     return predictions
// }

