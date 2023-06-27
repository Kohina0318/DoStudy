import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    Image, TextInput, BackHandler
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/DiscussionCss/DiscussionStyle';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FA from 'react-native-vector-icons/Feather';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';
import { DiscussionFlateList } from '../../components/shared/FlateLists/DiscussionFlateList/DiscussionFlateList';
import { getDiscussion, postSendDiscussion } from '../../repository/DiscussionRepository/DiscussionRepo';

export default function Discussion(props) {

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
    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(true);
    const [txt, setTxt] = useState("");
    const [userData, setUserData] = useState([]);
    // const [data, setData] = useState([]);
    const [userProfile, setProfile] = useState('');
    const [refresh, setRefresh] = useState(false);

    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setUserData(res.data)
                setProfile(res.data[0].profile_photo)
                setLoader(false)
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
        }
    };

    const handleDiscussion = async () => {
        try {
            var res = await getDiscussion();
            if (res.status === true) {
                setData(res.data)
                setLoader(false)
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
            console.log('catch in ....handleSendDiscussion page', e);
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    };


    useEffect(() => {
        handleUserData();
        handleDiscussion()
    }, [refresh]);

    const handleSendDiscussion = async () => {
        setLoader(true);
        if (txt == '') {
            setLoader(false)
            toast.show('Comment is required!', {
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
                formdata.append('user_id', userData.id)
                formdata.append('comment', txt)

                const res = await postSendDiscussion(formdata);
                if (res.status == true) {
                    setRefresh(!refresh);
                    setTxt("")
                    toast.show("Send your comment Successfully.", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });

                }
            } catch (e) {
                setLoader(false)
                console.log('catch in ....handleSendDiscussion page', e);
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


    const data = [
        {
            id: 1,
            user_name: "Riya Singh",
            user_profile_pic: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
            comment: "Please, Provide JEE Mains Contain.",
            time: "16 seconds ago at 5:45 PM"
        },
        {
            id: 2,
            user_name: "Priya Sharma",
            user_profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY8X8BDSNJmIX2UR4V2uTjzpmmfGYnp3W5UuiEDWHP90PFOE1HBC96ZGDY5mH-nfButE&usqp=CAU",
            comment: "xyzguhuh jjij",
            time: "2 days ago at 2:00 AM"
        },
        {
            id: 2,
            user_name: "Priya Sharma",
            user_profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY8X8BDSNJmIX2UR4V2uTjzpmmfGYnp3W5UuiEDWHP90PFOE1HBC96ZGDY5mH-nfButE&usqp=CAU",
            comment: "xyzguhuh jjij",
            time: "2 days ago at 2:00 AM"
        },
        {
            id: 2,
            user_name: "Priya Sharma",
            user_profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY8X8BDSNJmIX2UR4V2uTjzpmmfGYnp3W5UuiEDWHP90PFOE1HBC96ZGDY5mH-nfButE&usqp=CAU",
            comment: "xyzguhuh jjij",
            time: "2 days ago at 2:00 AM"
        },
        {
            id: 2,
            user_name: "Priya Sharma",
            user_profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY8X8BDSNJmIX2UR4V2uTjzpmmfGYnp3W5UuiEDWHP90PFOE1HBC96ZGDY5mH-nfButE&usqp=CAU",
            comment: "xyzguhuh jjij",
            time: "2 days ago at 2:00 AM"
        },
        {
            id: 2,
            user_name: "Priya Sharma",
            user_profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY8X8BDSNJmIX2UR4V2uTjzpmmfGYnp3W5UuiEDWHP90PFOE1HBC96ZGDY5mH-nfButE&usqp=CAU",
            comment: "xyzguhuh jjij",
            time: "2 days ago at 2:00 AM"
        },
    ]


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Discussion"  backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ ...styles.container }}>

                            <View style={{}}>

                            </View>

                            {data.length > 0 ? (
                                <DiscussionFlateList data={data} />
                            ) : (
                                <NoDataMsg title="No Comments!" />
                            )}

                        </View>

                    </ScrollView>

                    <View style={{ ...styles.bottomContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderTopColor: themecolor.BOXBORDERCOLOR1, }}>
                        <View style={{ ...styles.bottomProfile }}>
                            <Image
                                source={{ uri: userProfile }}
                                resizeMode="contain"
                                style={{ width: 40, height: 40, borderRadius: 50 }}
                            />
                        </View>

                        <View style={{ ...styles.bottomTextInput }}>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={txt}
                                    placeholder={'Type a response..'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setTxt(txt)}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.bottommsgSend }}>
                            <TouchableOpacity activeOpacity={0.5} style={{ ...styles.msgSend }} onPress={()=>handleSendDiscussion()}>
                                <FA name="send" color={themecolor.ADDTOCARTBUTTONCOLOR} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
