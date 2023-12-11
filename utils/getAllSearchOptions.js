import { appendFile } from 'fs';

let string;
//Fetch characters
string = 'https://starwars-databank-server.vercel.app/api/v1/characters?page=';
for (let i = 1; i <= 97; i++) {
	const response = await fetch(string + i);
	const characters = await response.json();
	const data = JSON.stringify(characters.data);
	appendFile('allData.json', data, () => {
		console.log(i);
	});
}

//Fetch creatures
// string = 'https://starwars-databank-server.vercel.app/api/v1/creatures?page=';
// for (let i = 1; i <= 8; i++) {
// 	const response = await fetch(string + i);
// 	const creatures = await response.json();
// 	const data = JSON.stringify(creatures.data);
// 	appendFile('allData.json', data, () => {
// 		console.log(i);
// 	});
// }

//Fetch droids
// string = 'https://starwars-databank-server.vercel.app/api/v1/droids?page=';
// for (let i = 1; i <= 6; i++) {
// 	const response = await fetch(string + i);
// 	const droids = await response.json();
// 	const data = JSON.stringify(droids.data);
// 	appendFile('allData.json', data, () => {
// 		console.log(i);
// 	});
// }

//Fetch Locations
string = 'https://starwars-databank-server.vercel.app/api/v1/locations?page=';
for (let i = 1; i <= 33; i++) {
	const response = await fetch(string + i);
	const locations = await response.json();
	const data = JSON.stringify(locations.data);
	appendFile('allData.json', data, () => {
		console.log(i);
	});
}

//Fetch Vehicle
string = 'https://starwars-databank-server.vercel.app/api/v1/vehicles?page=';
for (let i = 1; i <= 27; i++) {
	const response = await fetch(string + i);
	const vehicles = await response.json();
	const data = JSON.stringify(vehicles.data);
	appendFile('allData.json', data, () => {
		console.log(i);
	});
}
