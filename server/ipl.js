// all logics and function will reside here
const numberOfMatches = function(jsonObj) {
    let emptyObj = {};
    const result = jsonObj.reduce((accumulator, arrVal) => {
        if (emptyObj[arrVal.season]) {
            emptyObj[arrVal.season] = emptyObj[arrVal.season] + 1;
        } else {
            emptyObj[arrVal.season] = 1; 
        }
    }, 0); 
    const valArray = Object.values(emptyObj);
    const sum = valArray.reduce((acc, curr) => {
        return acc + curr;
    });
    return sum;
};

const matchesWonPerYear = function(jsonObj) {
    let emptyObj1 = {};
    const result = jsonObj.reduce((accumulator, arrVal) => {
        if (!emptyObj1[arrVal.season]) {
            emptyObj1[arrVal.season] = {}; 
        }
    }, 0);
    return emptyObj1;
}
const findMatchesWon = function(jsonObject, matchesWon) {
    jsonObject.forEach(element => {
        if(matchesWon[element.season][element.winner]) {
            matchesWon[element.season][element.winner] += 1;
        } else {
            matchesWon[element.season][element.winner] = 1;
        }
    });
    return matchesWon
}
const findAllId = function(jsonObject) {
    const idArray = [];
    const res = jsonObject.reduce((acc, element) => {
        if (element.season === '2016') {
            idArray.push(element.id);
        }
    }, 0);
    return idArray;
}
const findAllTeam = function(idArray, jsonObject) {
    let emptyObj2 = {};
    const a = idArray.reduce((acc, idObj) => {
        const b = jsonObject.reduce((acc, deliveriesObj) => {
            if(idObj === deliveriesObj.match_id) {
                emptyObj2 = compute(emptyObj2, deliveriesObj);
            }
        }, 0);
    }, 0);
    return emptyObj2;
}
const compute = function(emptyObj, deliveriesObj) {
    if(emptyObj[deliveriesObj.bowling_team]) {
        emptyObj[deliveriesObj.bowling_team] += parseInt(deliveriesObj.extra_runs);
    } else {
        emptyObj[deliveriesObj.bowling_team] = parseInt(deliveriesObj.extra_runs);
    }
    return emptyObj;
}

module.exports = {
    numberOfMatches,
    matchesWonPerYear,
    findMatchesWon,
    findAllId,
    findAllTeam
};