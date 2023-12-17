import { Route, Routes, useLocation } from 'react-router-dom';
import HeaderPresenter from './presenters/headerPresenter';
import BrowsePresenter from './presenters/browsePresenter';
import DetailsPresenter from './presenters/detailsPresenter';
import MoreDetailsPresenter from './presenters/moreDetailsPresenter';
import LandingPagePresenter from './presenters/landingPagePresenter';
import SearchPresenter from './presenters/searchPresenter';
import ProfilePresenter from './presenters/profilePresenter';
import ErrorPresenter from './presenters/errorPresenter';
import { AnimatePresence, motion } from 'framer-motion';

import '../src/style.css';

export default function AnimatedRoutes(props) {
	const location = useLocation();
	const detailsLayout = (
		<>
			<DetailsPresenter model={props.model} />
			<MoreDetailsPresenter model={props.model} />
		</>
	);

	function transition(originalComponent) {
		return (
			<>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					{originalComponent}
				</motion.div>
			</>
		);
	}

	const browsePaths = ['/characters', '/vehicles', '/locations'];
	const detailsPaths = ['/characters/:name', '/locations/:name', '/vehicles/:name'];

	return (
		<>
			<HeaderPresenter model={props.model} />
			<AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname}>
					<Route index element={transition(<LandingPagePresenter model={props.model} />)} />
					<Route
						exact
						path='/search'
						element={transition(<SearchPresenter model={props.model} />)}
					/>
					{browsePaths.map((path) => {
						return (
							<Route
								key={path}
								exact
								path={path}
								element={transition(<BrowsePresenter model={props.model} />)}
							/>
						);
					})}
					{detailsPaths.map((path) => {
						return <Route key={path} exact path={path} element={transition(detailsLayout)} />;
					})}
					<Route
						exact
						path='/profile'
						element={transition(<ProfilePresenter model={props.model} />)}
					/>
					<Route exact path='*' element={transition(<ErrorPresenter />)} />
				</Routes>
			</AnimatePresence>
		</>
	);
}
