import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, ScrollView, StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/MemberShipCss/MemberShipStyle';
import { getActivePackage, getPackage } from '../../repository/MemberShipRepository/MemberShipRep';
import { ActiveMemberShip, MemberFlatList } from '../../components/shared/FlateLists/MemberFlateList/MemberFlatList';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';
import { getSettingDetails } from '../../repository/SettingRepository/SettingRepo';
import { getADsDatabyAsync } from '../../repository/CommonRepository';
import AdsCarouselFile from '../../components/shared/Carousel/AdsCarouselFile';


const { width } = Dimensions.get('screen');

export default function MemberShip(props) {
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
    const [activePackageData, setActivePackageData] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [appLogo, setAppLogo] = useState('');
    const [appName, setAppName] = useState('');
    const [accesskey, setAccesskey] = useState('');

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



    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setName(res.data[0].name)
                setEmail(res.data[0].email)
                setPhone(res.data[0].phone)
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
            console.log("Error..in Profile...", e)
        }
    };

    const handleSettingDetails = async () => {
        try {
            var res = await getSettingDetails();
            if (res.status === true) {
                setAppLogo(res.data.logo.url)
                setAppName(res.data.logo.app_name)
                setAccesskey(res.data.razorpay.key)
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
            console.log("Error..in  getSettingDetails...", e)
        }
    };

    const handlActivePackage = async () => {
        try {
            var res = await getActivePackage();
            if (res.status === true) {
                setActivePackageData(res.data);
            }
        } catch (e) {
            console.log('errrror in..handlActivePackage page-->', e);
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    };


    const handlPackages = async () => {
        try {
            var res = await getPackage();
            if (res.status === true) {
                setData(res.data);
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (e) {
            setLoader(false)
            console.log('errrror in..handlPackages page-->', e);
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
        handleUserData();
        handleSettingDetails()
        handlActivePackage()
        handlPackages()
    }, [])



    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Membership" backIcon={true}
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
                                <>
                                    {activePackageData.length > 0 ?
                                        <ActiveMemberShip data={activePackageData[0]} />
                                        : <></>
                                    }

                                    <View style={styles.margT} />

                                    <MemberFlatList data={data} userName={name} userEmail={email} userPhoneNo={phone} appLogo={appLogo} appName={appName} accesskey={accesskey} setLoader={setLoader} />
                                    <View style={styles.margT} />
                                </>
                            ) : (
                                <NoDataMsg title="No Data Found!" />
                            )}

                            <View style={{ ...styles.MT10 }} />

                        </View>
                        <View style={{ marginVertical: 10 }} />
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
