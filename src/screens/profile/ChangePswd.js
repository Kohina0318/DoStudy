import React, { useState } from 'react';
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
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/ProfileCss/EditProfileStyle';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';

const { width, height } = Dimensions.get('window');

export default function ChangePswd(props) {
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

    const [oldPswd, setOldPswd] = useState('');
    const [newPswd, setNewPswd] = useState('');
    const [confirmNewPswd, setConfirmNewPswd] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);
    const [isPasswordSecure2, setIsPasswordSecure2] = useState(true);

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
                                    source={require('../../assets/images/reset-password.png')}
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

                        <View style={{ ...styles.Mv5 }}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Old Password</Text>
                            <View
                                style={{
                                    ...styles.TextViewPswd,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <View style={{...styles.pswdchangeWidth}}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={oldPswd}
                                        placeholder={'Old Password'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={isPasswordSecure}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setOldPswd(txt)}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }}
                                    onPress={() => {
                                        isPasswordSecure
                                            ? setIsPasswordSecure(false)
                                            : setIsPasswordSecure(true);
                                    }}>
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure ? 'eye-off' : 'eye'}
                                        size={16}
                                        color={themecolor.ICONINPUT}
                                    />
                                </TouchableOpacity>
                            </View>
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
                                <View style={{ ...styles.pswdchangeWidth}}>
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

                        <TouchableOpacity activeOpacity={0.5} style={{...styles.forgot,}} onPress={() => navigation.navigate('ForgotPswd')}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        ...styles.forgotTxt,
                                        color: themecolor.BACKICON,
                                    }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>

                    </View>
                </ScrollView>

            )}

            <View style={{ marginVertical: 22 }} />

            <View
                style={{
                    ...styles.touchview,
                }}>
                <View style={{ ...styles.mainView, }}>
                    <HalfSizeButton
                        title="Update Password"
                        icon=""
                        onPress=""
                        color="#fff"
                        backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                        borderColor={themecolor.BOXBORDERCOLOR1}
                    />
                </View>
            </View>
        </View>
    );
}
