import { useState } from 'react';
import './options.scss';
import BearAndFishZustand from './BearAndFishZustand';

function Options() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h2>Chrome Extension Starter using Vite, React &Tailwind</h2>
			<div className='card mb-3'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			<section className='card'>
				<BearAndFishZustand />
			</section>
		</>
	);
}

export default Options;
