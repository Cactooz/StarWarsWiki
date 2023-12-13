# StarWarsWiki
Find more information about your favorite characters or places from the Star Wars universe! There are almost 1000 pages to explore!

## Deployment
[Star Wars Wiki](https://starwarsloreatlas.web.app/) - React web app using Vite

## Folder Structure
Short descriptions of the file structure can be found in the table below:

|Folder|Description|
|-|-|
| `/.vscode`|Visual Studio Code config|
| `/starwarswiki`|Contains all source code|
| `/starwarswiki/assests`|Contains fonts, images etc|
| `./assets/images`|Contains images, favicon etc|
| `/starwarswiki/src`|Source folder|
| `./src/components`|Contains components|
| `./src/data`|Contains autocomplete data, for searching|
| `./src/models`|Contains the application state|
| `./src/presenters`|Contains presenters|
| `./src/views`|Contains views|

## APIs
- Primarily [Star Wars Database](https://starwars-databank.vercel.app/)
- Secondarily [SWAPI](https://swapi.dev/)

### Limitations
- The Star Wars Database API does not have a built-in search function. The search function for this website is built in a way that uses the autocomplete suggestions of the text input. That is why you will not get any search results if there are no suggestions. Please keep that in mind when using the website. 

## Third party components
- [Suspense spinner](https://mhnpd.github.io/react-loader-spinner/docs/components/vortex)
- [Search bar](https://www.npmjs.com/package/react-search-autocomplete)

## Planned and Implemented Features
- [X] Landing presenter/view
- [X] Browse presenter/view
- [X] Details presenter/view
- [X] More details in details view
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
- [X] Save data to persistence
- [ ] Styling/CSS

## Division of Labour
- Git setup - Hugo
- Fetch data - Hugo, Rikard
- Hashing between APIs - Hugo, Pontus, William
- Routing - Pontus
- Model - Team
- Home page view/presenter - Pontus
- Browsing view/presenter - Rikard
- Details view/presenter - William
- More details view/presenter - Hugo
- Header - Pontus
- Footer - Hugo
- Error page - Hugo
- Profile page - William, Rikard
- Login - Rikard
- Search bar - Pontus
- Persistence - William
- Styling - Team
