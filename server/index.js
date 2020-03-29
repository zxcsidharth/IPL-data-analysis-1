// All function call will be here
const csv = require('csvtojson');
const IPLfunc = require('./ipl.js');
csv()
.fromFile("../data/deliveries.csv")
.then(function(deliveriesJsonData){
    csv()
    .fromFile("../data/matches.csv")
    .then(function(matchesJsonData){ 
        let matchesPlayed = IPLfunc.numberOfMatchesPerYear(matchesJsonData);
        IPLfunc.writeToFile('matchesPlayedPeryear.json', matchesPlayed);
        let matchesWon = IPLfunc.matchesWonPerYear(matchesJsonData);
        let perYearWin = IPLfunc.findMatchesWon(matchesJsonData, matchesWon);
        IPLfunc.writeToFile('matchesPerYear.json', perYearWin);
        let SelectedIdObject = IPLfunc.selectIdFromMatch(matchesJsonData, '2016');
        let extraRunsPerTeam = IPLfunc.findExtraRuns(SelectedIdObject, deliveriesJsonData);
        IPLfunc.writeToFile('extraRunsperTeam.json', extraRunsPerTeam);
        let bowlerIdObject = IPLfunc.selectIdFromMatch(matchesJsonData, '2015');
        let ecoBowlerObjectArr = IPLfunc.findBowlerObject(bowlerIdObject, deliveriesJsonData);
        let ecoBowlerscore = IPLfunc.findEcoBowler(ecoBowlerObjectArr);
        let runsAndBalls = IPLfunc.findRunsAndBalls(ecoBowlerscore, ecoBowlerObjectArr);
        let topTenBowler = IPLfunc.findEco(runsAndBalls);
        IPLfunc.writeToFile('economicBowler.json', topTenBowler);
    });
});


