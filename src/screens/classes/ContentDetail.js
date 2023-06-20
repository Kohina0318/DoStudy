import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { styles } from '../../assets/css/ClassesCss/ContentStyle';
import Header from '../../components/shared/header/Header';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import Tts from 'react-native-tts';
import { getContentDetail } from '../../repository/ClassesRepository/ContentRep';
import IC from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';

const { width } = Dimensions.get('screen');

export default function ContentDetail(props) {
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

    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [description, setDescription] = useState('');
    const [description1, setDescription1] = useState('');
    const [speckerOnStop, setSpeckerOnStop] = useState(0);
    const [stringStopLength, setStringStopLength] = useState(0);
    const [profilData, setProfileData] = useState({});


    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setProfileData(res.data[0])
            }
            else {
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 1000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
        }
    };

    const handleContentDetail = async () => {
        try {
            var res = await getContentDetail(props.route.params.Id)
            if (res.status === true) {
                setData(res.data);
                setDescription(res.data[0].description)
                setDescription1(res.data[0].description)
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (e) {
            setLoader(false)
            console.log('errrror in..handleContentDetail page-->', e);
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    }

    useEffect(() => {
        handleUserData();
        handleContentDetail();
    }, []);

    const handleVoice = async () => {
        Tts.setDefaultRate(0.4);
        Tts.addEventListener('tts-progress', (event) => { setStringStopLength(event.end) });
        Tts.setDefaultLanguage('hin-IND')
        // Tts.setDefaultVoice('en-IN-Wavenet-C')
        if (stringStopLength > 0) {
            Tts.speak(description1);
        }
        else {
            Tts.speak(description);
        }
        setSpeckerOnStop(1)
    }
    const handleStopVoice = async () => {
        Tts.stop();
        var data = description1.slice(stringStopLength);
        setDescription1(data)
        setSpeckerOnStop(0)
    }


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

            <Header title={props.route.params.UnitNo} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <View style={{ ...styles.container, marginTop: 20 }}>

                        <View
                            style={{
                                ...styles.datalistView,
                                backgroundColor: themecolor.BOXBORDERCOLOR,
                                borderColor: themecolor.BOXBORDERCOLOR1,
                                padding: 20
                            }}
                        >
                            <View style={styles.mt5} />

                            <Image
                                source={{ uri: props.route.params.UnitImage }}
                                style={{ width: 300, height: 200, }}
                                resizeMode='contain'
                            />
                            <View style={styles.mt5} />
                            <Text
                                allowFontScaling={false}
                                style={{
                                    ...styles.UnitHeading,
                                    color: themecolor.TXTWHITE,
                                }}>
                                {props.route.params.UnitName}
                            </Text>

                            <View style={styles.mt5} />
                            <View style={styles.mt5} />


                            {profilData.package_type === 0 ? (
                                <Text
                                    selectable={true}
                                    allowFontScaling={false}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    style={{
                                        ...styles.txt,
                                        color: themecolor.TXTWHITE,
                                    }}>{description}</Text>

                            ) : (
                                <>
                                    <Text
                                        selectable={true}
                                        allowFontScaling={false}
                                        style={{
                                            ...styles.txt,
                                            color: themecolor.TXTWHITE,
                                        }}>{description}</Text>


                                    <View style={{ ...styles.m20, width: "100%" }}>
                                        <VideoPlayer
                                            video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                                            videoWidth={1500}
                                            videoHeight={1000}
                                            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                                            autoPlay={false}
                                            defaultMuted={true}
                                            showDuration={true}
                                            disableFullscreen={true}
                                            disableSeek={true}
                                        />
                                    </View>
                                </>
                            )}

                        </View>

                        <View style={{ marginVertical: 77 }} />
                    </View>

                    <View
                        style={{
                            ...styles.touchview,
                        }}>
                        <View style={{ ...styles.mainView, backgroundColor: themecolor.LOGINTHEMECOLOR1, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                            {speckerOnStop === 1 ?
                                <HalfSizeButton
                                    title=""
                                    icon={<IC name="ios-volume-mute-outline" size={35} color={themecolor.TEXTRED} />}
                                    onPress={() => handleStopVoice()}
                                    backgroundColor={'transparent'}
                                    borderColor={'transparent'}
                                />
                                : <HalfSizeButton
                                    title=""
                                    icon={<IC name="ios-volume-high-outline" size={35} color={themecolor.BACKICON} />}
                                    onPress={() => handleVoice()}
                                    backgroundColor={'transparent'}
                                    borderColor={'transparent'}
                                />
                            }
                        </View>

                    </View>

                </>
            )}

        </View>
    );
}
