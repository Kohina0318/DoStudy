import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions, ImageBackground
} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/YouTubeClassesCss/YouTubeClassesStyle';
import AD from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('screen');

function YouTubeClassDataFlatList({ item, themecolor, }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{ ...styles.classContanier, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
      onPress={() => navigation.navigate('YouTubeClassesListByID', { Id: item.id, Name: item.name, })}
    >

      <ImageBackground source={{ uri: item.image }} resizeMode='contain' style={{ ...styles.classImg }}>
        <View style={{ ...styles.classImgOpacity, }} >
          <Text
            allowFontScaling={false}
            style={{ color:"#fff", ...styles.bigtxt }}>
            {item.no_of_item}
          </Text>
          <View style={{ ...styles.MT10 }} />
          <Text
            allowFontScaling={false}
            style={{ color:"#fff", ...styles.bigtxt }}>
            Videos
          </Text>
          <View style={{ ...styles.MT15 }} />

          <View style={{...styles.youtubIcon}}>
          <AD name='youtube' size={30} color={"#fff"} />
          </View>

        </View>
      </ImageBackground>

      <View style={{ ...styles.MT5 }} />

      <View>
        <Text
          allowFontScaling={false}
          style={{ color: themecolor.TXTWHITE, ...styles.txt }}>
          {item.name}
        </Text>
      </View>
      <View style={{ ...styles.lastinnerView, }}>
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={{ color: themecolor.TXTGREYS, ...styles.smalltxt }}>
          - {item.channel_name}
        </Text>
      </View>

    </TouchableOpacity>
  );
}

export function YouTubeClassFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <YouTubeClassDataFlatList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
