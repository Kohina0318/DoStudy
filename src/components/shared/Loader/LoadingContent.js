import { View, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import {styles} from "../../../assets/css/LoadingCss/LoadingStyle"

export default function LoadingContent(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <View style={{...styles.loadingContentView }}>
            <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTGREYS }}>
                Hang on, loading content
            </Text>
            <ActivityIndicator color={themecolor.BACKICON} style={{ ...styles.mrg5 }} />
        </View>
    );
}
