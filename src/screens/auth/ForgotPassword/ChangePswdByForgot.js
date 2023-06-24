import React, { useState ,useEffect} from 'react';
import {
    View,
    Text, Image,
    BackHandler,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../components/Theme/ThemeDarkLightColor';
import Header from '../../../components/shared/header/Header';
import LoadingFullScreen from '../../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../../assets/css/ProfileCss/EditProfileStyle';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HalfSizeButton from '../../../components/shared/button/halfSizeButton';
import { postforgotPassword } from '../../../repository/AuthRepository/ForgotRepository';

const { width, height } = Dimensions.get('window');

export default function ChangePswdByForgot(props) {
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

    const [newPswd, setNewPswd] = useState('');
    const [confirmNewPswd, setConfirmNewPswd] = useState('');
    const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);
    const [isPasswordSecure2, setIsPasswordSecure2] = useState(true);


    const handleSubmit = async () => {
        setLoader(true)
        if (newPswd == '') {
            setLoader(false)
            toast.show('New Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (confirmNewPswd == '') {
            setLoader(false)
            toast.show('Confirm New Password is required!', {
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
                formdata.append('phone', props.route.params.mobileNo);
                formdata.append('otp', props.route.params.otp);
                formdata.append('password1', newPswd);
                formdata.append('password2', confirmNewPswd);

                var res = await postforgotPassword(formdata);
                if (res.status === true) {
                    var comeIn = props.route.params.comeIn;
                    if (comeIn === "SignIn") {
                        setLoader(false)    
                        navigation.navigate("SignIn")
                    } else {
                        setLoader(false)
                        navigation.navigate("Dashboard")
                    }
                    toast.show("Password change Successfully.", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
                else {
                    setLoader(false)
                    toast.show(res.message, {
                        type: 'warning',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }

            } catch (e) {
                setLoader(false)
                console.log('errrror in..getManageAddress page in address-->', e);
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
        <View style={{ backgroundColor: themecolor.THEMECOLOR, ...styles.bg }}>
            <Header title="Change Password" backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            ...styles.container,
                        }}>

                        <View style={styles.viewDetails}>
                            <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                                <Image
                                    source={require('../../../assets/images/reset-password.png')}
                                    style={{ ...styles.imgEdit }}
                                />
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR }}
                                numberOfLines={2}>
                                Change Your Password
                            </Text>
                        </View>

                        <View style={{ ...styles.Mv5 }} />

                        <View>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>New Password</Text>
                            <View
                                style={{
                                    ...styles.TextViewPswd,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <View style={{ ...styles.pswdchangeWidth }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={newPswd}
                                        placeholder={'New Password'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={isPasswordSecure1}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setNewPswd(txt)}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }} onPress={() => {
                                    isPasswordSecure1
                                        ? setIsPasswordSecure1(false)
                                        : setIsPasswordSecure1(true);
                                }}
                                >
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure1 ? 'eye-off' : 'eye'}
                                        size={16}
                                        color={themecolor.ICONINPUT}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ ...styles.Mv5 }} />

                        <View>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Confirm New Password</Text>
                            <View
                                style={{
                                    ...styles.TextViewPswd,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <View style={{ ...styles.pswdchangeWidth }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={confirmNewPswd}
                                        placeholder={'Confirm New Password'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={isPasswordSecure2}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setConfirmNewPswd(txt)}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }} onPress={() => {
                                    isPasswordSecure2
                                        ? setIsPasswordSecure2(false)
                                        : setIsPasswordSecure2(true);
                                }}
                                >
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure2 ? 'eye-off' : 'eye'}
                                        size={16}
                                        color={themecolor.ICONINPUT}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ ...styles.Mv5 }} />
                        <View style={{ ...styles.Mv5 }} />

                        <View style={{ width: "96%" }}>
                            <HalfSizeButton
                                title="Update Password"
                                icon=""
                                onPress={() => handleSubmit()}
                                color="#fff"
                                backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                borderColor={themecolor.BOXBORDERCOLOR1}
                            />
                        </View>
                    </View>
                </ScrollView>

            )}


        </View>
    );
}
