/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('healer'); // -> 'a thing'
 */
 
 module.exports = function(creep) {
     var creep_to_heal = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: function(anotherCreep){return anotherCreep.hits < anotherCreep.hitsMax && creep !== anotherCreep && anotherCreep.memory.attacking == 0;}});
     console.log(creep_to_heal);
     if(creep_to_heal) {
         if(creep.heal(creep_to_heal) == ERR_NOT_IN_RANGE) {
             creep.moveTo(creep_to_heal);
         }
     } else {
         var closest_guard = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: function(guardCreep){ return guardCreep.memory.role == 'guard'}});
         if(closest_guard) {
             creep.moveTo(closest_guard);
         }
     }
 }