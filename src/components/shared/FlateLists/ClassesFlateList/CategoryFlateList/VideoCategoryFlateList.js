import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { MyThemeClass } from '../../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../../assets/css/ClassesCss/CategoryStyle';
import FA from 'react-native-vector-icons/FontAwesome';


const { width, height } = Dimensions.get('screen');

function VideoCategoryDataFlateList({ item, themecolor, boxSize }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5}
            style={{
                ...styles.datalistView1,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
            }}
            onPress={() => navigation.navigate('FullVideoContainDetail', { contantUrl:item.image,  })}
        >
            <View style={{ ...styles.innerViewCon1 }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.subhead1, color: themecolor.TXTWHITE }}>
                    {item.name}
                </Text>

            </View>

            <View style={{ ...styles.innerViewCon2 }}>
                <FA name="angle-right" size={25} color={themecolor.TXTWHITE} />
            </View>

        </TouchableOpacity>
  );
}

export function VideoCategoryFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <VideoCategoryDataFlateList item={item} themecolor={themecolor} boxSize={props.boxSize} />
      )}
      // numColumns={2}
      // horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        ...styles.contentContainerStyle
      }}
      scrollEnabled={true}
    />
  );
}
