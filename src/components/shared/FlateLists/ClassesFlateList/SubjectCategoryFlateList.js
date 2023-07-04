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

function SubjectCategoryDataFlateList({ item, themecolor,subjectId }) {
  const navigation = useNavigation();

  var navigate = "";
  if(item.id === 6){
    navigate = "VideoCategory"
  }else if(item.id === 3 || item.id === 4 ||  item.id === 8 ){
    navigate = "QuestionandExamCategory"
  }
  else if(item.id === 9 ){
    navigate = "YouTubeClasses"
  }
  else{
    navigate = "BookCategory"
  }

  return (
      <TouchableOpacity activeOpacity={0.5} 
        style={{ ...styles.classContanier, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        onPress={() => navigation.navigate(navigate, {Id:item.id,subjectId:subjectId, Name:item.category_name})}
      >
        <View style={{ ...styles.classImg }}>
          <Image
            source={{uri:item.image}}
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
          {item.category_name}
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
        <SubjectCategoryDataFlateList item={item} themecolor={themecolor} boxSize={props.boxSize}  subjectId={props.subjectId}/>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
