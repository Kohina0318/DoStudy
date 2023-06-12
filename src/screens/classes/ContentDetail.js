import React, { useEffect, useState ,} from 'react';
import {
    View,
    Dimensions, Text, BackHandler,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { styles } from '../../assets/css/ClassesCss/ContentStyle';
import Header from '../../components/shared/header/Header';

const { width } = Dimensions.get('screen');

export default function ContentDetail(props) {
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
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
  


    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);

   
    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

           <Header title={props.route.params.UnitNo} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <View style={{ ...styles.container, }}>
  
                       <Text>hguuiui</Text>
                    </View>

                </>
            )}
        </View>
    );
}
