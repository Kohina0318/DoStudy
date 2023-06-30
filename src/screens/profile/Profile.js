import React, { useEffect, useState } from 'react';
import {
    View,
    Text, Image, Alert, StatusBar, Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/ProfileCss/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import { ProfileFlateList } from '../../components/shared/FlateLists/ProfileFlateList/ProfileFlateList';
import AD from 'react-native-vector-icons/AntDesign';
import FA from 'react-native-vector-icons/FontAwesome';
import EP from 'react-native-vector-icons/Entypo';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Ii from 'react-native-vector-icons/Ionicons';
import { postSignOut } from '../../repository/AuthRepository/SignOutRepository';
import { removeDatafromAsync } from '../../repository/AsyncStorageServices';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';


export default function Profile(props) {

    const toast = useToast();
    var navigation = useNavigation();

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState({});
    const [packageExpiry, setPackageExpiry] = useState("");

    let yourDate = new Date()
    var TodayDate = yourDate.toISOString().split('T')[0]


    const profileData = [
        {
            id: 1,
            name: "Edit Profile",
            icon: <MCI name="account-edit-outline" size={20} color={themecolor.BACKICON} />,
            onpress: "EditProfile",
        },
        {
            id: 2,
            name: "Change Password",
            icon: <EP name="location" size={18} color={themecolor.BACKICON} />,
            onpress: "ChangePswd",
        },
        {
            id: 3,
            name: "MemberShip",
            icon: <MCI name="card-account-details-star-outline" size={19} color={themecolor.BACKICON} />,
            onpress: "MemberShip",
        },
        {
            id: 4,
            name: "Help & Support",
            icon: <Ii name="ios-chatbubble-ellipses-outline" size={20} color={themecolor.BACKICON} />,
            onpress2: "Help & Support",
        },
        {
            id: 5,
            name: "Sign Out",
            icon: <AD name="logout" size={18} color={themecolor.BACKICON} />,
            onpress1: 'Sign Out'
        }
    ];

    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setData(res.data[0])
                setPackageExpiry(res.data[0].package_valid_date)
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


    return (
        <View style={{ backgroundColor: themecolor.THEMECOLOR1, ...styles.bg }}>

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Profile" />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <View
                    style={{
                        ...styles.container,
                    }}>

                    <View style={{
                        ...styles.innerView,
                        // backgroundColor: themecolor.BOXBORDERCOLOR,
                        // borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>
                        <View style={styles.viewDetails}>
                            <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                                <Image
                                    source={{ uri: data.profile_photo }}
                                    style={{ ...styles.imgEdit }}
                                />
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={{ ...styles.headTxt, color: themecolor.TXTWHITE }}
                                numberOfLines={2}>
                                {data.name}
                            </Text>

                            {data.package_type == 1 ?
                                TodayDate >= packageExpiry ?
                                    <Text
                                        allowFontScaling={false}
                                        style={{ ...styles.smallTxt, color: themecolor.TEXTRED }}
                                        numberOfLines={2}>
                                        Your Package is expired
                                    </Text>
                                    :
                                    <>
                                        <Text
                                            allowFontScaling={false}
                                            style={{ ...styles.smallTxt, color: themecolor.TEXTGREEN, fontWeight: '700' }}
                                            numberOfLines={2}>
                                            Package Activated </Text>

                                        <Text
                                            allowFontScaling={false}
                                            style={{ ...styles.smallTxt, color: themecolor.TXTWHITE }}
                                            numberOfLines={2}>
                                            Expiry at {" "}
                                            <Text
                                                allowFontScaling={false}
                                                style={{ ...styles.smallTxt, color: themecolor.TEXTRED }}
                                                numberOfLines={2}>{packageExpiry} </Text>
                                        </Text>

                                    </>
                                :
                                packageExpiry ?
                                    TodayDate >= packageExpiry ?
                                        <Text
                                            allowFontScaling={false}
                                            style={{ ...styles.smallTxt, color: themecolor.TEXTRED }}
                                            numberOfLines={2}>
                                            Your Package is expired
                                        </Text>
                                        :
                                        <>
                                            <Text
                                                allowFontScaling={false}
                                                style={{ ...styles.smallTxt, color: themecolor.TEXTGREEN, fontWeight: '700' }}
                                                numberOfLines={2}>
                                                Package Activated </Text>

                                            <Text
                                                allowFontScaling={false}
                                                style={{ ...styles.smallTxt, color: themecolor.TXTWHITE }}
                                                numberOfLines={2}>
                                                Expiry at {" "}
                                                <Text
                                                    allowFontScaling={false}
                                                    style={{ ...styles.smallTxt, color: themecolor.TEXTRED }}
                                                    numberOfLines={2}>{packageExpiry} </Text>
                                            </Text>

                                        </>
                                    
                                    :
                                    <Text
                                        allowFontScaling={false}
                                        style={{ ...styles.smallTxt, color: themecolor.TXTWHITE }}
                                        numberOfLines={2}>
                                        {data.email}
                                    </Text>


                            }
                        </View>

                        <View style={styles.mt10} />

                        <ProfileFlateList data={profileData} />

                        <View style={styles.mt10} />
                    </View>
                </View>

            )}
        </View>
    );
}
