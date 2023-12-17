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
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import '../src/style.css';

export default function AnimatedRoutes(props) {
	const location = useLocation();

	const browseLayout = (
		<>
			<HeaderPresenter model={props.model} />
			<BrowsePresenter model={props.model} />
		</>
	);

	const detailsLayout = (
		<>
			<HeaderPresenter model={props.model} />
			<DetailsPresenter model={props.model} />
			<MoreDetailsPresenter model={props.model} />
		</>
	);

	const browsePaths = ['/characters', '/vehicles', '/locations'];
	const detailsPaths = ['/characters/:name', '/locations/:name', '/vehicles/:name'];

	return (
		<TransitionGroup>
			<CSSTransition key={location.pathname} classNames={'fade'} timeout={300} unmountOnExit>
				<Routes location={location}>
					<Route
						exact
						path='/'
						element={
							<>
								<LandingPagePresenter model={props.model} />
							</>
						}
					/>
					<Route
						exact
						path='/search'
						element={
							<>
								<HeaderPresenter model={props.model} />
								<SearchPresenter model={props.model} />
							</>
						}
					/>
					{browsePaths.map((path) => {
						return <Route exact path={path} element={browseLayout} />;
					})}
					{detailsPaths.map((path) => {
						return <Route exact path={path} element={detailsLayout} />;
					})}
					<Route
						exact
						path='/profile'
						element={
							<>
								<HeaderPresenter model={props.model} />
								<ProfilePresenter model={props.model} />
							</>
						}
					/>
					<Route
						exact
						path='*'
						element={
							<>
								<HeaderPresenter model={props.model} />
								<ErrorPresenter />
							</>
						}
					/>
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
}
