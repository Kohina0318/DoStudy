import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,Linking
} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/ResultCss/ResultStyle';

const { width, height } = Dimensions.get('screen');

function ResultDataFlatList({ item, themecolor, boxSize }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.classContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
    onPress={() =>  Linking.openURL(item.link)}
    >
      <View style={{...styles.classImg}}>
      <Image
        source={{ uri: item.board_img }}
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
      />
      </View>
      <View
        style={{...styles.classMT5}}>
      </View>

      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color: themecolor.TXTWHITE,...styles.classhead}}>
        {item.board} Board
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color: themecolor.TXTWHITE,...styles.txt}}>
       {item.class_name} - Result {item.result_year}
      </Text>
    </TouchableOpacity>
  );
}

export function ResultFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <ResultDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
      )}
    //   numColumns={2}
    //   horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
