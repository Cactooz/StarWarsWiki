import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import '../style/embla.scss';

export const EmblaCarousel = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<div className='embla' ref={emblaRef}>
			<div className='embla__container'>
				<div className='embla__slide'>Slide 1</div>
				<div className='embla__slide'>Slide 2</div>
				<div className='embla__slide'>Slide 3</div>
			</div>
			<button className='embla__prev' onClick={scrollPrev}>
				Prev
			</button>
			<button className='embla__next' onClick={scrollNext}>
				Next
			</button>
		</div>
	);
};
