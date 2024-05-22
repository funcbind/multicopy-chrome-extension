import { useState } from 'react';

function MainContent() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h2>Chrome Extension Starter using Vite, React &Tailwind</h2>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
		</>
	);
}

export default MainContent;
