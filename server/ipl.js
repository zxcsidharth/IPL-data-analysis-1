// all logics and function will reside here
const fs = require('fs')

//number of matches played per year by all team
const numberOfMatchesPerYear = function(matchesJson) {
    const matchesPerYearObj = matchesJson.reduce((matchesPerYear, matchesCurrObject) => {
        if (matchesPerYear[matchesCurrObject.season]) {
            matchesPerYear[matchesCurrObject.season] = matchesPerYear[matchesCurrObject.season] + 1;
        } else {
            matchesPerYear[matchesCurrObject.season] = 1; 
        }
        return matchesPerYear
    }, {}); 
    return matchesPerYearObj;
};

// this function will create an object with key as year and value as and empty object 
const matchesWonPerYear = function(matchesJson) {
    const matchesWon = matchesJson.reduce((emptyObj, matchesCurrObject) => {
        if (!emptyObj[matchesCurrObject.season]) {
            emptyObj[matchesCurrObject.season] = {}; 
        }
        return emptyObj;
    }, {});
    return matchesWon;
}

//  this function will return an object with total matches won by per team per year  
const findMatchesWon = function(matchesJson, matchesWonObj) {
    matchesJson.forEach(selectedObj => {
        if(matchesWonObj[selectedObj.season][selectedObj.winner]) {
            matchesWonObj[selectedObj.season][selectedObj.winner] += 1;
        } else {
            matchesWonObj[selectedObj.season][selectedObj.winner] = 1;
        }
    });
    return matchesWonObj
}

//it will create an object of all those whose id matches with a given year
const selectIdFromMatch = function(matchJson, year) {
    const matchIdArray = matchJson.filter((currentMatchObj) => {
        return currentMatchObj.season == year;
    });
    const matchIdObject = matchIdArray.reduce((emptyObj, selectedMatchObj) => {
        if(!emptyObj[selectedMatchObj.id]){
            emptyObj[selectedMatchObj.id] = selectedMatchObj.id;
        }
        return emptyObj;
    }, {});
    return matchIdObject;
}

// return extra runs given by every bowler in that team
const findExtraRuns = function(selectedIdObject, deleveriesJson) {
    const totalExtraRuns = deleveriesJson.reduce((emptyObj, currentDeliveryObj) => {
        if(selectedIdObject[currentDeliveryObj.match_id]) {
            return computeExtraRunPerTeam(emptyObj, currentDeliveryObj);
        }
        return emptyObj;
    }, {});
    return totalExtraRuns;
}
const computeExtraRunPerTeam = function(emptyObj, deliveriesObj) {
    if(emptyObj[deliveriesObj.bowling_team]) {
        emptyObj[deliveriesObj.bowling_team] += parseInt(deliveriesObj.extra_runs);
    } else {
        emptyObj[deliveriesObj.bowling_team] = parseInt(deliveriesObj.extra_runs);
    }
    return emptyObj;
}

// return an array of all those bowler in that given year
const findBowlerObject = function(selectedBowlerId, deleiveryJsonData) {
    const ecoBowlerArray = deleiveryJsonData.reduce((emptyArray, deliveriesObj) => {
        if(selectedBowlerId[deliveriesObj.match_id]) {
            emptyArray.push(deliveriesObj);
        }
        return emptyArray;
     }, []);
    return ecoBowlerArray;
};

// return an nested object of bowler's name with object as value
const findEcoBowler = function(ecoBowlerObjArray) {
    const ecoBowler = ecoBowlerObjArray.reduce((emptyBowlerObject, currentObj) => {
        if (!emptyBowlerObject[currentObj.bowler]) {
            emptyBowlerObject[currentObj.bowler] = {};
        }
        return emptyBowlerObject;
    }, {});
    return ecoBowler;
}

// returns an object mapped with bowler name and value as total runs and balls
const findRunsAndBalls = function(bowlerScoreObj, ecoBowlerObject) {
    const result = ecoBowlerObject.reduce((unUsedValue, currObj) => {
        let totalRun = (parseInt(currObj.batsman_runs) + parseInt(currObj.wide_runs) + parseInt(currObj.noball_runs) + parseInt(currObj.penalty_runs));
        if(bowlerScoreObj[currObj.bowler]['ball']) {
            if(!(currObj.noball_runs > 1 || currObj.wide_runs > 1))
                bowlerScoreObj[currObj.bowler]['ball'] += 1;
            bowlerScoreObj[currObj.bowler]['total_runs'] += totalRun;
        } else {
            bowlerScoreObj[currObj.bowler]['ball'] = 1;
            bowlerScoreObj[currObj.bowler]['total_runs'] = totalRun;   
        }
    });
    let bowlerArr = Object.keys(bowlerScoreObj);
    return findEconomy(bowlerArr, bowlerScoreObj);
}

// calculate all the economy bowlers list according to data extarxted from above
function findEconomy(bowlerArr, bowlerScoreObj) {
    const economyBowlerArr = bowlerArr.reduce((economyBowler, elementObj) => {
        let economyBowlerObj = {};
        let over = (bowlerScoreObj[elementObj]['ball'])/6;
        let ecoBowl = (bowlerScoreObj[elementObj]['total_runs']) / over;
        ecoBowl = Number.parseFloat(""+ecoBowl).toFixed(2);
        economyBowlerObj[elementObj] = parseFloat(ecoBowl);
        economyBowler.push(economyBowlerObj);
        return economyBowler;
    }, []);
    return economyBowlerArr;
}

// sort the economic bowler Object in order to get top ten economic bowler's
function findEco(economyData) {
    economyData.sort((a,b) => Object.values(a) - Object.values(b));
    economyData.splice(10, (economyData.length - 10));
    return economyData;
}

// write the given json data format to the respective json file, this same function will be 
// called for writing data all the four files
const writeToFile = function(filePath, jsonObject) {
    let data = JSON.stringify(jsonObject);
    fs.writeFile("../output/" + filePath, data, 'utf-8', function(err){
        if (err) {
            console.log("error");
        } else {
            console.log("success");
        }
    
    });
}

module.exports = {
    numberOfMatchesPerYear,
    matchesWonPerYear,
    findMatchesWon,
    selectIdFromMatch,
    findExtraRuns,
    findEcoBowler,
    findBowlerObject,
    findRunsAndBalls,
    findEco,
    writeToFile
};