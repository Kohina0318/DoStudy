import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Image as ImageR } from 'react-native';
import { navigate } from '../NavigationDrw/NavigationService';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import AD from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome';
import Ii from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import { removeDatafromAsync } from '../../repository/AsyncStorageServices';
import { postSignOut } from '../../repository/AuthRepository/SignOutRepository';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';

const { width } = Dimensions.get('window');

export default function DrawerContent(props) {
  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [data, setData] = useState([]);

  const handleUserData = async () => {
    try {
      var res = await getProfileInfo();
      if (res.status === true) {
        setData(res.data)
      }
      else {
        toast.show(res.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);



  const handleConfirmLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to Logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => handleLogout() },
      ],
    );
  };


  const handleLogout = async () => {
    try {
      var res = await postSignOut()

      if (res.status == true) {
        await removeDatafromAsync('@UserData');
        await removeDatafromAsync('@Token');
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }
      else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };




  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...MainNavigatorstyle.DrawerContentSView,
        backgroundColor: themecolor.THEMECOLOR1,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={MainNavigatorstyle.userinfo1}>

        {data.length > 0 ?
          <View style={{ ...MainNavigatorstyle.ImageRView }}>
            <ImageR
              style={{ ...MainNavigatorstyle.userimg }}
              // source={require('../../assets/images/newlog.png')}
              source={{ uri: data[0].profile_photo }}
            />
            <View style={{ marginTop: 7 }} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss1,
                color: themecolor.ADDTOCARTBUTTONCOLOR,
              }}>
              Hi, {data[0].name}
            </Text>
          </View>
          : <></>}



        <ScrollView showsVerticalScrollIndicator={false}>


          <TouchableOpacity
            onPress={() => navigate('Dashboard')}
            style={MainNavigatorstyle.viewstyle1}>
            <AD name="home" size={20} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Profile')}
            style={MainNavigatorstyle.viewstyle1}>
            <FA name="user-o" size={20} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Support')}
            style={MainNavigatorstyle.viewstyle1}>
            <Ii name="ios-chatbubble-ellipses-outline" size={22} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Help & support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.google.com/')}
            style={MainNavigatorstyle.viewstyle1}>
            <FA name="star-o" size={22} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Rate at
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleConfirmLogout();
              navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={MainNavigatorstyle.viewstyle1}>
            <AD name="logout" size={18} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Sign Out
            </Text>
          </TouchableOpacity>

        </ScrollView>


        <View style={MainNavigatorstyle.view2}>
          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />
          <View style={{ marginVertical: 3 }} />
          <Text allowFontScaling={false} style={{ ...MainNavigatorstyle.view2txt }}>App Version 1.0</Text>
          <View style={{ marginVertical: 3 }} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
