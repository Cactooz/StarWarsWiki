# StarWarsWiki
Find more information about your favorite characters or places from the Star Wars universe! There are almost 1000 pages to explore!

## Deployment
[Star Wars Wiki](https://starwarsloreatlas.web.app/) - React web app using Vite

## Planned and Implemented Features
- [X] Landing presenter/view
- [X] Browse presenter/view
- [X] Details presenter/view
- [ ] More details in details view
- [ ] "Related" presenter/view
- [X] URL routing
- [X] API fetching 
- [X] Free text search
- [X] User registration and login
- [X] Profile page
- [X] Add/remove favorites
- [X] Header
- [X] Footer
- [X] Error page
- [X] Favicon
- [ ] Save data to persistence
- [ ] Styling/CSS

## Folder Structure
Short descriptions of the file structure can be found in the table below:

|Folder|Description|
|-|-|
| `/.vscode`|Visual Studio Code config|
| `/data`|Files for hashing between the two APIs, in different formats|
| `/utils`|Fetching and scraping|
| `/starwarswiki`|Contains all source code|
| `/starwarswiki/assets`|Contains fonts, images etc|
| `./assets/images`|Contains images, favicon etc|
| `/starwarswiki/src`|Source folder|
| `./src/components`|Contains compontents|
| `./src/presenters`|Contains presenters|
| `./src/views`|Contains views|

## APIs
- Primarily [Star Wars Database](https://starwars-databank.vercel.app/)
- Secondarily [SWAPI](https://swapi.dev/)

## Third party components
- [Suspense spinner](https://mhnpd.github.io/react-loader-spinner/docs/components/vortex)
- [Search bar](https://www.npmjs.com/package/react-search-autocomplete)

## Division of Labour
- Git setup - Hugo
- Fetch data - Hugo, Rikard
- Hashing between APIs - Hugo, Pontus, William
- Routing - Pontus
- Model - Team
- Home page view/presenter - Pontus
- Browsing view/presenter - Rikard
- Details view/presenter - William
- "Related" view/presenter - Hugo
- Header - Pontus
- Footer - Hugo
- Error page - Hugo
- Profile page - William, Rikard
- Login - Rikard
- Search bar - Pontus
- Persistence - William
- Styling - Team
