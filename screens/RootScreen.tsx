import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import PostListScreen from './PostListScreen';
import PostDetailScreen from './PostDetailScreen';
import PostWriteScreen from './PostWriteScreen';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

interface RouteItem {
  name: string;
  component: React.ComponentType<any>;
  presentation?: NativeStackNavigationOptions['presentation'];
}
const Stack = createNativeStackNavigator();

const RootScreen: FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, user => setUser(user));
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'PostList' : 'SignIn'}>
        {RouterSetting.map(v => {
          return (
            <Stack.Screen
              key={`${v.name}`}
              name={v.name}
              component={v.component}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
                presentation: v.presentation && v.presentation,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RouterSetting: RouteItem[] = [
  {
    name: 'SignIn',
    component: SignInScreen,
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
  },
  {
    name: 'PostList',
    component: PostListScreen,
  },
  {
    name: 'PostDetail',
    component: PostDetailScreen,
  },
  {
    name: 'PostWrite',
    component: PostWriteScreen,
  },
];

export default RootScreen;
