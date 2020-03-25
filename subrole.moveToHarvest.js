var subroleMoveToHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES);
        if (!creep.memory.prefSource){
            creep.memory.prefSource = 0;
            // cosole.log(creep.name + ' no source found');
        }
        if (creep.harvest(sources[creep.memory.prefSource]) == ERR_NOT_IN_RANGE) {
            // console.log(creep.name + ' has moved with error code: ' + creep.moveTo(sources[creep.memory.prefSource]));
            if (creep.moveTo(sources[creep.memory.prefSource], {visualizePathStyle: {stroke: '#ffaa00'}}) == ERR_NO_PATH) {
                if (creep.memory.prefSource == sources.length - 1) {
                    creep.memory.prefSource = 0;
                }
                else {
                    creep.memory.prefSource += 1;
                }
                // console.log(creep.name + ' has changed source to ' + creep.memory.prefSource)
            }
        }
        else if (creep.harvest(sources[creep.memory.prefSource]) == ERR_NOT_ENOUGH_RESOURCES) {
            if (creep.memory.prefSource == sources.length - 1) {
                creep.memory.prefSource = 0;
            }
            else {
                creep.memory.prefSource += 1;
            }
            creep.moveTo(sources[creep.memory.prefSource], {visualizePathStyle: {stroke: '#ffaa00'}})
        }
	}
};

module.exports = subroleMoveToHarvest;
