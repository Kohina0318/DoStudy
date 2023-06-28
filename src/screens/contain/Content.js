import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, Animated, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/ClassesCss/ContentStyle';
import { getContent } from '../../repository/ClassesRepository/ContentRep';
import { ContentFlateList } from '../../components/shared/FlateLists/ClassesFlateList/ContentFlateList';

import CIcon from 'react-native-vector-icons/MaterialIcons';
import { getADsDatabyAsync } from '../../repository/CommonRepository';
import AdsCarouselFile from '../../components/shared/Carousel/AdsCarouselFile';


const { width, height } = Dimensions.get('screen');

export default function Content(props) {
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

    const scrollY = useRef(new Animated.Value(0)).current;
    const HEADER_MAX_HEIGHT = height * 0.4;
    const HEADER_MIN_HEIGHT = 80;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0.8, 1, 0],
        extrapolate: 'clamp',
    });
    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.9],
        extrapolate: 'clamp',
    });
    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -8],
        extrapolate: 'clamp',
    });
    const styles1 = StyleSheet.create({
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
            height: HEADER_MAX_HEIGHT,
            borderBottomStartRadius: 15, borderBottomEndRadius: 15,
            borderBottomWidth: 1,
            marginBottom: 5,
            display: "flex",
            justifyContent: 'flex-end',
        },
        headerBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: null,
            height: HEADER_MAX_HEIGHT,
            resizeMode: 'cover',
            borderBottomStartRadius: 15, borderBottomEndRadius: 15
        },
        topBar: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: "row",
            justifyItem: "center",
        },

        title: {
            color: 'white',
            fontSize: 20,
            fontWeight: '700',
            alignSelf: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: 15,
            width: "100%",
            textAlign: "center"
        },

        contenttoggle: {
            borderRadius: 30,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999999, marginTop: 40, padding: 7, position: 'absolute', marginLeft: 7
        },
    });


    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [adsdata, setAdsdata] = useState([]);

    useEffect(() => {
        async function temp() {
            try {
                var adsD = await getADsDatabyAsync();
                if (adsD == null || adsD == '' || adsD == undefined) {
                    setAdsdata([])
                } else {
                    setAdsdata(adsD);
                }
            } catch (e) {
                setAdsdata([])
            }
        }
        temp()
    }, [props]);


    const handleContent = async () => {
        try {
            var res = await getContent(props.route.params.Id);
            if (res.status === true) {
                setData(res.data);
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (e) {
            setLoader(false)
            console.log('errrror in..handleContent page-->', e);
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
        handleContent();
    }, []);



    return (


        <SafeAreaView style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR, color: themecolor.TXTWHITE1 }}>

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <Animated.ScrollView
                        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT, marginTop: 10, }}
                        scrollEventThrottle={16} // 
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true },
                        )} showsVerticalScrollIndicator={false}>
                        {data.length > 0 ? (
                            <ContentFlateList data={data} TopicId={props.route.params.TopicId} />
                        ) : (
                            <NoDataMsg title="No Data Found!" />
                        )}

                        <View style={{ ...styles.MT10 }} />
                        <View style={{ marginVertical: 20 }} />
                    </Animated.ScrollView>
                    
                    {adsdata.length > 0 ?
                        <View style={{
                            ...styles.adsContainer,
                        }}>
                            <AdsCarouselFile data={adsdata} />
                        </View>
                        : <></>}
                </>
            )}

            <Animated.View
                style={[styles1.header, { transform: [{ translateY: headerTranslateY }], backgroundColor: themecolor.LOGINTHEMECOLOR1, borderBottomColor: themecolor.BOXBORDERCOLOR1, }]}>
                <Animated.Image
                    style={[
                        styles1.headerBackground,
                        {
                            opacity: imageOpacity,
                            transform: [{ translateY: imageTranslateY }],
                        },
                    ]}
                    source={{ uri: props.route.params.Image }}
                />
                <Text style={{ ...styles1.title, color: themecolor.TXTWHITE, backgroundColor: themecolor.CONTENTHEADEROPACITY }}>{props.route.params.Name}</Text>
            </Animated.View>

            <Animated.View
                style={[
                    styles1.topBar,
                    {
                        transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
                    },
                ]}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ ...styles1.contenttoggle, backgroundColor: themecolor.CONTENTHEADEROPACITY }}
                    onPress={() => handleBackButtonClick()}
                >
                    <CIcon
                        name="keyboard-backspace"
                        size={26}
                        color={themecolor.TXTWHITE}
                    />
                </TouchableOpacity>
            </Animated.View>

        </SafeAreaView>

    );
}

