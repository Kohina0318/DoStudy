import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import MainNavigationStack from './src/navigations/mainNavigationStack/MainNavigationStack';
import {LogBox} from 'react-native';
import RootReducer from './src/redux/RootReducer';
import NewTheme from './src/assets/config/NewTheme';
import {ToastProvider} from 'react-native-toast-notifications';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
    marginBottom: 0,
    backgroundColor: '#FFF',
    flex: 1,
  },
});

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <View style={styles.mainContainer}>
      <Provider store={store}>
        <NewTheme />
        <ToastProvider swipeEnabled={true}>
          <MainNavigationStack />
        </ToastProvider>
      </Provider>
    </View>
  );
}