import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, Image, TouchableOpacity, ScrollView, ImageBackground, StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import LoadingFullScreen from '../../../components/shared/Loader/LoadingFullScreen';
import { styles } from '../../../assets/css/ClassesCss/ContentStyle';
import Header from '../../../components/shared/header/Header';
import HalfSizeButton from '../../../components/shared/button/halfSizeButton';
import Tts from 'react-native-tts';
import { getContentDetail } from '../../../repository/ClassesRepository/ContentRep';
import IC from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import { getProfileInfo } from '../../../repository/ProfileRepository/EditProfileRepo';
import LinearGradient from "react-native-linear-gradient";
import FA from 'react-native-vector-icons/Feather';
import Ii from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';

const { width, height } = Dimensions.get('screen');

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
    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [description, setDescription] = useState('');
    const [description1, setDescription1] = useState('');
    const [contantUrl, setContantUrl] = useState("");
    const [speckerOnStop, setSpeckerOnStop] = useState(0);
    const [stringStopLength, setStringStopLength] = useState(0);
    const [packageType, setPackageType] = useState(0);
    const [packageExpiry, setPackageExpiry] = useState("");

    let yourDate = new Date()
    var TodayDate = yourDate.toISOString().split('T')[0]

    var contantUrlType = "";

    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setPackageType(res.data[0].package_type)
                setPackageExpiry(res.data[0].package_valid_date)
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
                setContantUrl(res.data[0].file_url)
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
        Tts.addEventListener('tts-progress', (event) => { setStringStopLength(event.end) });
        Tts.setDefaultLanguage('hi-IN')
        Tts.setDefaultVoice('hi-in-x-hid-local')
        Tts.setDefaultRate(0.3);
        Tts.setDefaultPitch(1.0);
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


    if (contantUrl != "") {
        contantUrlType = contantUrl.split('.').pop()
    }

    const [activeIndex, setActiveIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');

    var textData = ''

    if (description != "") {
        textData = description.split('.');
    }

    useEffect(() => {
        Tts.addEventListener('tts-finish', handleTTSFinish);

        return () => {
            Tts.removeEventListener('tts-finish', handleTTSFinish);
        };
    }, []);

    const handleTTSFinish = () => {
        if (activeIndex !== null && activeIndex < textData.length - 1) {
            // Move to the next text if available
            handlePlay(activeIndex + 1);
        } else {
            // All texts have been spoken or paused
            setIsPlaying(false);
            setActiveIndex(null);
        }
    };


    const handleTextClick = (index) => {
        setActiveIndex(index);
        setRecognizedText('');
        if (index >= 0 && index < textData.length) {
            Tts.stop();
            Tts.setDefaultLanguage('hi-IN')
            Tts.setDefaultVoice('hi-in-x-hid-local')
            Tts.setDefaultRate(0.3);
            Tts.setDefaultPitch(1.0);

            Tts.speak(textData[index]);
        }
    };



    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title={props.route.params.UnitNo} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ ...styles.container, marginTop: 5 }}>

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
                                    style={{ ...styles.widthImg }}
                                    resizeMode='contain'
                                />
                                <View style={styles.mt5} />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        ...styles.UnitHeading,
                                        color: themecolor.TXTWHITE, width: "80%"
                                    }}>
                                    {props.route.params.UnitName}
                                </Text>

                                <View style={styles.mt15} />


                                {packageType == 1 ? (
                                    TodayDate >= packageExpiry ?
                                        <>
                                            <View style={{ alignContent: "center", alignSelf: "center", alignItems: 'center' }}>
                                                <Text
                                                    selectable={true}
                                                    allowFontScaling={false}
                                                    numberOfLines={3}
                                                    ellipsizeMode='tail'
                                                    style={{
                                                        ...styles.txt,
                                                        color: themecolor.TXTWHITE, letterSpacing: 1
                                                    }}>{description}</Text>
                                                <View style={styles.mt5} />
                                                <Text
                                                    selectable={true}
                                                    allowFontScaling={false}
                                                    style={{
                                                        ...styles.txt1,
                                                        color: themecolor.TXTWHITE,
                                                    }}>.   .    .</Text>
                                                <LinearGradient
                                                    start={{ x: 0.0, y: 0.0 }}
                                                    end={{ x: 0.0, y: 1.0 }}
                                                    locations={[0.0, 1.0]}
                                                    colors={['#ffffff40', '#fffffff5']}
                                                    useViewFrame={false}
                                                    style={styles.gradient}
                                                />

                                            </View>
                                            <View style={styles.mt15} />
                                        </>
                                        :
                                        <>
                                            {/* <Text
                                                selectable={true}
                                                allowFontScaling={false}
                                                style={{
                                                    ...styles.txt,
                                                    color: themecolor.TXTWHITE, letterSpacing: 1
                                                }}>{description}</Text> */}

                                            {description != "" ?
                                                    textData.map((text, index) => (
                                                        <TouchableOpacity key={index} onPress={() => handleTextClick(index)} >
                                                            <Text
                                                                style={{
                                                                    ...styles.txt,
                                                                    letterSpacing: 1,
                                                                    fontWeight: activeIndex === index ? 'bold' : 'normal',
                                                                    color: activeIndex === index ? themecolor.ADDTOCARTBUTTONCOLOR : themecolor.TXTWHITE,
                                                                }}
                                                            >
                                                                {text}.
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))
                                                : <></>}

                                            <View style={styles.mt15} />
                                            <View style={styles.mt15} />
                                            <View style={{ alignContent: "center", alignSelf: "center", alignItems: 'center', display: "flex" }}>
                                                {contantUrlType === 'mp4' ?
                                                    <>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('FullVideoContainDetail', { contantUrl: contantUrl })} style={{ ...styles.widthVideoBlackPadding, }}>
                                                            <ImageBackground source={{ uri: props.route.params.UnitImage }} resizeMode='contain' style={{ ...styles.widthVideo1 }}>
                                                                <View style={{ ...styles.VideoPlay }}>
                                                                    <Ii name="play" size={25} color={themecolor.TXTWHITE1} />
                                                                </View>
                                                            </ImageBackground>
                                                        </TouchableOpacity>
                                                    </>
                                                    :
                                                    contantUrlType === 'pdf' ?
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('FullPdfContainDetail', { contantUrl: contantUrl, UnitNo: props.route.params.UnitNo })}>
                                                            <Image
                                                                source={require('../../../assets/images/pdf.png')}
                                                                style={{ ...styles.pdfImg }}
                                                                resizeMode='contain'
                                                            />
                                                            <Text
                                                                allowFontScaling={false}
                                                                style={{
                                                                    ...styles.txt1, textAlign: 'center',
                                                                    color: themecolor.ADDTOCARTBUTTONCOLOR,
                                                                }}>View PDF</Text>

                                                            <View style={styles.mt15} />
                                                        </TouchableOpacity>

                                                        :
                                                        <></>
                                                }
                                            </View>

                                        </>
                                ) : (
                                    <>
                                        <View style={{ alignContent: "center", alignSelf: "center", alignItems: 'center' }}>
                                            <Text
                                                selectable={true}
                                                allowFontScaling={false}
                                                numberOfLines={3}
                                                ellipsizeMode='tail'
                                                style={{
                                                    ...styles.txt,
                                                    color: themecolor.TXTWHITE,
                                                }}>{description}</Text>
                                            <View style={styles.mt5} />
                                            <Text
                                                selectable={true}
                                                allowFontScaling={false}
                                                style={{
                                                    ...styles.txt1,
                                                    color: themecolor.TXTWHITE,
                                                }}>.   .    .</Text>
                                            <LinearGradient
                                                start={{ x: 0.0, y: 0.0 }}
                                                end={{ x: 0.0, y: 1.0 }}
                                                locations={[0.0, 1.0]}
                                                colors={['#ffffff40', '#fffffff5']}
                                                useViewFrame={false}
                                                style={styles.gradient}
                                            />

                                        </View>
                                        <View style={styles.mt15} />
                                    </>
                                )}

                            </View>


                            {packageType == 1 ? (
                                TodayDate >= packageExpiry ?
                                    <View style={styles.m20} >
                                        <View style={styles.mt15} />
                                        <TouchableOpacity activeOpacity={0.5}
                                            onPress={() => navigation.navigate('MemberShip')}
                                            style={{ alignContent: "center", alignSelf: "center", alignItems: 'center' }}>
                                            <FA name="lock" color={themecolor.BACKICON} size={30} />
                                            <View style={styles.mt15} />
                                            <Text
                                                selectable={true}
                                                allowFontScaling={false}
                                                style={{
                                                    ...styles.txt1,
                                                    color: themecolor.BACKICON,

                                                }}>continue to purchase MemberShip</Text>
                                        </TouchableOpacity>

                                    </View>
                                    :
                                    <></>
                            )
                                :
                                <View style={styles.m20}>
                                    <View style={styles.mt15} />
                                    <TouchableOpacity activeOpacity={0.5}
                                        onPress={() => navigation.navigate('MemberShip')}
                                        style={{ alignContent: "center", alignSelf: "center", alignItems: 'center' }}>
                                        <FA name="lock" color={themecolor.BACKICON} size={30} />
                                        <View style={styles.mt15} />
                                        <Text
                                            selectable={true}
                                            allowFontScaling={false}
                                            style={{
                                                ...styles.txt1,
                                                color: themecolor.BACKICON,
                                                top: 5
                                            }}>continue to purchase MemberShip</Text>
                                    </TouchableOpacity>

                                </View>
                            }

                            <View style={{ marginVertical: 20 }} />
                        </View>
                    </ScrollView>

                    {packageType == 1 ? (
                        TodayDate >= packageExpiry ?
                            <></>
                            :
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

                    )
                        :
                        <></>
                    }



                </>
            )
            }

        </View >
    );
}
