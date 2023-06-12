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
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';

const { width } = Dimensions.get('window');

export default function DrawerContent(props) {
  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...MainNavigatorstyle.DrawerContentSView,
        backgroundColor: themecolor.THEMECOLOR1,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={MainNavigatorstyle.userinfo1}>
        <View style={{ ...MainNavigatorstyle.ImageRView }}>
          <ImageR
            style={{ ...MainNavigatorstyle.userimg }}
            source={require('../../assets/images/newlog.png')}
          />
        </View>


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
