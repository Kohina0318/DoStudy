import React, { useState, useRef ,useEffect} from 'react';
import {
    View, Text, BackHandler,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/AuthCss/SignInStyle';
import { useNavigation } from '@react-navigation/native';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { postVerifyOtp } from '../../repository/AuthRepository/SignUpRepository';
import { StoreDatatoAsync } from '../../repository/AsyncStorageServices';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { getAppLogoAsync } from '../../repository/CommonRepository';

export default function VerifyOtp(props) {

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
    var navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(false);
    const [appLogoAsync, setAppLogoAsync] = useState('');

    const [otp, setOtp] = useState("");
    const [showmodal, setShowmodal] = useState(false);

    useEffect(() => {
        async function temp() {
            try {
                var userData = await getAppLogoAsync();
                if (userData == null || userData == '' || userData == undefined) {
                    setAppLogoAsync('')
                    setLoader(false)
                } else {

                    setAppLogoAsync(userData);
                    setLoader(false)
                }
            } catch (e) {
                setLoader(false)
                setAppLogoAsync('')
            }
        }
        temp()
    }, [props]);


    const handleSignIn = async () => {
        setLoader(true)
        if (otp == '') {
            setLoader(false)
            toast.show('OTP is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else {
            try {
                let formdata = new FormData()
                formdata.append('phone', props.route.params.mobileNo)
                formdata.append('otp', otp)
                formdata.append('password', props.route.params.password)

                const res = await postVerifyOtp(formdata);
                if (res.status == true) {
                    await StoreDatatoAsync('@UserData', JSON.stringify(res.data));
                    await StoreDatatoAsync('@Token', JSON.stringify(res.data.user.jwt_token));
                    setLoader(false)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    });
                    toast.show("Sign Up Successfully.", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                    

                    // setShowmodal(!showmodal)
                }
                else {
                    setLoader(false)
                    toast.show(res.message, {
                        type: 'danger',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
            } catch (e) {
                setLoader(false)
                console.log('catch in ....login page', e);
                toast.show('Something went wrong!, Try again later.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 1000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        }
    };



    return (
        <View style={{ backgroundColor: themecolor.LOGINTHEMECOLOR, ...styles.bg }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={themecolor.STATUSEBARCONTENT}
            />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <View
                    style={{
                        ...styles.container,
                    }}>

                    <View style={{ ...styles.BackIconView }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.toggle}
                            onPress={() => handleBackButtonClick()}
                        >
                            <CIcon
                                name="keyboard-backspace"
                                size={26}
                                color={themecolor.TXTWHITE}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ ...styles.innerView }}>

                        <View style={{ ...styles.ImgView }}>
                            <Image
                                source={{uri:appLogoAsync}}
                                style={{ width: "100%", height: "100%", resizeMode: 'contain', }}
                            />
                        </View>

                        <View style={styles.mt20} />
                        <View style={styles.mt10} />

                        <View style={styles.innerContainer}>

                            <View style={{ ...styles.innerView1 }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
                                    We have sent you OTP to your registered Mobile Number to verify
                                </Text>

                                <View style={styles.mt10} />

                                <View style={{ ...styles.otpView }}>
                                    <OTPInputView
                                        pinCount={4}
                                        style={{ width: '100%', height: 70, }}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={{
                                            ...styles.underlineStyleBase, backgroundColor: themecolor.OTPBOXCOLOR,
                                            borderColor: themecolor.BOXBORDERCOLOR1, color: themecolor.TXTWHITE,
                                        }}
                                        codeInputHighlightStyle={{ ...styles.underlineStyleHighLighted, borderColor: themecolor.ADDTOCARTBUTTONCOLOR }}
                                        onCodeFilled={(code => setOtp(code))}
                                    />
                                </View>


                                <View style={styles.mt10} />

                                <HalfSizeButton
                                    title="Sign Up"
                                    onPress={() => handleSignIn()}
                                    color={"#fff"}
                                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                    borderColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                />

                                <View style={styles.mt20} />

                            </View>
                        </View>

                    </View>
                </View>
            )}

            {showmodal && (
                <VerifyModel
                    setShowmodal={setShowmodal}
                    title={'Sign Up Successfully.'}
                    navigateTo='Dashboard'
                />
            )}

        </View>
    );
}
