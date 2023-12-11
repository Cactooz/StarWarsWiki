import * as allData from './allData.json' assert { type: 'json' };
import { writeFile } from 'fs';

const numberOfCharacters = 964 + 75 + 60;
const numberOfLocations = 326;
const numberOfVehicles = 267;

//console.log(allData);

const data = allData.default.flat(Infinity).map(({ _id, name, description, image, _v }, index) => {
	let type;
	if (index < numberOfCharacters) type = 'characters';
	else if (index < numberOfCharacters + numberOfLocations) type = 'locations';
	else if (index < numberOfCharacters + numberOfLocations + numberOfVehicles) type = 'vehicles';
	return { id: _id, name: name, type: type };
});

let json = JSON.stringify(data);
writeFile('autoCompleteList.json', json, 'utf-8', () => {});
