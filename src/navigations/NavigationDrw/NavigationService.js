import * as React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (screen, params = {}) => {
  navigationRef.current?.navigate(screen, params);
};

export const goBack = (screen, params = {}) => {
  navigationRef.current?.goBack();
};

export const goBackTwoScreen = (num) => {
  navigationRef.current?.pop(num);
};

export const openDrawer = (navigation) => {
  navigationRef?.dispatch(DrawerActions.openDrawer());
};

export const closeDrawer = (navigation) => {
  navigation.dispatch(DrawerActions.closeDrawer());
};

export function navigateToClearStack(routeName, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName, params: params}],
    }),
  );
}
