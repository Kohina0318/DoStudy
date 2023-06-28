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
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

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
    const [data, setData] = useState([]);
    const [userProfile, setProfile] = useState('');
    const [refresh, setRefresh] = useState(false);

    var discussionTopicData = props.route.params.TopicData

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
            var res = await getDiscussion(props.route.params.Id);
            console.log("hjjkjjk..",res)
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
            console.log('catch in ....handleDiscussion page', e);
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
                formdata.append('topic_id', props.route.params.Id)
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


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title={` Discussion Topic : ${props.route.params.Id}`} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ ...styles.container }}>

                            <View
                                style={{ ...styles.innerContaintop, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
                            >

                                <Text
                                    allowFontScaling={false}
                                    style={{ color: themecolor.TXTWHITE, ...styles.txt3 }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{ color: themecolor.TXTWHITE, ...styles.smalltxt1 }}>
                                        Topic Name :
                                    </Text>  {discussionTopicData.topic_name}
                                </Text>


                                <View style={{ ...styles.MT5 }} />

                                <Text
                                    allowFontScaling={false}
                                    style={{ color: themecolor.TXTGREYS, ...styles.smalltxt }}>
                                    Created Date : {discussionTopicData.created_date}
                                </Text>

                                <View style={styles.MT5} />

                                <Text
                                    allowFontScaling={false}
                                    style={{ color: themecolor.TXTWHITE, ...styles.txt2 }}>
                                    {discussionTopicData.topic_des}
                                </Text>

                                <View style={{ ...styles.MT5 }} />



                                <View style={styles.MT10} />

                            </View>

                            <View style={{ ...styles.MT5 }} />

                            {data.length > 0 ? (
                                <DiscussionFlateList data={data} />
                            ) : (
                               <></>
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
                            <TouchableOpacity activeOpacity={0.5} style={{ ...styles.msgSend }} onPress={() => handleSendDiscussion()}>
                                <FA name="send" color={themecolor.ADDTOCARTBUTTONCOLOR} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
