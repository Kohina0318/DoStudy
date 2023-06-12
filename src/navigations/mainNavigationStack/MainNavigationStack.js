import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../../navigations/NavigationDrw/NavigationService';
import { isDarkMode } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import Dashboard from '../../screens/dashboard/Dashboard';
import Splash from '../../screens/intro/Splash';
import DrawerNavigation from '../drawer/DrawerNavigation';
import Subjects from '../../screens/classes/Subjects';
import BookCategory from '../../screens/classes/BookCategory'
import Content from '../../screens/classes/Content';
import ContentDetail from '../../screens/classes/ContentDetail';
import Classes from '../../screens/classes/Classes';
import SubjectCategory from '../../screens/classes/SubjectCategory';


function MainNavigationStack(props) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      ref={navigationRef}>
      <Stack.Navigator headerShown={false}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Classes"
          component={Classes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Subjects"
          component={Subjects}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubjectCategory"
          component={SubjectCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookCategory"
          component={BookCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          options={{ headerShown: false }}
        />
       <Stack.Screen
          name="ContentDetail"
          component={ContentDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigationStack;
