import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StatusBar, View, StyleSheet, Text } from 'react-native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { getUserData } from '../../repository/CommonRepository';

const { width } = Dimensions.get('window');

export default function Splash(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    async function temp() {
      try {
        var userData = await getUserData();
        if (userData == null || userData == '' || userData == undefined) {
          setUserData([])
          setTimeout(async () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          }, 1000)
        } else {
          setUserData(Object.values(userData));
          setTimeout(async () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          }, 2000)

        }
      } catch (e) {
        setUserData([])
      }
    }
    temp()
  }, [props]);


  // React.useEffect(() => {
  //   setTimeout(async () => {
  //     if (UserData.length > 0) {
  //       props.navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Dashboard' }],
  //       });
  //     }else{
  //       props.navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'SignIn' }],
  //       });
  //     }
  //   }, 1000)

  //   return () => {

  //   }
  // }, [])


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
      <Image
        style={{
          width: width * 0.7,
          resizeMode: 'contain',
          alignSelf: 'center',
          flex: 1,
          zIndex: 9999,
        }}
        source={require('../../assets/images/newlog.png')}
      />

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
