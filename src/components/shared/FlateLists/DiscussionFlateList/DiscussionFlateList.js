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
import { styles } from '../../../../assets/css/DiscussionCss/DiscussionStyle';

const { width, height } = Dimensions.get('screen');

function DiscussionDataFlatList({ item, themecolor, boxSize }) {
    const navigation = useNavigation();

    return (
        <View
            style={{ ...styles.innerContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        >
            <View style={{ ...styles.innercont1 }}>

                <View style={{ ...styles.bottomProfile }}>
                    <Image
                        source={{ uri: item.user_profile_pic }}
                        resizeMode="contain"
                        style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                </View>
                <View style={{...styles.namecontainer}}>
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt }}>
                        {item.user_name}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ color: themecolor.TXTGREYS, ...styles.txt1 }}>
                        {item.time}
                    </Text>
                </View>

            </View>

            <View style={{ ...styles.innercont1 }}>
            <View style={{...styles.commentCon,}}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt2 }}>
                        {item.comment}
                    </Text>
                    
                </View>
            </View>


            <View style={{ ...styles.MT10 }} />


        </View>
    );
}

export function DiscussionFlateList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <DiscussionDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}
