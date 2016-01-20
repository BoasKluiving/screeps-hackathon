/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */
 module.exports = function(creep,spawn) {
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS,{filter: function(object){return object.pos.x > 20 && object.pos.x < 40 && object.pos.y > 20 && object.pos.y < 30}});
    if(hostiles.length) {
        if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hostiles[0])
            creep.memory.attacking = 0;
        } else {
            creep.memory.attacking = 1;
        }
    } else {
        creep.memory.attacking = 0;
        creep.moveTo(27,24);
    }
 }
