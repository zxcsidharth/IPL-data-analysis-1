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
    let emptyObjArr = [];
    const a = id.reduce((acc, idObj) => {
         const b = jsonObj.reduce((acc, deliveriesObj) => {
            if(idObj === deliveriesObj.match_id) {
                emptyObjArr.push(deliveriesObj);
            }
         }, 0);
    }, 0);
    return emptyObjArr;
};
const findEcoBowler = function(ecoObject) {
    let emptyObject = {};
    ecoObject.forEach((currObj) => {
        if (!emptyObject[currObj.bowler]) {
            emptyObject[currObj.bowler] = {};
        }
    });
    return emptyObject;
}
const findRunsAndBalls = function(bowlerObj, jsonObj) {
    const res = jsonObj.reduce((acc, currObj) => {
        let totalRun = (parseInt(currObj.batsman_runs) + parseInt(currObj.wide_runs) + parseInt(currObj.noball_runs) + parseInt(currObj.penalty_runs));
        if(bowlerObj[currObj.bowler]['ball']) {
            bowlerObj[currObj.bowler]['ball'] += 1 - (currObj.noball_runs || currObj.wide_runs);
            bowlerObj[currObj.bowler]['total_runs'] += totalRun;
        } else {
            bowlerObj[currObj.bowler]['ball'] = 1;
            bowlerObj[currObj.bowler]['total_runs'] = totalRun;   
        }
    });
    let bowlerArr = Object.keys(bowlerObj);
    return findEconomy(bowlerArr, bowlerObj);
}
function findEconomy(bowlerArr, bowlerObj) {
    let economyBowlerArr = [];
    const res = bowlerArr.reduce((acc, elementObj) => {
        let economyBowlerObj = {};
        let over = (bowlerObj[elementObj]['ball'])/6;
        let ecoBowl = (bowlerObj[elementObj]['total_runs']) / over;
        ecoBowl = Number.parseFloat(""+ecoBowl).toFixed(2);
        economyBowlerObj[elementObj] = parseFloat(ecoBowl);
        economyBowlerArr.push(economyBowlerObj);
    }, 0);
    return economyBowlerArr;
}

function findEco(economyData) {
    economyData.sort((a,b) => Object.values(a) - Object.values(b));
    economyData.splice(10, (economyData.length - 10));
    return economyData;
}

module.exports = {
    numberOfMatches,
    matchesWonPerYear,
    findMatchesWon,
    findAllId,
    findAllTeam,
    findEcoBowler,
    findBowlerObject,
    findRunsAndBalls,
    findEco
};