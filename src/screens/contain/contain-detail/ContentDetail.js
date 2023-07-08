import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, Image, TouchableOpacity, ScrollView, ImageBackground, StatusBar, useWindowDimensions
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
import HTML from 'react-native-render-html';
import EP from 'react-native-vector-icons/Entypo';


const { width, height } = Dimensions.get('screen');

export default function ContentDetail(props) {

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
    const [data, setData] = useState([]);
    const [description, setDescription] = useState([]);
    const [contantUrl, setContantUrl] = useState("");
    const [speckerOnStop, setSpeckerOnStop] = useState(0);
    const [packageType, setPackageType] = useState(0);
    const [packageExpiry, setPackageExpiry] = useState("");

    let yourDate = new Date()
    var TodayDate = yourDate.toISOString().split('T')[0]


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


    const [activeIndex, setActiveIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');

    const activeIndexRef = useRef(activeIndex);
    const activeDescriptionRef = useRef(description);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);


    useEffect(() => {
        activeDescriptionRef.current = description;
    }, [description]);

    useEffect(() => {
        Tts.addEventListener('tts-finish', handleTTSFinish);

        return () => {
            Tts.removeEventListener('tts-finish', handleTTSFinish);
        };
    }, []);

    const fetchAndSetVoice = async () => {
        try {
            const voices = await Tts.voices();
            //   console.log('Tts.voices..............',voices); 
            //   const desiredVoice = voices.find(voice => voice.language === 'hi-IN');
            //   const desiredVoice = voices.find(voice => voice.language === 'hi-IN' && voice.id === 'hi-IN-language');
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
            // Tts.setDefaultRate(0.3);
            // Tts.setDefaultPitch(1.0);
            Tts.setDefaultLanguage('hi-IN')
            Tts.setDefaultVoice('"com.apple.ttsbundle.Lekha-compact')
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
        if (index >= 0 && index < description.length) {
            if (index >= 0 && index < description.length) {
                Tts.speak(description[index].replace(/<[^>]+>/g, ''));
            }
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
                        <View style={{ ...styles.container, marginTop: 5 }}>

                            <View style={{ ...styles.mtt5 }} />

                            <TouchableOpacity activeOpacity={0.5} style={{ ...styles.buttonViewPDF, }} onPress={() => navigation.navigate('FullPdfContainDetail', { contantUrl: contantUrl, UnitNo: props.route.params.UnitNo })}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        ...styles.head,
                                        color: themecolor.ADDTOCARTBUTTONCOLOR,
                                    }}>View in PDF <EP name="chevron-right" size={16} color={themecolor.ADDTOCARTBUTTONCOLOR} /></Text>
                            </TouchableOpacity>

                            <View style={{ ...styles.mtt5 }} />

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
                                                <HTML
                                                    contentWidth={contentWidth}
                                                    source={{ html: description[0] }}
                                                    enableExperimentalBRCollapsing={true}
                                                    enableExperimentalGhostLinesPrevention={true}
                                                    defaultViewProps={{ width: width * 0.82 }}
                                                    tagsStyles={{
                                                        p: {
                                                            fontSize: 16,
                                                            color: themecolor.TXTWHITE, 
                                                            textAlign: 'left',
                                                            fontWeight: 'normal',
                                                            height: 'auto',
                                                            width: "100%",
                                                        },
                                                    }}
                                                />
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

                                            {description.map((html, index) => (
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

                                            
                                        </>
                                ) : (
                                    packageExpiry ?
                                        TodayDate >= packageExpiry ?
                                            <>
                                                <View style={{ alignContent: "center", alignSelf: "center", alignItems: 'center' }}>
                                                    <HTML
                                                        contentWidth={contentWidth}
                                                        source={{ html: description[0] }}
                                                        enableExperimentalBRCollapsing={true}
                                                        enableExperimentalGhostLinesPrevention={true}
                                                        defaultViewProps={{ width: width * 0.82 }}
                                                        tagsStyles={{
                                                            p: {
                                                                fontSize: 16,
                                                                color: themecolor.TXTWHITE,
                                                                textAlign: 'left',
                                                                fontWeight: 'normal',
                                                                height: 'auto',
                                                                width: "100%",
                                                            },
                                                        }}
                                                    />
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

                                                {description.map((html, index) => (
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
                                            </>
                                        :
                                        <>
                                            <View style={{ alignContent: "center", alignSelf: "center", alignItems: 'center' }}>
                                                <HTML
                                                    contentWidth={contentWidth}
                                                    source={{ html: description[0] }}
                                                    enableExperimentalBRCollapsing={true}
                                                    enableExperimentalGhostLinesPrevention={true}
                                                    defaultViewProps={{ width: width * 0.82 }}
                                                    tagsStyles={{
                                                        p: {
                                                            fontSize: 16,
                                                            color: themecolor.TXTWHITE,
                                                            textAlign: 'left',
                                                            fontWeight: 'normal',
                                                            height: 'auto',
                                                            width: "100%",
                                                        },
                                                    }}
                                                />
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
                                packageExpiry ?
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

                    )

                        :

                        packageExpiry ?
                            TodayDate >= packageExpiry ?
                                <></>
                                :
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

                            :
                            <></>
                    }



                </>
            )
            }

        </View >
    );
}
