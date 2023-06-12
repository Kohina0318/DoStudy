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
import { styles } from '../../../../assets/css/ClassesCss/CategoryStyle';

const { width, height } = Dimensions.get('screen');

function BookCategoryDataFlatList({ item, themecolor, boxSize }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.subContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
    onPress={() => navigation.navigate('Content', {Id: item.id,classId:item.class_id,subjectId:item.subject_id,Name:item.category_name,Image:item.image })}
    >
      <Image
        source={{ uri: item.image }}
        style={{...styles.subImg}}
      />
      <View style={{...styles.subConView}}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color:themecolor.TXTWHITE,...styles.subhead}}>
        {item.category_name}
      </Text>
      </View>
    </TouchableOpacity>
  );
}

export function BookCategoryFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <BookCategoryDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
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
