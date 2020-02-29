// All function call will be here
const csv = require('csvtojson');
const IPLfunc = require('./ipl.js');
csv()
.fromFile("../data/deliveries.csv")
.then(function(deliveriesJsonData){
    //console.log(deliveries);
    csv()
    .fromFile("../data/matches.csv")
    .then(function(matchesJsonData){ 
        //console.log(matches);
        let matchesPlayed = IPLfunc.numberOfMatchesPerYear(matchesJsonData);
        // funcObj.writeToFile('matchesPlayedPeryear.json', matchesPlayed);
        // console.log(matchesPlayed);
        let matchesWon = IPLfunc.matchesWonPerYear(matchesJsonData);
        let perYearWin = IPLfunc.findMatchesWon(matchesJsonData, matchesWon);
        //console.log(perYearWin);
        // funcObj.writeToFile('matchesPerYear.json', perYearWin);
        let SelectedIdObject = IPLfunc.selectIdFromMatch(matchesJsonData, '2016');
        // console.log(SelectedIdObject);
        let extraRunsPerTeam = IPLfunc.findExtraRuns(SelectedIdObject, deliveriesJsonData);
        // console.log(extraRunsPerTeam);
        // funcObj.writeToFile('extraRunsperTeam.json', extraRunsPerTeam);
        let bowlerIdObject = IPLfunc.selectIdFromMatch(matchesJsonData, '2015');
        // console.log(bowlerIdObject);
        let ecoBowlerObjectArr = IPLfunc.findBowlerObject(bowlerIdObject, deliveriesJsonData);
        // console.log(ecoBowlerObjectArr);
        let ecoBowlerscore = IPLfunc.findEcoBowler(ecoBowlerObjectArr);
        let runsAndBalls = IPLfunc.findRunsAndBalls(ecoBowlerscore, ecoBowlerObjectArr);
        // console.log(runsAndBalls);
        let topTenBowler = IPLfunc.findEco(runsAndBalls);
        console.log(topTenBowler);
        //funcObj.writeToFile('economicBowler.json', topTenBowler);
    });
});


