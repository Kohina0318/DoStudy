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
import moment from 'moment';

const { width, height } = Dimensions.get('screen');

function DiscussionTopicDataFlatList({ item, themecolor, boxSize }) {
    const navigation = useNavigation();

    var NewDate = moment(item.created_time).format('MM-DD-YYYY hh:mm a') ;
  
    return (
        <TouchableOpacity activeOpacity={0.5}
            onPress={() => navigation.navigate('Discussion', { Id: item.id, TopicData: item })}
            style={{ ...styles.innertopicContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        >

            <View style={{ ...styles.commentCon1, }}>

                <View style={{ ...styles.TmeCon }}>
                    <View style={{ width: "30%", }}>
                        <Text
                            allowFontScaling={false}
                            style={{ color: themecolor.TXTWHITE, ...styles.smalltxt }}>
                            Discussion Topic : {item.id}
                        </Text>
                    </View>
                    <View style={{ ...styles.tmeConinnerLast }}>
                        <Text
                            allowFontScaling={false}
                            style={{ color: themecolor.TXTGREYS, ...styles.smalltxt }}>
                            {NewDate}
                        </Text>
                    </View>
                </View>

                <View style={{ margin: 5, width: "96%" }}>

                    <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt3 }}>
                        {item.topic_name}
                    </Text>

                    <View style={styles.MT5} />

                    <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt2 }}>
                        {item.topic_description}
                    </Text>

                </View>

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
