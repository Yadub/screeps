var subroleMoveToHarvest = require('subrole.moveToHarvest');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if (creep.store.getFreeCapacity() == 0) {
                creep.moveTo(20,20, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            else{
                subroleMoveToHarvest.run(creep);
            }
        }
	}
};

module.exports = roleUpgrader;
