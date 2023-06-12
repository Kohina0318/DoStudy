import React, { } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
} from 'react-native';

import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/ClassesCss/ContentStyle';
import AD from 'react-native-vector-icons/AntDesign';


function ContentDataFlateList({ item, themecolor }) {

    const navigation = useNavigation();


    return (
        <View
            style={{
                ...styles.datalistView,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
            }}
        >
            <View>
            <Text
              allowFontScaling={false}
              style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR }}
              numberOfLines={2}>
              {item.unit_no}
            </Text>
          </View>
            <View style={{...styles.mt5}}>
                <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={{ ...styles.txt1 ,color: themecolor.TXTWHITE }}>
                    {item.unit_name}
                </Text>
            </View>

            <TouchableOpacity activeOpacity={0.5}  style={{...styles.mt5, ...styles.buttonView,
              backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,}}
              onPress={() => navigation.navigate('ContentDetail', { Id:item.id, UnitNo:item.unit_no })}
            >
            <Text allowFontScaling={false} style={{...styles.buttontxt}}>View <AD name="arrowright" size={15} /> </Text>
            </TouchableOpacity>

        </View>
    );
}

export function ContentFlateList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <ContentDataFlateList item={item} themecolor={themecolor} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}
