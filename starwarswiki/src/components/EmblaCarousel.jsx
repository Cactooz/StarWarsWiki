import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Vortex from './Vortex';
import LandingCard from './LandingCard';

import '../style/embla.scss';

export function EmblaCarousel(props) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	if (!props.dataLoaded) {
		if (!props.loadingData) props.getData();
		return <Vortex />;
	}

	return (
		<div className='embla' ref={emblaRef}>
			<div className='embla-container'>
				{props.data.map((item) => (
					<div className='embla-slide' key={item.name}>
						<LandingCard
							text={item.name}
							image={item.image}
							altText={item.name}
							linkTo={`${item.path}/${item.name.replaceAll('/', '%2F').replaceAll('.', '%2E')}`}
							inAnimation={props.inAnimation}
						/>
					</div>
				))}
			</div>
			<button className='embla-prev' onClick={scrollPrev}>
				<svg xmlns='http://www.w3.org/2000/svg' height='16' width='10' viewBox='0 0 320 512'>
					<path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
				</svg>
			</button>
			<button className='embla-next' onClick={scrollNext}>
				<svg xmlns='http://www.w3.org/2000/svg' height='16' width='10' viewBox='0 0 320 512'>
					<path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' />
				</svg>
			</button>
		</div>
	);
}
