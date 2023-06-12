import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';

export default function NoDataMsg(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text allowFontScaling={false} style={{ color: themecolor.TXTGREYS }}>{props.title}</Text>
    </View>
  );
}
