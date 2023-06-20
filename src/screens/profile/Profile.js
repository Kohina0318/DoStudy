import React, { useEffect, useState } from 'react';
import {
    View,
    Text, Image, Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/ProfileCss/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
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

    
    const profileData = [
        {
            id: 1,
            name: "Edit Profile",
            icon: <MCI name="account-edit-outline" size={20} />,
            onpress: "EditProfile",
        },
        {
            id: 2,
            name: "Change Password",
            icon: <EP name="location" size={18} />,
            onpress: "ChangePswd",
        },
        {
            id: 3,
            name: "MemberShip",
            icon: <MCI name="card-account-details-star-outline" size={19} />,
            onpress: "MemberShip",
        },
        {
            id: 4,
            name: "Help & Support",
            icon: <Ii name="ios-chatbubble-ellipses-outline" size={20} color={themecolor.BACKICON} />,
            onpress: "Support",
        },
        {
            id: 5,
            name: "Sign Out",
            icon: <AD name="logout" size={18} color={themecolor.BACKICON} />,
            onpress1:'Sign Out'
        },
    ];


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setName(res.data[0].name)
                setEmail(res.data[0].email)
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




    return (
        <View style={{ backgroundColor: themecolor.THEMECOLOR, ...styles.bg }}>
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
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                    }}>
                        <View style={styles.viewDetails}>
                            <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                                <Image
                                    source={{uri:image}}
                                    style={{ ...styles.imgEdit }}
                                />
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={{ ...styles.headTxt, color: themecolor.TXTWHITE }}
                                numberOfLines={2}>
                                {name}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={{ ...styles.smallTxt, color: themecolor.TXTWHITE }}
                                numberOfLines={2}>
                                {email}
                            </Text>
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
