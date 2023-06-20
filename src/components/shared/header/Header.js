import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../assets/css/HeaderCss/HeaderStyle'
import { store } from '../../../../App';
const { width } = Dimensions.get('screen');

export default function Header(props) {
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View
      style={{
        ...styles.mainView,
        backgroundColor: themecolor.LOGINTHEMECOLOR1,
        borderBottomColor: themecolor.BOXBORDERCOLOR1
      }}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={themecolor.STATUSEBARCONTENT}
      />

      <View style={{ ...styles.mainViewContainer }}>
        <View
          style={{ ...styles.headerInnerView }}>

          <View style={{ width: width * 0.06, }}>
            {props.backIcon ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.toggle}
                onPress={props.onPressBack}
              >
                <CIcon
                  name="keyboard-backspace"
                  size={26}
                  color={themecolor.TXTWHITE}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Icon name="menu-sharp" size={26} color={themecolor.TXTWHITE} />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ ...styles.iconTitle, }}>
            {props.title == 'Home' ? (
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {/* <Image
                source={require('../../../assets/images/dostudy.jpg')}
                style={{ width: 60, height: 70, resizeMode: 'contain', }}
              /> */}
                <Text allowFontScaling={false} style={{ ...styles.headText, color: themecolor.TXTWHITE }}>
                  Do Study
                </Text>
              </View>
            ) : (
              <Text
                allowFontScaling={false}
                style={{ ...styles.toolbarTitle, color: themecolor.TXTWHITE }}
                numberOfLines={1}>
                {props.title}
              </Text>
            )}
          </View>


        </View>
      </View>
    </View>
  );
}
