/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function(creep) {
    
    var spawn = Game.spawns.Spawn1;
    var sources = creep.room.find(FIND_SOURCES)
    
    if(creep.carry.energy < creep.carryCapacity) {
        // Can still collect energy
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else {
        // Needs to transport back
        if(creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn)
        }
    }
 }
