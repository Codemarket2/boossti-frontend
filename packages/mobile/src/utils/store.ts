// configureStore.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '@frontend/shared/redux/reducers';
import middleware from '@frontend/shared/redux/middleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);
// export default () => {
//   let store = createStore(persistedReducer, middleware);
//   let persistor = persistStore(store);
//   return { store, persistor };
// };
