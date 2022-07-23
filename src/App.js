import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { GasNoteDetail, GasNoteDetailSet, Loading } from './components';
import ProductImage from './components/molecules/ProductImage';
import store from './redux/store';
import Router from './router';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "Animated: `useNativeDriver`"
]);

const MainApp = () => {
  
  const { isLoading } = useSelector((state) => state.globalReducer)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
          <Router />
          <FlashMessage position="top" />
          {isLoading && <Loading />}
          <ProductImage />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
