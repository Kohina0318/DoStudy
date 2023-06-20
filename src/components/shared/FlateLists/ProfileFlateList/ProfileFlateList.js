import React, { } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
    Alert,
} from 'react-native';

import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/ProfileCss/ProfileStyle';
import { removeDatafromAsync } from '../../../../repository/AsyncStorageServices';
import { postSignOut } from '../../../../repository/AuthRepository/SignOutRepository';
import { useToast } from 'react-native-toast-notifications';


function ProfileDataFlateList({ item, themecolor }) {

    const navigation = useNavigation();
    const toast = useToast();

    const handleConfirmLogout = () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to Logout?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => handleLogout() },
            ],
        );
    };


    const handleLogout = async () => {
        try {
            var res = await postSignOut()
            console.log("data....", res)
            if (res.status == true) {
                await removeDatafromAsync('@UserData');
                await removeDatafromAsync('@Token');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                });
            }
            else {
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 1000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    };



    return (
        <TouchableOpacity activeOpacity={0.5}
            style={{
                ...styles.dataListView,
            }}
            onPress={() => item.onpress1 ? handleConfirmLogout() : navigation.navigate(item.onpress)}
        >
            <View style={{ ...styles.innerlistRow }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR }}
                    numberOfLines={2}>
                    {item.icon} {'   '}
                </Text>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt, color: themecolor.ADDTOCARTBUTTONCOLOR }}
                    numberOfLines={2}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export function ProfileFlateList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <ProfileDataFlateList item={item} themecolor={themecolor} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}
