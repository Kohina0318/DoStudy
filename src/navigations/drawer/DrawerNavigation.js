import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../../screens/dashboard/Dashboard'
import DrawerContent from './DrawerContent';
import BottomNavigationStack from '../bottomNavigator/BottomNavigationStack';
const DrawerNav = createDrawerNavigator();

export default function DrawerNavigation(props) {
  return (
    <DrawerNav.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'tranparent',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          overflow: 'hidden',
        },
      }}
      initialRouteName="Dashboard">
      <DrawerNav.Screen
        name="Dashboard"
        component={BottomNavigationStack}
        options={{ headerShown: false }}
      />
    </DrawerNav.Navigator>
  );
}
