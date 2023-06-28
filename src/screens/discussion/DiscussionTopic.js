import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    Image, TextInput, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/DiscussionCss/DiscussionStyle';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { DiscussionTopicFlateList } from '../../components/shared/FlateLists/DiscussionFlateList/DiscussionTopicFlateList';
import { getDiscussionTopic } from '../../repository/DiscussionRepository/DiscussionRepo';
import { useFocusEffect } from '@react-navigation/native';
import IC from 'react-native-vector-icons/Ionicons';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

export default function DiscussionTopic(props) {
    const toast = useToast();
    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleDiscussionTopic = async () => {
        try {
            var res = await getDiscussionTopic();
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
            console.log('catch in ....handleDiscussionTopic page', e);
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    };


  
    useFocusEffect(
        React.useCallback(() => {
          setLoader(true);
          handleDiscussionTopic()
        }, [props, refresh]),
      );



    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Discussion" />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ ...styles.container }}>

                            {data.length > 0 ? (
                                <DiscussionTopicFlateList data={data} />
                            ) : (
                                <NoDataMsg title="No Data found!" />
                            )}

                        </View>

                    </ScrollView>

                    <View
                        style={{
                            ...styles.touchview,
                        }}>
                        <TouchableOpacity activeOpacity={0.5}  onPress={()=>navigation.navigate("CreateDiscussion")}
                        style={{ ...styles.mainView, backgroundColor: themecolor.LOGINTHEMECOLOR1, borderColor: themecolor.BOXBORDERCOLOR1, elevation: 3 }}>
                           <View style={{alignItems:"center",}}>
                           <IC name="add-outline" size={40} color={themecolor.BACKICON} />
                           </View>
                        </TouchableOpacity>

                    </View>

                </>
            )}
        </View>
    );
}
