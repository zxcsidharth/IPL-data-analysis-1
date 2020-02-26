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
    return emptyObj;
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
const findAllId = function(jsonObject, val) {
    const idArray = [];
    const res = jsonObject.reduce((acc, element) => {
        if (element.season == val) {
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
const findBowlerObject = function(id, jsonObj) {
    let emptyObj3 = {};
    const a = id.reduce((acc, idObj) => {
         const b = jsonObj.reduce((acc, deliveriesObj) => {
            if(idObj === deliveriesObj.match_id) {
                if (!emptyObj3[deliveriesObj.bowler]) {
                    emptyObj3[deliveriesObj.bowler] = {};
                }
            }
         }, 0);
    }, 0);
    return emptyObj3;
};
const findEcoBowler = function(ecoObject, jsonObj) {
    const a = jsonObj.reduce((acc, currObj) => {
        if(ecoObject[currObj.bowler][currObj.ball]) {
            ecoObject[currObj.bowler][currObj.ball] += currObj.ball;
            ecoObject[currObj.bowler][currObj.total_runs] += currObj.total_runs;
        } else {
            ecoObject[currObj.bowler][currObj.ball] = currObj.ball;
            ecoObject[currObj.bowler][currObj.total_runs] += currObj.total_runs;   
        }
    }, 0);
    return ecoObject;
}

module.exports = {
    numberOfMatches,
    matchesWonPerYear,
    findMatchesWon,
    findAllId,
    findAllTeam,
    findEcoBowler,
    findBowlerObject
};