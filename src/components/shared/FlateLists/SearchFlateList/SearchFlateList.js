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

function SearchDataFlatList({ item, themecolor, }) {
  const navigation = useNavigation();

  var navigate = "";
  
  if(item.category_id == 6){
    navigate = "VideoCategory"
  }else if(item.category_id == 3 || item.category_id ==4 ||  item.category_id ==8 ){
    navigate = "QuestionandExamCategory"
  }
  else{
    navigate = "Content"
  }



  return (
    <TouchableOpacity activeOpacity={0.5}
      style={{...styles.subContanier,backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1,}}
    onPress={() => item.category_id == 9 ? 
      navigation.navigate('YouTubeClassesListByID', { Id: item.id, Name: item.name, })
      :
      item.category_id == 3 || item.category_id ==4 ||  item.category_id ==8 ||item.category_id == 6 ? 
       navigation.navigate(navigate, {Id:item.category_id ,subjectId:item.subject_id, Name:item.name})
       :
       navigation.navigate('Content', {Id: item.id,Name:item.name,Image:item.image ,TopicId:item.category_id ,})
      
    }
    >
      <Image
        source={{ uri: item.image }}
        style={{...styles.subImg}}
      />
      <View style={{...styles.subConView,backgroundColor: themecolor.CONTENTHEADEROPACITY}}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={{color:themecolor.DARKBLUECOLOR,...styles.subhead}}>
        {item.name}
      </Text>
      </View>
    </TouchableOpacity>
  );
}

export function SearchFlateList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <SearchDataFlatList item={item} themecolor={themecolor} />
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
