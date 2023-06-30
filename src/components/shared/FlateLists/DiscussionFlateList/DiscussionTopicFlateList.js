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
import FA from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('screen');

function DiscussionTopicDataFlatList({ item, themecolor, boxSize }) {
    const navigation = useNavigation();

    var NewDate = moment(item.created_time).format('MM-DD-YYYY hh:mm a');

    var contantUrl = ""
    if (item.media != null) {
        contantUrl = item.media;
    }
    var contantUrlType = "";
    if (contantUrl != "") {
        contantUrlType = contantUrl.split('.').pop()
    }


    return (
        <View
            style={{ ...styles.innertopicContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        >

            <View style={{ ...styles.commentCon1, }}>

                <View style={{ ...styles.TmeCon }}>
                    <View style={{ width: "60%", }}>
                        <View style={{ ...styles.innercont1 }}>

                            <View style={{ ...styles.bottomProfile }}>
                                <Image
                                    source={{ uri: item.user_profile_pic }}
                                    resizeMode="contain"
                                    style={{ width: 40, height: 40, borderRadius: 50 }}
                                />
                            </View>
                            <View style={{ ...styles.namecontainer }}>
                                <Text
                                    allowFontScaling={false}
                                    numberOfLines={1}
                                    style={{ color: themecolor.TXTWHITE, ...styles.txt }}>
                                    {item.user_name}
                                </Text>
                            </View>
                        </View>

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
                <View style={styles.MT10} />
                <View style={styles.MT10} />

                {contantUrl != "" ?
                    <View style={{ ...styles.mediaView }}>
                        {contantUrlType == 'mp4' ?
                            <Video source={{ uri: item.media }}
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                onBuffer={this.onBuffer}
                                onError={this.videoError}
                                autoplay={false}
                                controls={true}
                                resizeMode="contain"
                                style={{ ...styles.imgEdit, backgroundColor: "#000" }} />
                            :
                            <Image
                                source={{ uri: item.media }}
                                style={{ ...styles.imgEdit }}
                            />
                        }
                    </View>
                    : <></>}

                <View style={styles.MT10} />
                <View style={styles.MT10} />



                <View style={{ ...styles.TmeCon }}>
                    <View style={{ width: "10%", }}>

                    </View>
                    <View style={{ ...styles.tmeConinnerLast1, flexDirection: "row" }}>
                        <Text
                            allowFontScaling={false}
                            style={{ color: themecolor.TEXTGREEN, ...styles.smalltxt2 }}>
                            <FA name="eye" size={15} color={themecolor.TEXTGREEN} />{" "}
                            {item.View} View
                        </Text>

                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => navigation.navigate('Discussion', { Id: item.topic_name, TopicData: item })}
                            style={{ left: 20 }}>
                            <Text
                                allowFontScaling={false}
                                style={{ color: themecolor.ADDTOCARTBUTTONCOLOR, ...styles.smalltxt2 }}>
                                <FA name="commenting-o" size={15} color={themecolor.ADDTOCARTBUTTONCOLOR} />{" "}
                                Comment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
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
