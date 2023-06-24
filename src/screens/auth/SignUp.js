import React, { useState,useEffect } from 'react';
import {
    View,
    Text, BackHandler,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView
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
import { postSignUp } from '../../repository/AuthRepository/SignUpRepository';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { getAppLogoAsync } from '../../repository/CommonRepository';


export default function SignUp(props) {

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

    const [loader, setLoader] = useState(true);
    const [appLogoAsync, setAppLogoAsync] = useState('');

    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [showmodal, setShowmodal] = useState(false);
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);

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


    const handleSignUp = async () => {
        setLoader(true)
        if (name == '') {
            setLoader(false)
            toast.show('Full Name is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else if (mobileNo == '') {
            setLoader(false)
            toast.show('Mobile number is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (mobileNo.length < 10) {
            setLoader(false)
            toast.show('Please enter valid mobile number!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (email == '') {
            setLoader(false)
            toast.show('Email is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (!email.includes('@') || !email.includes('gmail.com')) {
            setLoader(false)
            toast.show('Please enter valid email address!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (password == '') {
            setLoader(false)
            toast.show('Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (conPassword == '') {
            setLoader(false)
            toast.show('Confirm Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else if (conPassword != password) {
            setLoader(false)
            toast.show('Confirm Password does not match!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else {
            try {
                let formdata = new FormData();
                formdata.append('name', name);
                formdata.append('phone', mobileNo);
                formdata.append('email', email);
                formdata.append('password', password);
                formdata.append('c_Password', conPassword);

                const res = await postSignUp(formdata);
                if (res.status == true) {
                    setLoader(false)
                    navigation.navigate('VerifyOtp', { mobileNo: mobileNo, password: password })
                } else {
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
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                    source={{ uri: appLogoAsync }}
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
                                        Create your Account
                                    </Text>

                                    <View style={styles.mt10} />

                                    <View style={{
                                        ...styles.textInputView,
                                        backgroundColor: themecolor.OTPBOXCOLOR,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                    }}>
                                        <FA name="user" style={{ margin: 9 }} size={17} color={themecolor.ICONINPUT} />
                                        <View style={{ ...styles.textViewWidth }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={name}
                                                placeholderTextColor={themecolor.TXTGREYS}
                                                placeholder="Full Name*"
                                                onChangeText={text => setName(text)}
                                                style={{
                                                    color: themecolor.TXTWHITE,
                                                    ...styles.textInput,
                                                }}
                                            />
                                        </View>
                                    </View>

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

                                    <View style={{
                                        ...styles.textInputView,
                                        backgroundColor: themecolor.OTPBOXCOLOR,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                    }}>
                                        <Icon name="email" style={{ margin: 9 }} size={16} color={themecolor.ICONINPUT} />
                                        <View style={{ ...styles.textViewWidth }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={email}
                                                placeholderTextColor={themecolor.TXTGREYS}
                                                placeholder="Email Address*"
                                                keyboardType="email-address"
                                                inputMode="email"
                                                onChangeText={text => setEmail(text)}
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
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                            isPasswordSecure
                                                ? setIsPasswordSecure(false)
                                                : setIsPasswordSecure(true);
                                        }} >
                                            <MaterialCommunityIcons
                                                name={isPasswordSecure ? 'eye-off' : 'eye'}
                                                size={17}
                                                style={{ margin: 9 }}
                                                color={themecolor.ICONINPUT}
                                            />
                                        </TouchableOpacity>
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

                                    <View
                                        style={{
                                            ...styles.textInputView,
                                            backgroundColor: themecolor.OTPBOXCOLOR,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                        }}>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                            isPasswordSecure1
                                                ? setIsPasswordSecure1(false)
                                                : setIsPasswordSecure1(true);
                                        }}>
                                            <MaterialCommunityIcons
                                                name={isPasswordSecure1 ? 'eye-off' : 'eye'}
                                                size={17}
                                                style={{ margin: 9 }}
                                                color={themecolor.ICONINPUT}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ ...styles.textViewWidth }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={conPassword}
                                                placeholderTextColor={themecolor.TXTGREYS}
                                                placeholder="Confirm Password*"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                textContentType="newPassword"
                                                secureTextEntry={isPasswordSecure1}
                                                enablesReturnKeyAutomatically
                                                onChangeText={text => setConPassword(text)}
                                                style={{
                                                    color: themecolor.TXTWHITE,
                                                    ...styles.textInput,
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.mt10} />

                                    <HalfSizeButton
                                        title="Sent OTP"
                                        // onPress={() => navigation.navigate('VerifyOtp', { mobileNo: mobileNo, })}
                                        onPress={() => handleSignUp()}
                                        color={"#fff"}
                                        backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                        borderColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                    />

                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            )}

            {showmodal && (
                <VerifyModel
                    setShowmodal={setShowmodal}
                    title={'Registration  Successfully.'}
                    navigateTo={'Dashboard'}
                />
            )}


        </View>
    );
}
