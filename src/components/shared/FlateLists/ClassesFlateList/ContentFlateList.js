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
import FA from 'react-native-vector-icons/FontAwesome';


function ContentDataFlateList({ item, themecolor }) {

    const navigation = useNavigation();


    return (
        <TouchableOpacity activeOpacity={0.5}
            style={{
                ...styles.datalistView1,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
            }}
            onPress={() => navigation.navigate('ContentDetail', { Id:item.id, UnitNo:item.unit_no,UnitName:item.unit_name,UnitImage:item.image })}
        >
            <View style={{ ...styles.innerViewCon1 }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR }}
                    numberOfLines={2}>
                    {item.unit_no}
                </Text>
                <View style={{ ...styles.mtt5 }} />
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                    {item.unit_name}
                </Text>

            </View>

            <View style={{ ...styles.innerViewCon2 }}>
                <FA name="angle-right" size={25} color={themecolor.TXTWHITE} />
            </View>

        </TouchableOpacity>
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
