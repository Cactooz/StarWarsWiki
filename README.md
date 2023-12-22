# Star Wars Wiki
Explore details about your beloved Star Wars characters, vehicles and locations! Dive into nearly 1700 pages of information. Connect with fellow fans, share your favorites, and showcase them to the Star Wars community!

## Deployment
[Star Wars Wiki](https://starwarsloreatlas.web.app/) - React web app using Vite and SCSS styling

## Setup
Star Wars Wiki uses the package manager `yarn`.

1. Clone the repository with `git clone https://github.com/Cactooz/StarWarsWiki.git`
2. Set up a Firebase Realtime database and upload the data from [`/data/apiHash.json`](https://github.com/Cactooz/StarWarsWiki/blob/main/data/apiHash.json) under the database path `/apiHash`.
2. Go into the project folder with `cd starwarswiki`
3. Copy `[.env.example]` to `.env` with `cp .env.example .env`
4. Fill in your Firebase credentials in the new `.env` file
5. Set up project with `yarn install`
6. Run project with `yarn dev` or `yarn dev --host` to test on mobile

## APIs
- [Star Wars Database](https://starwars-databank.vercel.app/)
- [SWAPI](https://swapi.dev/)
- [Firebase](https://firebase.google.com/) for storing user data

## Features
- The Star Wars Database API does not have a built-in search function. The search function for this website is built in a way that uses the autocomplete suggestions based on the text input.
- SWAPI contains more specific data about some pages. When available, the data from the APIs have been mashed up.
- Personal profile with friend system.
- Feedback on user actions and system status.
- User should feel in control as there are multiple ways to navigate the site.
- Dynamic elements for nicer UI.
- Carousel on the home page, showcasing popular pages.
- Responsive design for different screen sizes.
- URL routing with possible link sharing

## Third-party Components
- [React loader spinner](https://mhnpd.github.io/react-loader-spinner/docs/components/vortex) for system status
- [Search bar](https://www.npmjs.com/package/react-search-autocomplete) to search the database
- [Burger menu](https://negomi.github.io/react-burger-menu/) to make navbar work on mobile
- [Toastify](https://fkhadra.github.io/react-toastify/introduction/) for feedback messages
- [Starry Sky](https://codepen.io/sharnajh/pen/WNvppRy) as dynamic background
- [Embla Carousel](https://www.embla-carousel.com/) to showcase popular pages

## Folder Structure
Short descriptions of the file structure can be found in the table below:

|Folder|Description|
|-|-|
| `/.vscode`|Visual Studio Code config|
| `/data`|Hashing data for the APIs|
| `/starwarswiki`|Contains all source code|
| `/starwarswiki/assets`|Contains fonts, images etc|
| `./assets/images`|Contains images, favicon etc|
| `/starwarswiki/src`|Source folder|
| `./src/components`|Contains components|
| `./src/data`|Contains autocomplete data, for searching|
| `./src/models`|Contains the application state and persistence|
| `./src/presenters`|Contains presenters|
| `./src/style`|SCSS files|
| `./src/views`|Contains views|
| `/utils`|Scripts for scraping and generating files|

## Team
- [Hugo](https://github.com/Cactooz)
- [Pontus](https://github.com/pontaberglund)
- [Rikard](https://github.com/LowbeerR)
- [William](https://github.com/pilsnerfrajz)

## Copyright Notice
The content presented on the website, including but not limited to information, images, and references related to the Star Wars universe, is the exclusive property of Lucasfilm Ltd. All intellectual property rights, including copyrights and trademarks, are owned by Lucasfilm Ltd. This platform and website is not affiliated with, endorsed by, or sponsored by Lucasfilm Ltd. The use of Star Wars-related content is solely for informational and educational purposes. No copyright infringement intended. Star Wars is a registered trademark of Lucasfilm Ltd. All rights reserved.
