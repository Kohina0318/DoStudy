import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
    Dimensions,
    Linking
} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/YouTubeClassesCss/YouTubeClassesStyle';

const { width, height } = Dimensions.get('screen');

function YouTubeClassListByIdDataFlatList({ item, themecolor, boxSize, dashTypes }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={0.5}
            style={{ ...styles.classContanier, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
            onPress={() => navigation.navigate('YouTubeVideoPage', { url: item.url })}
        >
            <View style={{ ...styles.classImg }}>
                <Image
                    source={{ uri: item.image }}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={{ ...styles.MT5 }} />

            <View>
                <Text
                    allowFontScaling={false}
                    style={{ color: themecolor.TXTWHITE, ...styles.txt }}>
                    {item.name}
                </Text>
            </View>
            <View style={{ ...styles.lastinnerView, }}>
                <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={{ color: themecolor.TXTGREYS, ...styles.smalltxt }}>
                     {item.views} views
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export function YouTubeClassListByIdFlateList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <YouTubeClassListByIdDataFlatList item={item} themecolor={themecolor} />
            )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}
