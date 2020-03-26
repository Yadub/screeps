var subroleMoveToHarvest = require('subrole.moveToHarvest');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            subroleMoveToHarvest.run(creep);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.moveTo(20, 20, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                })
            }
        }
    }
};

module.exports = roleRepairer;