const fs = require('fs');
const folder = '../data/';
let files = [];
let csvData = [];
const result = {};

fs.readdirSync(folder).forEach((file) => {
	files = [...files, file];
});

files.forEach((file) => {
	const location = /(?<= - )\w+/.exec(file);
	parseCSV(location[0], fs.readFileSync(`${folder}${file}`, 'utf-8'));
});

function parseCSV(location, data) {
	let newData = [];
	data.split('\r\n').forEach((line) => {
		newData.push(csvToJson(line, location));
	});
	csvData = [...csvData, newData.filter((item) => item !== null)];
}

function csvToJson(csv, swapiType) {
	const [swdId, swdName, swapiId, swapiName] = csv.split(',');
	if (!swdId || !swdName || !swapiId || !swapiName) return null;
	return { swdId, swdName, swapiId, swapiName, swapiType };
}

csvData.reduce((acc, array) => {
	const type = array.length > 0 ? array[0].swapiType.toLowerCase() : '';

	if (array.some((item) => item.swapiType === 'Planets')) {
		acc.locations = [...(acc.locations || []), ...array];
	} else if (
		array.some((item) => item.swapiType === 'Starships' || item.swapiType === 'Vehicles')
	) {
		acc.vehicles = [...(acc.vehicles || []), ...array];
	} else if (array.some((item) => item.swapiType === 'People')) {
		acc.characters = [...(acc.characters || []), ...array];
	} else acc[type] = array;

	return acc;
}, result);

fs.writeFile(`${folder}apiHash.json`, JSON.stringify(result), (error) => {
	if (error) return console.error(error);
	console.log(`Wrote data to file.`);
});
