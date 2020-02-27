// All function call will be here
const csv = require('csvtojson');
const funcObj = require('./ipl.js');
csv()
.fromFile("/home/sidharth/WorkSpace/JavaScript/IPL_1_project/src/data/deliveries.csv")
.then(function(jsonArrayObj){
    //console.log(jsonArrayObj);
    csv()
    .fromFile("/home/sidharth/WorkSpace/JavaScript/IPL_1_project/src/data/matches.csv")
    .then(function(jsonArrayObj1){ 
        //console.log(jsonArrayObj1);
        let matchesPlayed = funcObj.numberOfMatches(jsonArrayObj1);
        //console.log(matchesPlayed);
        let matchesWon = funcObj.matchesWonPerYear(jsonArrayObj1);
        let perYearWin = funcObj.findMatchesWon(jsonArrayObj1, matchesWon);
        //console.log(perYearWin);
        let idArray = funcObj.findAllId(jsonArrayObj1, '2016');
        let totalteam = funcObj.findAllTeam(idArray, jsonArrayObj);
        //console.log(totalteam);
        let bowlerId = funcObj.findAllId(jsonArrayObj1, '2015');
        //console.log(bowlerId);
        let ecoBowlerObjectArr = funcObj.findBowlerObject(bowlerId, jsonArrayObj);
        let ecoscore = funcObj.findEcoBowler(ecoBowlerObjectArr);
        let runsAndBalls = funcObj.findRunsAndBalls(ecoscore, ecoBowlerObjectArr);
        //console.log(runsAndBalls);
        let topTenBowler = funcObj.findEco(runsAndBalls);
        console.log(topTenBowler);
    });
});


