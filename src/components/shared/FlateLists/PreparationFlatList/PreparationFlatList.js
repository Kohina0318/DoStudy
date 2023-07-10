import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/ClassesCss/ClassesStyle';

const { width, height } = Dimensions.get('screen');

function PreparationDataFlatList({ item, themecolor,}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.fullContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
    onPress={() => navigation.navigate('Subjects', { Id: item.id,Name:item.name, dashTypes:"Preparation"})}
    >
      <View style={{...styles.fullImg,}}>
      <Image
        source={{ uri: item.image }}
        resizeMode='stretch'
        style={{ width: '100%', height: '100%' }}
      />
      </View>
    </TouchableOpacity>
  );
}

export function PreparationFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <PreparationDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
      )}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
