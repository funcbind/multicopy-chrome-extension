import { useState } from 'react';
import {
	bearFishStore,
	decrementBears,
	incrementBears,
	resetAllSlices,
} from './zustandStoreCreator';

const BearAndFishZustand = () => {
	const [newBearCount, setNewBearCount] = useState(0);

	const bears = bearFishStore.use.bears();
	const fishes = bearFishStore.use.fishes();
	const addFish = bearFishStore.use.addFish();
	const eatFish = bearFishStore.use.eatFish();
	const addBearFish = bearFishStore.use.addBearAndFish();
	const removeAllBears = bearFishStore.use.removeAllBears();
	const updateBears = bearFishStore.use.updateBears();

	function updateBearCount() {
		if (newBearCount < 0) {
			alert(`Bear Count should be greater than 0`);
			return;
		}
		updateBears(newBearCount);
	}

	return (
		<>
			<button
				className='p-1 bg-slate-100 hover:bg-slate-300 mb-1'
				onClick={() => resetAllSlices()}
			>
				Reset Both Fish & Bear Stores
			</button>

			<button
				className='p-1 bg-slate-100 hover:bg-slate-300'
				onClick={() => addBearFish()}
			>
				Add both bear & fish
			</button>

			<div className='card mt-2'>
				<h3>Bears: {bears}</h3>
				<section className='p-2 border'>
					<button onClick={incrementBears}>Increase Bear Population</button>
					<button onClick={decrementBears}>Decrese Bear Population</button>
					<button onClick={eatFish}>Bear Eat FishPopulation</button>
					<button onClick={removeAllBears}>removeAllBears</button>
					<button onClick={updateBearCount}>Update bear count</button>
					<input
						type='text'
						value={newBearCount}
						onChange={(e) => setNewBearCount(e.target.value)}
					></input>
				</section>
			</div>

			<div className='card mt-2'>
				<h3>Fishes {fishes}</h3>
				<section className='p-2 border'>
					<button onClick={addFish}>Add Fish</button>
				</section>
			</div>
		</>
	);
};

export default BearAndFishZustand;
