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

function DiscussionTopicDataFlatList({ item, themecolor, boxSize }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={0.5} 
        onPress={() => navigation.navigate('Discussion', { Id: item.id,Name:item.name})}
            style={{ ...styles.innertopicContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        >

                <View style={{ ...styles.commentCon, }}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt3 }}>
                        {item.topic_name}
                    </Text>

                </View>

                <View style={{ ...styles.commentCon, }}>
                    <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt2 }}>
                        {item.topic_des}
                    </Text>

                </View>

        </TouchableOpacity>
    );
}

export function DiscussionTopicFlateList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <DiscussionTopicDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}
