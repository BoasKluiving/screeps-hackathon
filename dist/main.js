// Module imports
var harvesterControl = require("harvester");
var builderControl = require("builder");
var guardControl = require("guard");
var spawnControl = require("spawnControl");
var healerControl = require("healer");

// Definition of spawn (hardcoded)
var spawn = Game.spawns.Spawn1;

module.exports.loop = function () {
    // Handle all the creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            harvesterControl(creep,spawn);
        }
        if(creep.memory.role == 'builder') {
            builderControl(creep,spawn);
        }
        if(creep.memory.role == 'guard') {
            guardControl(creep,spawn);
        }
        if(creep.memory.role == 'healer') {
            healerControl(creep,spawn);
        }
    }

    // Determine which creep should be spawned next
    spawnControl(spawn);
};
