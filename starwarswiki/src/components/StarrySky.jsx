import React from 'react';
import anime from 'animejs/lib/anime.es.js';

// Twinkling Night Sky by Sharna. Modified by William Hedenskog and Hugo Bachér

class StarrySky extends React.Component {
	state = {
		num: 100,
		vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	};

	starryNight = () => {
		anime({
			targets: ['#sky .star'],
			opacity: [
				{
					duration: 700,
					value: '0',
				},
				{
					duration: 700,
					value: '1',
				},
			],
			easing: 'linear',
			loop: true,
			delay: (el, i) => 40 * i,
		});
	};

	shootingStars = () => {
		anime({
			targets: ['#shootingstars .wish'],
			easing: 'linear',
			loop: true,
			delay: (el, i) => 2000 * i,
			opacity: [
				{
					duration: 700,
					value: '1',
				},
			],
			width: [
				{
					value: '150px',
				},
				{
					value: '0px',
				},
			],
			translateX: 350,
		});
	};

	randomRadius = () => {
		return Math.random() + 3;
	};

	getRandomX = () => {
		return Math.floor(Math.random() * Math.floor(this.state.vw)).toString();
	};

	getRandomY = () => {
		return Math.floor(Math.random() * Math.floor(this.state.vh)).toString();
	};

	componentDidMount() {
		this.starryNight();
		this.shootingStars();
		window.addEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
		if (window.innerWidth >= 800) this.setState({ vw: window.innerWidth, vh: window.innerHeight });
	};

	render() {
		const { num } = this.state;
		const color = ['red', 'blue', 'yellow'];
		return (
			<div>
				<svg id='sky'>
					<defs>
						<radialGradient id='red'>
							<stop offset='20%' stopColor='#f1caca' />
							<stop offset='100%' stopColor='transparent' />
						</radialGradient>
					</defs>
					<defs>
						<radialGradient id='yellow'>
							<stop offset='20%' stopColor='#fff8bd' />
							<stop offset='100%' stopColor='transparent' />
						</radialGradient>
					</defs>
					<defs>
						<radialGradient id='blue'>
							<stop offset='20%' stopColor='#bbf3ff' />
							<stop offset='100%' stopColor='transparent' />
						</radialGradient>
					</defs>

					{[...Array(num)].map((x, y) => (
						<circle
							cx={this.getRandomX()}
							cy={this.getRandomY()}
							r={this.randomRadius()}
							fill={`url(#${color[Math.floor(Math.random() * 3)]})`}
							key={y}
							className='star'
						/>
					))}
				</svg>
				<div id='shootingstars'>
					{[...Array(this.state.num)].map((x, y) => (
						<div
							key={y}
							className='wish'
							style={{
								left: `${this.getRandomY()}px`,
								top: `${this.getRandomX()}px`,
							}}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default StarrySky;
