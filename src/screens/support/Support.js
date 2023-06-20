import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/SupportCss/SupportStyle';
import { useNavigation } from '@react-navigation/native';

export default function Support(props) {

    const toast = useToast();
    var navigation = useNavigation();

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
    const [loader, setLoader] = useState(false);

    return (
        <View style={{ backgroundColor: themecolor.THEMECOLOR, ...styles.bg}}>
            <Header title="Support" />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <View
                    style={{
                        ...styles.container,
                    }}>
                    <Text>Support Us</Text>
                </View>

            )}
        </View>
    );
}
