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

function ClassDataFlatList({ item, themecolor, }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.classContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
    onPress={() => navigation.navigate('Subjects', { Id: item.id,Name:item.name, dashTypes:"Classes"})}
    >
      <View style={{...styles.classImg}}>
      <Image
        source={{ uri: item.image }}
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
      />
      </View>
     </TouchableOpacity>
  );
}

export function ClassFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <ClassDataFlatList item={item} themecolor={themecolor} />
      )}
      numColumns={2}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
