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
import OTPInputView from '@twotalltotems/react-native-otp-input'


export default function VerifyOtpForgotPswd(props) {

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

    const [otp, setOtp] = useState("");

    const HandleVerifyOtp=async()=>{
        navigation.navigate("ChangePswdByForgot")
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
                                Please Enter your OTP to Forgot your Password
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
                                    title="Forgot Password"
                                    onPress={()=>HandleVerifyOtp()}
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
