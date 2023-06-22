import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/ClassesCss/ContentStyle';

import VideoPlayerControl from 'react-native-video-controls';

const { width, height } = Dimensions.get('screen');

export default function FullVideoContainDetail(props) {
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const toast = useToast();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <View style={{ ...styles.fullVideoContain }}>

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={'light-content'}
            />

            <View style={{ ...styles.fullVideoInnerCon }} >
                <VideoPlayerControl source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}}
                    ref={ref =>
                        this.player = ref
                    }
                    // onEnterFullscreen={() => alert('hi')}
                    onBack={() => props.navigation.goBack()}
                    style={{ ...styles.fulllVideoView , position: 'absolute',}}
                    controls={true}
                    paused={false}
                    seekColor={"#50A5FA"}
                    fullscreen={true}
                    resizeMode='contain'
                    showOnStart={false}
                    tapAnywhereToPause={true}
                    fullscreenAutorotate={true}
                />
            </View>

        </View>
    );
}
