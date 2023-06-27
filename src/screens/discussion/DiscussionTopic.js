import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    Image, TextInput
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

export default function DiscussionTopic(props) {
    const toast = useToast();
    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(true);
    // const [data, setData] = useState([]);
    const [userProfile, setProfile] = useState('');
    const [refresh, setRefresh] = useState(false);

    
    const data = [
        {
            id: 1,
            topic_name: "yughujk",
            topic_des: "hggyuyuuiuiiuo",
            
        },
        {
            id: 2,
            topic_name: "ghfyguyiupup",
            topic_des: "gfgyuyouuoi",
        },
       
    ]


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR1 }}>
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
                                <DiscussionFlateList data={data} />
                            ) : (
                                <NoDataMsg title="No Comments!" />
                            )}

                        </View>

                    </ScrollView>

                </>
            )}
        </View>
    );
}
