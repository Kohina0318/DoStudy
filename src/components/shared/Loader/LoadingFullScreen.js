import { View, ActivityIndicator, Text, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { styles } from '../../../assets/css/LoadingCss/LoadingStyle';


export default function LoadingFullScreen(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
      <View style={{ ...styles.loadingFullView, backgroundColor: themecolor.THEMECOLOR }}>
        <ActivityIndicator size="large" color={themecolor.BACKICON} />
      </View>
    </>
  );
}
