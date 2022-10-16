let Election = artifacts.require('./Election.sol');

contract("Election", function(accounts) {

    let electionInstance;

    // checks if the contract is deployed with 3 candidates
    it("initialize with 3 candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 3);
        });
    });

    // checks if the contract is deployed zero votes for all candidates
    it("initializes candidates with 0 votes", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);            
        }).then(function(candidate) {
            assert.equal(candidate[2], 0, "initial vote count must be 0");
            return electionInstance.candidates(2);            
        }).then(function(candidate) {
            assert.equal(candidate[2], 0, "initial vote count must be 0");
            return electionInstance.candidates(3);            
        }).then(function(candidate) {
            assert.equal(candidate[2], 0, "initial vote count must be 0");            
        });
    });

    // checks if the contract is deployed with the functionality to vote only once
    it("allows a voter to cast a single vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, {from: accounts[0]});
        }).then(function(receipt) {
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "the voter was marked voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            let voteCount = candidate[2];
            assert.equal(voteCount, 1, "increment vote count by 1");
        })
    });
});

