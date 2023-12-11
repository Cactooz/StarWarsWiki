export async function getAll(run) {
	if (run) {
		const scrape = {
			data: [
				{ name: 'characters', size: 964 },
				{ name: 'creatures', size: 75 },
				{ name: 'droids', size: 60 },
				{ name: 'locations', size: 326 },
				{ name: 'organizations', size: 135 },
				{ name: 'species', size: 82 },
				{ name: 'vehicles', size: 267 },
			],
		};

		let scrapedData = [];

		let currentBrowse = undefined;
		let browseResult = {};

		scrape.data.forEach(async (path) => {
			for (let i = 1; i <= path.size / 10; i++) {
				await fetchSWDatabank(path.name, { page: i }, `test${path}${i}`);
				browseResult = queryClient.getQueryData(`test${path}${i}`);
				currentBrowse = `test${path}${i}`;
				scrapedData = [...scrapedData, path.name, ...browseResult.data];
				console.log(scrapedData);
			}
		});
	}
}
