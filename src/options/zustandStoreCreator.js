import { create } from 'zustand';
import { produce } from 'immer';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import loggerMiddleware from '../utils/zustandLogger';

/**
 * Store resetting utilities
 */
const sliceResetFns = new Set();

export const resetAllSlices = () => {
	sliceResetFns.forEach((resetFn) => {
		resetFn();
	});
};

/**
 * Bear Store Slice
 */

const initialBearState = {
	bears: 0,
};

const createBearSlice = (set) => {
	sliceResetFns.add(() => set(initialBearState));

	return {
		...initialBearState,
		removeAllBears: () => set(() => ({ bears: 0 })),
		updateBears: (newBears) => set(() => ({ bears: Number(newBears) })),
		eatFish: () =>
			set((state) => {
				if (state.bears > 0) {
					return { fishes: state.fishes - state.bears };
				} else {
					return { fishes: state.fishes };
				}
			}),
	};
};

/**
 * Fish Store Slice
 */

const initialStateFish = {
	fishes: 0,
};
const createFishSlice = (set, get) => {
	sliceResetFns.add(() => set(initialStateFish));

	return {
		...initialStateFish,
		addFish: () => set(() => ({ fishes: get().fishes + 1 })),
	};
};

/**
 * Merged Bear & Fish Store slice
 */

export const createBearFishSlice = (set, get) => ({
	addBearAndFish: () => {
		incrementBears();
		get().addFish();
	},
});

const useBoundStore = create(
	loggerMiddleware((...a) => ({
		...createBearSlice(...a),
		...createFishSlice(...a),
		...createBearFishSlice(...a),
	}))
);

export const incrementBears = () =>
	useBoundStore.setState((state) => ({ bears: state.bears + 1 }));
export const decrementBears = () =>
	useBoundStore.setState((state) => ({ bears: state.bears - 1 }));

export const bearFishStore = createSelectorFunctions(useBoundStore);

/**
 * Nested Counter Store
 */

export const nestedCounterStore = create((set) => ({
	deep: {
		nested: {
			obj: {
				count: 10,
			},
		},
	},
	increateNestedCounter: () =>
		set(
			produce((state) => {
				++state.deep.nested.obj.count;
			})
		),
	incrementNestedCounterDesiStyle: () =>
		set((state) => ({
			deep: {
				nested: {
					obj: {
						count: state.deep.nested.obj.count + 1,
					},
				},
			},
		})),
}));
