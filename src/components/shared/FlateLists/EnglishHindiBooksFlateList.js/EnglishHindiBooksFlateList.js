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

function EnglishHindiBooksDataFlatList({ item, themecolor, boxSize }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.subContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
      onPress={() => navigation.navigate('FullPdfContainDetail', { contantUrl:item.pdf_url,UnitNo:item.book_name  })}
    >
      <Image
        source={{ uri: item.book_img }}
        style={{...styles.subImg}}
      />
      <View style={{...styles.subConView,backgroundColor: themecolor.CONTENTHEADEROPACITY}}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color:themecolor.DARKBLUECOLOR,...styles.subhead}}>
        {item.book_name}
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color:themecolor.DARKBLUECOLOR,...styles.txt,}}>
        - {item.book_author}
      </Text>
      </View>
    </TouchableOpacity>
  );
}

export function EnglishHindiBooksFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <EnglishHindiBooksDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
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
