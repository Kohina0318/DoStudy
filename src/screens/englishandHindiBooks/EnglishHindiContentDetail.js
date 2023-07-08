import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar, ScrollView, useWindowDimensions, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/EnglishandHindiBooksCss/EnglishandHindiStyle'
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import IC from 'react-native-vector-icons/Ionicons';
import EP from 'react-native-vector-icons/Entypo';
import Tts from 'react-native-tts';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { getHindiBooksDescription } from '../../repository/EnglishandHindiBooksRepository/EnglishandHindiBooksRep';

const { width, height } = Dimensions.get('screen');

export default function EnglishHindiContentDetail(props) {

    const { contentWidth } = useWindowDimensions();


    function handleBackButtonClick() {
        Tts.stop();
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
    const [htmlData, setHtmlData] = useState([]);
    const [pdf, setPdf] = useState('');
    const [speckerOnStop, setSpeckerOnStop] = useState(0);

    const [activeIndex, setActiveIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');

    const handleBooksDescription = async () => {
        try {
            var res = await getHindiBooksDescription(props.route.params.Book, props.route.params.ID);
            console.log("data.......",res.data)
            if (res.status === true) {
                setHtmlData(res.data[0].description);
                setPdf(res.data[0].pdf_url)
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (e) {
            setLoader(false)
            console.log('errrror in..handleBooksDescription page-->', e);
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    };

    useEffect(() => {
        handleBooksDescription()
    }, [])


    const activeIndexRef = useRef(activeIndex);
    const activeDescriptionRef = useRef(htmlData);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        activeDescriptionRef.current = htmlData;
    }, [htmlData]);

    useEffect(() => {
        Tts.addEventListener('tts-finish', handleTTSFinish);

        return () => {
            Tts.removeEventListener('tts-finish', handleTTSFinish);
        };
    }, []);


    const fetchAndSetVoice = async () => {
        try {
            const voices = await Tts.voices();
            const desiredVoice = voices.find(voice => voice.id === 'hi-IN-language');
            if (desiredVoice) {
                Tts.setDefaultLanguage(desiredVoice.language)
                Tts.setDefaultVoice(desiredVoice.id);
                // Tts.setDefaultRate(0.3);
                // Tts.setDefaultPitch(1.0);
            } else {
                // Tts.setDefaultRate(0.3);
                // Tts.setDefaultPitch(1.0);
                Tts.setDefaultLanguage('hi-IN')
                Tts.setDefaultVoice('"com.apple.ttsbundle.Lekha-compact')
                console.warn('Desired voice not found');
            }
          
        } catch (error) {
            console.error('Error fetching available voices:', error);
        }
    };

    useEffect(() => {
        fetchAndSetVoice()
    }, [])

    const handlePlay = (index) => {
        const activeDescription = activeDescriptionRef.current;
        Tts.stop();
        setActiveIndex(index);
        setIsPlaying(true);
        setRecognizedText('');
        Tts.speak(activeDescription[index].replace(/<[^>]+>/g, ''));
        setSpeckerOnStop(1)
    };

    const handleTTSFinish = () => {
        const currentActiveIndex = activeIndexRef.current;
        const activeDescription = activeDescriptionRef.current;
        if (currentActiveIndex !== -1 && currentActiveIndex < activeDescription.length - 1) {
            var addData = currentActiveIndex + 1
            handlePlay(addData);
        } else {
            setIsPlaying(false);
            setActiveIndex(-1);
            setSpeckerOnStop(0)
        }
    };

    const handleStop = () => {
        Tts.stop();
        setIsPlaying(false);
        setActiveIndex(-1);
        setSpeckerOnStop(0)
    };

    const handleTextClick = (index) => {
        Tts.stop();
        setActiveIndex(index);
        setRecognizedText('');
        if (index >= 0 && index < htmlData.length) {
            Tts.speak(htmlData[index].replace(/<[^>]+>/g, ''));
            setSpeckerOnStop(1)
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
                        <View
                            style={{
                                ...styles.container,
                            }}>

                            <View style={{ ...styles.MT5 }} />

                            {pdf != "" ?
                                <TouchableOpacity activeOpacity={0.5} style={{ ...styles.buttonViewPDF, }} onPress={() => navigation.navigate('FullPdfContainDetail', { contantUrl: pdf, UnitNo: props.route.params.UnitNo })}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            ...styles.head,
                                            color: themecolor.ADDTOCARTBUTTONCOLOR,
                                        }}>View in PDF <EP name="chevron-right" size={16} color={themecolor.ADDTOCARTBUTTONCOLOR} /></Text>
                                </TouchableOpacity>
                                : <></>}

                            {htmlData.length > 0 ?
                                <View
                                    style={{
                                        ...styles.datalistView,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        padding: 20
                                    }}
                                >
                                    {htmlData.map((html, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
                                            <HTML
                                                contentWidth={contentWidth}
                                                source={{ html: html }}
                                                enableExperimentalBRCollapsing={true}
                                                enableExperimentalGhostLinesPrevention={true}
                                                defaultViewProps={{ width: width * 0.82 }}
                                                tagsStyles={{
                                                    p: {
                                                        fontSize: 16,
                                                        color: activeIndex === index ? themecolor.ADDTOCARTBUTTONCOLOR : themecolor.TXTWHITE,
                                                        textAlign: 'left',
                                                        fontWeight: activeIndex === index ? 'bold' : 'normal',
                                                        height: 'auto',
                                                        width: "100%",
                                                    },
                                                    h2: {
                                                        fontSize: 16,
                                                        color: activeIndex === index ? themecolor.ADDTOCARTBUTTONCOLOR : themecolor.TXTWHITE,
                                                        textAlign: 'left',
                                                        fontWeight: activeIndex === index ? 'bold' : 'normal',
                                                        height: 'auto',
                                                        width: "100%",
                                                    },
                                                    ul: {
                                                        fontSize: 16,
                                                        color: themecolor.TXTWHITE,
                                                        height: 'auto',
                                                        width: "100%",
                                                    },
                                                    li: {
                                                        fontSize: 16,
                                                        color: themecolor.TXTWHITE,
                                                        textAlign: 'left',
                                                        height: 'auto',
                                                        width: "100%",
                                                    },
                                                    span: {

                                                        height: 'auto',
                                                        width: "100%",
                                                    },
                                                    body: {
                                                        height: 'auto',
                                                        width: "100%",
                                                    },
                                                }}
                                            />
                                        </TouchableOpacity>
                                    ))}

                                </View>
                                : <></>}


                            <View style={{ ...styles.MT10 }} />

                        </View>
                    </ScrollView>


                    <View
                        style={{
                            ...styles.touchview,
                        }}>
                        <View style={{ ...styles.mainView, backgroundColor: themecolor.LOGINTHEMECOLOR1, borderColor: themecolor.BOXBORDERCOLOR1, elevation: 3 }}>
                            {speckerOnStop === 1 ?
                                <HalfSizeButton
                                    title=""
                                    icon={<IC name="ios-volume-mute-outline" size={35} color={themecolor.TEXTRED} />}
                                    onPress={() => handleStop()}
                                    backgroundColor={'transparent'}
                                    borderColor={'transparent'}
                                />
                                : <HalfSizeButton
                                    title=""
                                    icon={<IC name="ios-volume-high-outline" size={35} color={themecolor.BACKICON} />}
                                    onPress={() => handlePlay(0)}
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
