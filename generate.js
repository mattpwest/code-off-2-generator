"use strict";

const RNG_SEED = 1;
const NUM_LIQUIDS = 100;
const NUM_CONTAINERS = 25;
const MAX_LIQUID_QUANTITY = 100;
const MAX_LIQUIDS_PER_CONTAINER = 3;

const fs = require('fs');
const rng = require('random-seed').create(RNG_SEED);

// Generate problem
var liquids = [];
var containers = [];

// Make liquids
for (let i = 0; i < NUM_LIQUIDS; i++) {
	liquids.push({
		id: i,
		quantity: randomInt(0, MAX_LIQUID_QUANTITY)
	});
}

// Make jars
for (let i = 0; i < NUM_CONTAINERS; i++) {
	let container = {
		capacity: randomInt(0, MAX_LIQUID_QUANTITY),
		types: []
	};

	containers.push(container);

	for (let j = 0; j < 1 + randomInt(0, MAX_LIQUIDS_PER_CONTAINER); j++) {
		let liquidType = randomInt(0, NUM_LIQUIDS);
		while (container.types.indexOf(liquidType) >= 0) {
			liquidType = randomInt(0, NUM_LIQUIDS);
		}
		container.types.push(liquidType);
	}
}

// Output problem file
var outputContent = '';
outputContent += NUM_LIQUIDS + '\n';
for (let i = 0; i < NUM_LIQUIDS; i++) {
	outputContent += liquids[i].quantity + '\n';
}

outputContent += NUM_CONTAINERS + '\n';
for (let i = 0; i < NUM_CONTAINERS; i++) {
	outputContent += containers[i].capacity + ',';
	for (let j = 0; j < containers[i].types.length; j++) {
		outputContent += containers[i].types[j];

		if (j !== containers[i].types.length - 1) {
			outputContent += ',';
		}
	}
	outputContent += '\n';
}

fs.writeFileSync('code_off-2.in', outputContent);

// Utility functions
function randomInt (low, high) {
    return low + rng(high - low);
}