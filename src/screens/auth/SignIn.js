import React, { useState } from 'react';
import {
    View, Text, BackHandler,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput, ScrollView
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
import { postSignIn } from '../../repository/AuthRepository/SignInRepository';
import { StoreDatatoAsync } from '../../repository/AsyncStorageServices';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';


export default function SignIn(props) {

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
    const [password, setPassword] = useState('');

    const [showmodal, setShowmodal] = useState(false);
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);


    const handleSignIn = async () => {
        setLoader(true);
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
        } else if (password == '') {
            toast.show('Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else {
            try {
                let formdata = new FormData()
                formdata.append('phone', mobileNo);
                formdata.append('password', password)

                const res = await postSignIn(formdata);
                if (res.status == true) {
                    await StoreDatatoAsync('@UserData', JSON.stringify(res.data));
                    await StoreDatatoAsync('@Token', JSON.stringify(res.data.user.jwt_token));
                    setLoader(false)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    });
                    toast.show("Sign In Successfully.", {
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

                    <View style={{ ...styles.BackIconView, }}>
                        <View style={styles.mt20} />
                        <View style={styles.mt20} />
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
                                    Sign In your Account
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

                                <View
                                    style={{
                                        ...styles.textInputView,
                                        backgroundColor: themecolor.OTPBOXCOLOR,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                    }}>
                                    <MaterialCommunityIcons
                                        onPress={() => {
                                            isPasswordSecure
                                                ? setIsPasswordSecure(false)
                                                : setIsPasswordSecure(true);
                                        }}
                                        name={isPasswordSecure ? 'eye-off' : 'eye'}
                                        size={17}
                                        style={{ margin: 9 }}
                                        color={themecolor.ICONINPUT}
                                    />
                                    <View style={{ ...styles.textViewWidth }}>
                                        <TextInput
                                            allowFontScaling={false}
                                            value={password}
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            placeholder="Password*"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            textContentType="newPassword"
                                            secureTextEntry={isPasswordSecure}
                                            enablesReturnKeyAutomatically
                                            onChangeText={text => setPassword(text)}
                                            style={{
                                                color: themecolor.TXTWHITE,
                                                ...styles.textInput,
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={styles.mt10} />

                                <HalfSizeButton
                                    title="Sign In"
                                    iconLast={<AD name="login" color="#fff" size={17} />}
                                    onPress={() => handleSignIn()}
                                    color={"#fff"}
                                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                    borderColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                />

                                <View style={styles.mt10} />

                                <TouchableOpacity activeOpacity={0.5} style={styles.forgot} onPress={() => navigation.navigate('ForgotPswd')}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            ...styles.forgotTxt,
                                            color: themecolor.BACKICON,
                                        }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.mt20} />
                                <View style={styles.mt20} />

                                <View style={styles.bottomRow}>
                                    <View
                                        style={{
                                            ...styles.borderLine, borderColor: themecolor.TXTGREY,
                                        }}
                                    />

                                    <Text allowFontScaling={false} style={{ color: themecolor.TXTGREY, ...styles.forgotTxt }}>
                                        {' '}  OR  {' '}
                                    </Text>
                                    <View
                                        style={{
                                            ...styles.borderLine, borderColor: themecolor.TXTGREY,
                                        }}
                                    />
                                </View>


                            </View>

                            <View style={{ ...styles.innerBottomView }}>
                                <View style={styles.bottomRow}>
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={1}
                                        style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
                                        Don't have an Account? {" "}
                                    </Text>

                                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SignUp')}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                ...styles.txtBold,
                                                color: themecolor.BACKICON,
                                            }}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>



                        </View>

                    </View>

                </View>
            )}

            {showmodal && (
                <VerifyModel
                    setShowmodal={setShowmodal}
                    title={'Sign In Successfully.'}
                    navigateTo='Dashboard'
                />
            )}

        </View>
    );
}
