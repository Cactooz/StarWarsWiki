import { Vortex } from 'react-loader-spinner';

export default function () {
	return (
		<Vortex
			visible={true}
			height='360'
			width='360'
			ariaLabel='vortex-loading'
			wrapperStyle={{}}
			wrapperClass='vortex-wrapper'
			colors={['#7a9bff', '#ffffff', '#7a9bff', '#ffffff', '#ffffff', '#7a9bff']}
		/>
	);
}
