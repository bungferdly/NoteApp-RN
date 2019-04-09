import initialState from '../constants/initialState';

interface ApiObject {
  api: Object;
}

type Dispatch = <D>(a: D) => Promise<D>;
type UseStateWith = <I>(i: I) => <T>(p: (s: I) => T) => [T, Dispatch];

const useStateWith: UseStateWith;
const useState = useStateWith(initialState);
const getState = () => initialState;
const dispatch: Dispatch;

const store = {
  useState,
  getState,
  dispatch
};

export const persistor: any;

export default store;
