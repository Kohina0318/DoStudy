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
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAppLogoAsync } from '../../../repository/CommonRepository';
const { width } = Dimensions.get('screen');

export default function Header(props) {
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [appLogoAsync, setAppLogoAsync] = useState('');


  useEffect(() => {
    async function temp() {
      try {
        var userData = await getAppLogoAsync();
        if (userData == null || userData == '' || userData == undefined) {
          setAppLogoAsync('')
        } else {

          setAppLogoAsync(userData);
        }
      } catch (e) {
        setAppLogoAsync('')
      }
    }
    temp()
  }, [props]);


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

          <View style={{ ...styles.iconViewCont }}>
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

          {props.title == 'Home' ? (
            <>
              <View style={{ ...styles.iconTitle1, }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <Image
                    source={{ uri: appLogoAsync }}
                    style={{ width: 50, height: 50, resizeMode: 'contain', }}
                  />
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => navigation.navigate('Search')} style={{ ...styles.iconViewCont, }}>
                <Icon name="search" size={22} color={themecolor.TXTWHITE} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={{ ...styles.iconTitle1, }}>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.toolbarTitle, color: themecolor.TXTWHITE, }}
                  numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
              {props.title == "Search" ?
                <View style={{ ...styles.iconViewCont, }}></View> 
                :
                <TouchableOpacity activeOpacity={0.5}
                  onPress={() => navigation.navigate('Search')} style={{ ...styles.iconViewCont, }}>
                  <Icon name="search" size={22} color={themecolor.TXTWHITE} />
                </TouchableOpacity>
              }
            </>

          )}



        </View>
      </View>
    </View>
  );
}
