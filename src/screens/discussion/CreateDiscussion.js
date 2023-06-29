import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar, ScrollView, TextInput, Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../assets/css/DiscussionCss/DiscussionStyle';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { postCreateDiscussionTopic } from '../../repository/DiscussionRepository/DiscussionRepo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import EIcon from 'react-native-vector-icons/Entypo';
import ChosseFileTypeModal from '../../components/shared/Model/ChosseFileTypeModal';
import Video from 'react-native-video';

const { width } = Dimensions.get('screen');

export default function CreateDiscussion(props) {
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

    const [loader, setLoader] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [topicDes, setTopicDes] = useState('');

    const [filePath, setFilePath] = useState({
        uri: 'https://picsum.photos/200/300?random=1',
    });
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [fileType, setFileType] = useState('');

    const [showmodal, setShowmodal] = useState(false);

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
                setImage(source.uri);
                setImage1(source.uri);
            }
        });
    };

    const openGallery1 = () => {
        const options2 = {
            title: 'Select video',
            mediaType: 'video',
            path: 'video',
            quality: 1
        };
        launchImageLibrary(options2, (response) => {
            console.log('Response = ', response.assets[0].uri);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };

                setImage(source.uri);
                setImage1(source.uri);


            }
        });
    };

    const removeImage = () => {
        setImage('')
    }


    const handleCreateDiscussion = async () => {
        setLoader(true);
        if (topicName == '') {
            setLoader(false)
            toast.show('Topic Name is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else if (topicDes == '') {
            setLoader(false)
            toast.show('Topic Description is required!', {
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
                formdata.append('topic_name', topicName)
                formdata.append('topic_description', topicDes)
                formdata.append('media', image1)

                const res = await postCreateDiscussionTopic(formdata);
                if (res.status == true) {
                    setLoader(false)
                    navigation.navigate("Dashboard")
                    toast.show("Discussion Topic add Successfully.", {
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
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Create Discussion" backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                ...styles.container,
                            }}>

                            <View style={styles.viewDetailsimg}>
                                <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: "#fff", }}>
                                    <Image
                                        source={require('../../assets/images/discussion.png')}
                                        style={{ ...styles.imgEdit }}
                                        resizeMode='contain'
                                    />
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR }}
                                    numberOfLines={2}>
                                    Create New Discussion
                                </Text>
                            </View>

                            <View style={styles.MT10} />


                            <View style={styles.MT10}>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH1, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Topic Name</Text>
                                <View
                                    style={{
                                        ...styles.TextView1,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                    }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={topicName}
                                        placeholder={'Topic Name'}
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput1,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setTopicName(txt)}
                                    />
                                </View>
                            </View>

                            <View style={styles.MT10} />

                            <View style={styles.MT10}>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH1, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Topic Description</Text>
                                <View
                                    style={{
                                        ...styles.TextViewBig,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                    }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={topicDes}
                                        placeholder={'Topic Description'}
                                        multiline={true}
                                        textAlignVertical='top'
                                        numberOfLines={200}
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput1,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setTopicDes(txt)}
                                    />
                                </View>
                            </View>

                            <View style={styles.MT10} />

                            <View style={styles.MT10}>
                                <Text allowFontScaling={false} style={{ ...styles.TextinputH1, color: themecolor.ADDTOCARTBUTTONCOLOR }}>Upload Media</Text>
                                {image === '' ? (
                                    <TouchableOpacity activeOpacity={0.5} style={{ padding: 7 }}
                                        onPress={() => setShowmodal(!showmodal)}
                                    // onPress={() => openGallery()}
                                    >
                                        <FIcon name="camera" size={70} color={themecolor.TXTGREY} />
                                    </TouchableOpacity>
                                ) : (
                                    <View style={{ padding: 5, }}>
                                        <TouchableOpacity
                                            style={{ zIndex: 99999, left: 0, marginBottom: -11, width: 112, alignItems: "flex-end", marginTop: -5 }}
                                            onPress={() => removeImage()}
                                        >
                                            <EIcon name="circle-with-cross" size={25} color={'tomato'} style={{ zIndex: 99999 }} />
                                        </TouchableOpacity>
                                        {fileType === 'video' ?

                                            <Video source={{ uri: image }}   
                                                ref={(ref) => {
                                                    this.player = ref
                                                }}                                      
                                                onBuffer={this.onBuffer}                
                                                onError={this.videoError}              
                                                autoplay={false}
                                                resizeMode="contain"
                                                style={{ width: 100, height: 100, borderRadius: 4, backgroundColor: "#000" }} />

                                            :
                                            <Image
                                                source={{ uri: image }}
                                                style={{ width: 100, height: 100, borderRadius: 4 }}
                                            />
                                        }

                                        <View style={styles.MT10} />
                                        <View style={styles.MT10} />
                                    </View>

                                )}
                            </View>


                        </View>
                    </ScrollView>

                    <View style={{ marginVertical: 22 }} />

                    <View
                        style={{
                            ...styles.touchview1,
                        }}>
                        <View style={{ ...styles.mainView1, }}>
                            <HalfSizeButton
                                title="Submit"
                                icon=""
                                onPress={() => handleCreateDiscussion()}
                                color="#fff"
                                backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                borderColor={themecolor.BOXBORDERCOLOR1}
                            />
                        </View>
                    </View>
                </>
            )}

            {showmodal && (
                <ChosseFileTypeModal
                    setShowmodal={setShowmodal}
                    onpressPhoto={openGallery}
                    onpressVideo={openGallery1}
                    setFileType={setFileType}
                />
            )}
        </View>
    );
}
