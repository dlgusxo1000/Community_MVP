import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootScreen from './screens/RootScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <RootScreen />
    </GestureHandlerRootView>
  );
}
