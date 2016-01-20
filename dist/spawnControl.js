module.exports = function(spawn) {
	console.log(Game.time);
	if(!Memory.screepsTypes) {
        Memory.screepsTypes = [{bodies:[TOUGH,MOVE,MOVE,ATTACK],ratio:4,alive:0,role:"guard"},{bodies:[HEAL,MOVE],ratio:1,alive:0,role:"healer"},{bodies:[MOVE,CARRY,WORK],ratio:1,alive:0,role:"harvester"}];
    }
	determineNextCreep(function(screepIndex) {
	    console.log(screepIndex);
		var result = Game.spawns.Spawn1.createCreep(Memory.screepsTypes[screepIndex].bodies,{role:Memory.screepsTypes[screepIndex].role});
		console.log("result");
		console.log(result);
		console.log(spawn.spawning)
        if(result != ERR_NOT_ENOUGH_ENERGY && result != ERR_BUSY) {
            console.log(result);
            Memory.screepsTypes[screepIndex].alive += 1;
        }
        console.log(JSON.stringify(Memory.screepsTypes));
	});
};


function determineNextCreep(spawnScreepType) {
	var ratioTotal = 0;
	var aliveTotal = 0;
	for (var screepIndex=0;screepIndex<Memory.screepsTypes.length;screepIndex++) {
		ratioTotal += Memory.screepsTypes[screepIndex].ratio;
		aliveTotal += Memory.screepsTypes[screepIndex].alive;
	}

    // Startup queue
	if(aliveTotal === 0 || aliveTotal === 1 || aliveTotal === 2) {
		spawnScreepType(2);
		return;
	}
	if(aliveTotal === 3 || aliveTotal === 4) {
	    spawnScreepType(0);
	}
	if(aliveTotal === 5) {
	    spawnScreepType(1);
	}

	// Find the screepType that has the highest difference between the
	// fraction alive and fraction that should be alive
	var minDifference = 9999999;
	var minScreepIndex = -1;
	for (var screepIndex=0;screepIndex<Memory.screepsTypes.length;screepIndex++) {
		var screepType = Memory.screepsTypes[screepIndex];
		var aliveFrac = screepType.alive / aliveTotal;
		var ratioFrac = screepType.ratio / ratioTotal;
		var difference = aliveFrac - ratioFrac;
		if(difference < minDifference) {
			minScreepIndex = screepIndex;
			minDifference = difference;
		}
	}	
	if(minScreepIndex==2 && Memory.screepsTypes[2].alive > 4) {
		minScreepIndex=0;
	}

	spawnScreepType(minScreepIndex);

};


