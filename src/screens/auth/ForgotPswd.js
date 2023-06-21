import React, { useState } from 'react';
import {
    View,
    Text, BackHandler,
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
import AD from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import FA from 'react-native-vector-icons/FontAwesome';
import { postforgotByNumber} from '../../repository/AuthRepository/ForgotRepository';


export default function ForgotPswd(props) {

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

    const [mobileNo, setMobileNo] = useState('');

    const HandleSendOtp=async()=>{
        // navigation.navigate("VerifyOtpForgotPswd")
        if (mobileNo == '') {
            toast.show('Mobile number is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (mobileNo.length < 10) {
            toast.show('Please enter valid mobile number!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }else{
            try {
                let formdata = new FormData();
                formdata.append('phone', mobileNo);

                const res = await postforgotByNumber(formdata);
                if (res.status == true) {
                     navigation.navigate("VerifyOtpForgotPswd", { mobileNo: mobileNo})
                } else {

                    toast.show(res.message, {
                        type: 'danger',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
            } catch (e) {
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
    }

    return (
        <View style={{ backgroundColor: themecolor.LOGINTHEMECOLOR, ...styles.bg }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={themecolor.STATUSEBARCONTENT}
            />

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
                            source={require('../../assets/images/newlog.png')}
                            style={{ width: "100%", height: "100%", resizeMode: 'contain', }}
                        />
                    </View>

                    <View style={styles.mt20} />

                    <View style={styles.innerContainer}>

                        <View style={{ ...styles.innerView1 }}>
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                style={{ ...styles.headTxt, color: themecolor.TXTWHITE }}>
                                Forgot your Password
                            </Text>

                            <View style={styles.mt10} />

                            <View style={{
                                    ...styles.textInputView,
                                    backgroundColor: themecolor.OTPBOXCOLOR,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                }}>
                                    <MaterialCommunityIcons name="cellphone" style={{ margin: 9 }} size={17} color={themecolor.ICONINPUT} />
                                    <View style={{ ...styles.textViewWidth }}>
                                        <TextInput
                                            allowFontScaling={false}
                                            value={mobileNo}
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            placeholder="Mobile Number*"
                                            keyboardType="numeric"
                                            maxLength={10}
                                            onChangeText={text => setMobileNo(text)}
                                            style={{
                                                color: themecolor.TXTWHITE,
                                                ...styles.textInput,
                                            }}
                                        />
                                    </View>
                                </View>

                           
                            <View style={styles.mt10} />

                            <HalfSizeButton
                                title="Send OTP"
                                onPress={()=>HandleSendOtp()}
                                color={"#fff"}
                                backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                borderColor={themecolor.ADDTOCARTBUTTONCOLOR}
                            />

                        </View>
                    </View>

                </View>
            </View>

        </View>
    );
}
