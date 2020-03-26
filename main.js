var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function() {

    /** Automatic memory clearance of dead creeps **/

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    /** Automatic Spawning **/

    var maxHarvesters = 2;
    var maxUpgraders = 3;
    var maxBuilders = 4;
    var maxRepairers = 1;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    if (harvesters.length < maxHarvesters) {
        var newName = 'Harvester' + Game.time;
        console.log('Harvesters: ' + harvesters.length);
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'harvester'
            }
        });
    } else if (upgraders.length < maxUpgraders) {
        var newName = 'Upgrader' + Game.time;
        console.log('Upgraders: ' + upgraders.length);
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'upgrader'
            }
        });
    } else if (builders.length < maxBuilders) {
        var newName = 'Builder' + Game.time;
        console.log('Builders: ' + builders.length);
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'builder'
            }
        });
    } else if (repairers.length < maxRepairers) {
        var newName = 'Repairer' + Game.time;
        console.log('Repairers: ' + repairers.length);
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'repairer'
            }
        });
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, {
                align: 'left',
                opacity: 0.8
            });
    }

    /** Automatic Extension Construction  **/

    if Object.keys(Game.constructionSites) {
        //Construct only if there are no imcomplete construction sites
        var siteConstructed = false;
    }

    /** Terrain find code

    const terrain = Game.map.getRoomTerrain(mainRoomName);
    switch(terrain.get(pointOfInterest[0],pointOfInterest[1])) {
        case TERRAIN_MASK_WALL:
            break;
        case TERRAIN_MASK_SWAMP:
            break;
        case 0:
            break;
    }

    **/

    /** Tower defense code

    var tower = Game.getObjectById('e74458bb9a5e55923df5a0d2');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    **/

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}