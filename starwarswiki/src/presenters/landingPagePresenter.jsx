import LandingPageView from '../views/landingPageView';
import { observer } from 'mobx-react-lite';
import { EmblaCarousel } from '../components/EmblaCarousel';
import { getPreview } from '../models/firebaseModel';
import { useEffect } from 'react';

export default observer(function LandingPagePresenter(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function getCarouselData() {
		getPreview();
		props.model.setCarouselLoading(true);
	}

	const carouselData = Object.keys(props.model.carouselData).map((key) => {
		return {
			name: props.model.carouselData[key].name,
			image: props.model.carouselData[key].image,
			path: props.model.carouselData[key].path,
		};
	});

	return (
		<div className='landing-container'>
			<LandingPageView inAnimation={props.model.inAnimation} />
			<section>
				<h2>Recommendations</h2>
				<EmblaCarousel
					data={carouselData}
					loadingData={props.model.carouselLoading}
					dataLoaded={props.model.carouselDataLoaded}
					getData={getCarouselData}
				/>
			</section>
		</div>
	);
});
