import initialState from '../../constants/initialState';

interface ApiObject {
  api: Object;
}

type Dispatch = <D>(a: D) => D;
type UseStateWith = <I>(i: I) => <T>(mapState: (state: I) => T) => T;

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
