import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar, ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/ClassesCss/ClassesStyle';
import { getClasses } from '../../repository/ClassesRepository/ClasessRep';
import { getADsDatabyAsync } from '../../repository/CommonRepository';
import AdsCarouselFile from '../../components/shared/Carousel/AdsCarouselFile';
import { PreparationFlatList } from '../../components/shared/FlateLists/PreparationFlatList/PreparationFlatList';


const { width } = Dimensions.get('screen');

export default function Preparation(props) {
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


    const handleClasses = async () => {
        try {
            var res = await getClasses("Preparation");
            if (res.status === true) {
                setData(res.data);
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (e) {
            setLoader(false)
            console.log('errrror in..handleClasses page-->', e);
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
        handleClasses()
    }, [])

   
    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Preparation" backIcon={true}
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

                            {data.length > 0 ? (
                                <PreparationFlatList data={data} />
                            ) : (
                                <NoDataMsg title="No Data Found!" />
                            )}

                            <View style={{ ...styles.MT10 }} />

                        </View>
                    </ScrollView>

                    {adsdata.length > 0 ?
                        <View style={{
                            ...styles.adsContainer,
                        }}>
                            <AdsCarouselFile data={adsdata} />
                        </View>
                        : <></>}

                </>
            )}
        </View>
    );
}
