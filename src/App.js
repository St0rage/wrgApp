import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Router from './router';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import { Loading } from './components';

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
