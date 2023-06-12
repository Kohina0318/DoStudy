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
import { styles } from '../../../../assets/css/ClassesCss/SubjectStyle';

const { width, height } = Dimensions.get('screen');

function SubjectDataFlatList({ item, themecolor, boxSize }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.subContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
    onPress={() => navigation.navigate('SubjectCategory', { Id: item.id,ClassId:item.class_id,Name:item.subject_name})}
    >
      <View style={{...styles.subImg}}>
      <Image
        source={{ uri: item.image }}
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
      />
      </View>
      <View
        style={{...styles.subMT5}}>
      </View>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color: themecolor.TXTWHITE,...styles.subhead}}>
        {item.subject_name}
      </Text>
    </TouchableOpacity>
  );
}

export function SubjectFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <SubjectDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
      )}
      numColumns={2}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        ...styles.contentContainerStyle
      }}
      scrollEnabled={true}
    />
  );
}
