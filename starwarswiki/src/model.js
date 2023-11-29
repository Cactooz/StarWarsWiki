export default {
	currentVehicle: undefined,
	vehicles: [],
	myVehicles: [],
	currentVehiclePromiseState: {},

	currentCharacter: undefined,
	characters: [],
	myCharacters: [],
	currentCharacterPromiseState: {},

	currentPlanet: undefined,
	planets: [],
	myPlanets: [],
	currentPlanetPromiseState: {},

	authenticated: undefined,
	ofTheDay: undefined,

	searchResult: {},
	setCurrentVehicle(id) {
		this.currentVehicle = id;
	},

	setCurrentCharacter(id) {
		this.currentCharacter = id;
	},

	setCurrentPlanet(id) {
		this.currentPlanet = id;
	},
	
	setSearchResult(result){
		this.searchResult = result;
	}

	/*addFavorite(path, id) {},
	Firebase stuff
	removeFavorite(path, id) {},*/
};
