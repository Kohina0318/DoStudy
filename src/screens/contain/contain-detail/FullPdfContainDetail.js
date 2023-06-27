import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../../components/shared/header/Header';
import { styles } from '../../../assets/css/ClassesCss/ContentStyle';
import Pdf from 'react-native-pdf';


export default function FullPdfContainDetail(props) {
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


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title={`${props.route.params.UnitNo} PDF`} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

             <View
                style={{
                    ...styles.fullcontainer,
                }}> 

                <Pdf
                    source={{
                        uri: props.route.params.contantUrl,
                        cache: true,
                    }}
                    spacing={5}
                    trustAllCerts={Platform.OS === 'ios'}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={error => {
                        console.log(error);
                    }}
                    onPressLink={uri => {
                        console.log(`Link presse: ${uri}`);
                    }}
                    showsVerticalScrollIndicator={true}
                    style={{ ...styles.pdf, backgroundColor: themecolor.THEMECOLOR, }}
                />

            </View>

        </View>
    );
}
