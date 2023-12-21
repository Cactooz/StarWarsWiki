import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Vortex from './Vortex';
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
			<div className='embla__container'>
				{props.data.map((item) => (
					<div className='embla__slide' key={item.name}>
						<p>{item.name}</p>
						<img src={item.image} />
					</div>
				))}
			</div>
			<button className='embla__prev' onClick={scrollPrev}>
				Prev
			</button>
			<button className='embla__next' onClick={scrollNext}>
				Next
			</button>
		</div>
	);
}
