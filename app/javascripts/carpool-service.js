const Web3 = require('web3');
const contract = require('truffle-contract');
const carpool_artifacts = require('../../build/contracts/Carpool.json');
const utils = require('./app-utils');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var Carpool = contract(carpool_artifacts);
Carpool.setProvider(web3.currentProvider);

// -$- Get account information -$-
var accounts, account;
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
    }

    if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum \
            client is configured correctly.");
        return;
    }

    accounts = accs;
    account = accounts[0];
});

var carpool;
const accountIdx = 3;
// -$- Register a driver -$-
Carpool.deployed().then(function(instance) {
    carpool = instance;
    return carpool.registerDriver.call('lex0', 'L8327788', {
        from: accounts[accountIdx]});
}).then(function(result) {
    var error = result.toNumber();
    if (!error) {
        carpool.registerDriver('lex0', 'L8327788', {from: accounts[accountIdx], 
            gas: 154000}).then(function(result) {
            var log = utils.retrieveEventLog(result.logs, 'DriverRegistered');
            if (log) {
                console.log('Driver registered with account %s', log.args.account)
                console.log('\tname: %s', web3.toAscii(log.args.name));
            }
        });
    } else {
        console.log('Error registering drive, code: %d', error);
    }
}).catch(function(err) {
    console.log('Error' + err);
});

