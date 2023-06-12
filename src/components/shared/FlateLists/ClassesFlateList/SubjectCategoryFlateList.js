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

function SubjectCategoryDataFlateList({ item, themecolor, boxSize }) {
  const navigation = useNavigation();

  return (
      <TouchableOpacity activeOpacity={0.5} disabled={item.touch}
        style={{ ...styles.classContanier, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        onPress={() => navigation.navigate(item.onpress, item.itemToSend)}
      >
        <View style={{ ...styles.classImg }}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View
          style={{ ...styles.classMT5 }}>
        </View>
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={{ color: themecolor.TXTWHITE, ...styles.classhead }}>
          {item.name}
        </Text>
      </TouchableOpacity>
  );
}

export function SubjectCategoryFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <SubjectCategoryDataFlateList item={item} themecolor={themecolor} boxSize={props.boxSize} />
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
