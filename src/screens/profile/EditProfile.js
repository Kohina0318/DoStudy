import React, { useState, useEffect } from 'react';
import {
    View,
    Text, Image,
    BackHandler,
    TextInput,
    ScrollView,
    TouchableOpacity, StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/ProfileCss/EditProfileStyle';
import { useNavigation } from '@react-navigation/native';
import Mi from 'react-native-vector-icons/MaterialIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { getProfileInfo, postEditProfile } from '../../repository/ProfileRepository/EditProfileRepo';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import { launchImageLibrary } from 'react-native-image-picker';

export default function EditProfile(props) {
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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [classNo, setClassNo] = useState('');
    const [school, setSchool] = useState('');

    const [showmodal, setShowmodal] = useState(false);

    const [filePath, setFilePath] = useState({
        uri: 'https://picsum.photos/200/300?random=1',
    });
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');


    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setName(res.data[0].name)
                setEmail(res.data[0].email)
                setMobileNo(res.data[0].phone)
                setAddress(res.data[0].address)
                setCity(res.data[0].city)
                setZip(res.data[0].zip)
                setState(res.data[0].state)
                setCountry(res.data[0].country)
                setClassNo(res.data[0].classno)
                setSchool(res.data[0].school)
                setImage(res.data[0].profile_photo)
                setLoader(false);
            }
            else {
                setLoader(false);
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 1000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
            setLoader(false);
        }
    };

    useEffect(() => {
        handleUserData();
    }, []);


    const handleEditProfile = async () => {
        setLoader(true);
        if (mobileNo == '') {
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
        }
        else {
            try {
                let formdata = new FormData()
                formdata.append('name', name)
                formdata.append('email', email)
                formdata.append('phone', mobileNo)
                formdata.append('address', address)
                formdata.append('city', city)
                formdata.append('zip', zip)
                formdata.append('state', state)
                formdata.append('country', country)
                formdata.append('classno', classNo)
                formdata.append('school', school)
                formdata.append('profile_photo', image1)

                const res = await postEditProfile(formdata);
                if (res.status == true) {
                    setLoader(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    });

                    toast.show("Edit Profile Successfully.", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                    // setShowmodal(!showmodal)

                }
            } catch (e) {
                setLoader(false)
                console.log('catch in ....Edit Profile page', e);
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

    const openGallery = () => {
        let options = {
            storageOption: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error', response.error);
            } else if (response.customButtom) {
                // console.log('User tapped custom Button', response.customButtom);
            } else {
                const source = {
                    base64: 'data:image/jpeg;base64,' + response.assets[0].base64,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                    uri: response.assets[0].uri,
                }
                // console.log(response)
                setImage(source.base64);
                setImage1(source.base64);
            }
        });
    };

    const removeImage = () => {
        setImage('')
    }

    return (
        <View style={{ backgroundColor: themecolor.THEMECOLOR, ...styles.bg }}>

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Edit Profile" backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            ...styles.container,
                        }}>



                        {image === '' ? (
                            <View style={styles.viewDetails}>
                                <TouchableOpacity onPress={() => openGallery()}>
                                    <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                                        <Image
                                            source={require('../../assets/images/profile.jpg')}
                                            style={{ ...styles.imgEdit }}
                                        />
                                    </View>
                                    <View style={{ ...styles.editicon, backgroundColor: themecolor.ButtonIconLight, }}>
                                        <Mi name="mode-edit" size={17} color={themecolor.ADDTOCARTBUTTONCOLOR} />
                                    </View>
                                </TouchableOpacity>
                                <Text
                                    allowFontScaling={false}
                                    style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR, top: 3 }}
                                    numberOfLines={2}>
                                    Edit Profile Picture
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.viewDetails}>
                                <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, }}>

                                    <Image
                                        // source={{ uri: `data:image/jpeg;base64,${image}` }}
                                        source={{ uri: image }}
                                        style={{ ...styles.imgEdit }}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={{ ...styles.editicon, backgroundColor: themecolor.ButtonIconLightRight, }}
                                    onPress={() => removeImage()}
                                >
                                    <Mi name="close" size={17} color={"#fff"} />
                                </TouchableOpacity>

                                <Text
                                    allowFontScaling={false}
                                    style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR, top: 3 }}
                                    numberOfLines={2}>
                                    Edit Profile Picture
                                </Text>
                            </View>
                        )}





                        <View style={styles.mt10}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Full Name</Text>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={name}
                                    placeholder={'Full Name'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setName(txt)}
                                />
                            </View>
                        </View>

                        <View style={styles.mt10}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Mobile Number</Text>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={mobileNo}
                                    placeholder={'Mobile Number'}
                                    keyboardType="numeric"
                                    maxLength={10}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setMobileNo(txt)}
                                />
                            </View>
                        </View>

                        <View style={styles.mt10}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Email Address</Text>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={email}
                                    placeholder={'Email Address'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setEmail(txt)}
                                />
                            </View>
                        </View>

                        <View style={styles.mt10}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Address</Text>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={address}
                                    placeholder={'Address'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setAddress(txt)}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.inputBoxHalf, ...styles.mt10 }}>
                            <View>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>City</Text>
                                <View
                                    style={{
                                        ...styles.TextViewHalf,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                    }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={city}
                                        placeholder={'City'}
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setCity(txt)}
                                    />
                                </View>
                            </View>

                            <View style={{ ...styles.Mh5 }} />

                            <View>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Zip Code</Text>
                                <View
                                    style={{
                                        ...styles.TextViewHalf,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                    }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={zip}
                                        placeholder={'Zip Code'}
                                        keyboardType="numeric"
                                        maxLength={6}
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setZip(txt)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ ...styles.inputBoxHalf, ...styles.mt10 }}>
                            <View>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>State</Text>
                                <View
                                    style={{
                                        ...styles.TextViewHalf,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                    }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={state}
                                        placeholder={'State'}
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setState(txt)}
                                    />
                                </View>
                            </View>

                            <View style={{ ...styles.Mh5 }} />

                            <View>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Country</Text>
                                <View
                                    style={{
                                        ...styles.TextViewHalf,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                    }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={country}
                                        placeholder={'Country'}
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setCountry(txt)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.mt10}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Class</Text>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={classNo}
                                    placeholder={'Class'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setClassNo(txt)}
                                />
                            </View>
                        </View>

                        <View style={styles.mt10}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.ADDTOCARTBUTTONCOLOR }}>School</Text>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={school}
                                    placeholder={'School'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setSchool(txt)}
                                />
                            </View>
                        </View>

                        <View style={styles.mt10} />
                        <View style={styles.mt10} />

                    </View>
                </ScrollView>

            )}

            <View style={{ marginVertical: 15 }} />

            <View
                style={{
                    ...styles.touchview,
                }}>
                <View style={{ ...styles.mainView, }}>
                    <HalfSizeButton
                        title="Update Profile"
                        icon=""
                        onPress={() => handleEditProfile()}
                        color="#fff"
                        backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                        borderColor={themecolor.BOXBORDERCOLOR1}
                    />
                </View>
            </View>

            {showmodal && (
                <VerifyModel
                    setShowmodal={setShowmodal}
                    title={'Edit Profile Successfully.'}
                    navigateTo='Dashboard'
                />
            )}
        </View>
    );
}
