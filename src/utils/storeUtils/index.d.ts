import { Store } from 'redux';
import initialState from '../../constants/initialState';

interface IStore<S> extends Store<S> {
  useState<M>(mapState: (state: S) => M): M;
}

type TStore = <S>(s: S) => IStore<S>;

declare const storeWith: TStore;

const store = storeWith(initialState);

export declare const persistor: any;

export default store;
