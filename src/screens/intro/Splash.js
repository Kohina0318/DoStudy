import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StatusBar, View, StyleSheet, Text } from 'react-native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { getUserData } from '../../repository/CommonRepository';
import { StoreDatatoAsync } from '../../repository/AsyncStorageServices';
import { getSettingDetails } from '../../repository/SettingRepository/SettingRepo';

const { width } = Dimensions.get('window');

export default function Splash(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [loader, setLoader] = useState(true);
  const [appLogo, setAppLogo] = useState('');
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    async function temp() {
      try {
        var userData = await getUserData();
        if (userData == null || userData == '' || userData == undefined) {
          setUserData([])
          var res = await getSettingDetails();
          if (res.status === true) {
            setLoader(false)
            var applog = res.data.logo.url
            setAppLogo(applog)
            await StoreDatatoAsync('@AppLogo', JSON.stringify(applog));
          }
          setTimeout(async () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          }, 3000)
        } else {
          setUserData(Object.values(userData));
          var res = await getSettingDetails();
          if (res.status === true) {
            setLoader(false)
            var applog = res.data.logo.url
            setAppLogo(applog)
            await StoreDatatoAsync('@AppLogo', JSON.stringify(applog));
          }
          setTimeout(async () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          }, 3000)

        }
      } catch (e) {
        setUserData([])
      }
    }
    temp()
  }, [props]);



  return (
    <View
      style={{
        ...styles.MainContainer,
        backgroundColor: themecolor.LOGINTHEMECOLOR,
      }}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={themecolor.STATUSEBARCONTENT}
      />

      {loader ?
        (<View style={{ flex: 1, }}></View>) : (
          <Image
            style={{
              width: width * 0.7,
              resizeMode: 'contain',
              alignSelf: 'center',
              flex: 1,
              zIndex: 9999,
            }}
            source={{ uri: appLogo }}
          />
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  Fbottom: {
    width: width,
    bottom: 0,
    position: 'absolute',
    flex: 1,
  },
  LogoStyle: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  LogoBottom: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignSelf: 'center',
  },

});
