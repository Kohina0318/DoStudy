import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar, ScrollView, TouchableOpacity, TextInput, Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { styles } from '../../assets/css/SearchCss/SearchStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { getSearch } from '../../repository/SearchRepository/SearchRepo';
import { SearchFlateList } from '../../components/shared/FlateLists/SearchFlateList/SearchFlateList';

const { width } = Dimensions.get('screen');

export default function Search(props) {
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
    const [data, setData] = useState([])
    const [result, setResult] = useState('')

    const handleText = (text) => {
        setData([])
        setResult(text);
    }

    const handleClear = () => {
        setResult('');
        setData([])
    }

    const handleSearch = async () => {
        setLoader(true)
        try {
           
            var res = await getSearch(result);
            if (res.status === true) {
                setData(res.data);
                setLoader(false)
            } else {
                setData("No Data")
                setLoader(false)
            }
        } catch (e) {
            setData("No Data") 
            setLoader(false)
            console.log('errrror in..handleCategory page-->', e);
            toast.show('Something went wrong!, Try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    }

    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Search" backIcon={true}
                onPressBack={() => handleBackButtonClick()} />


            <View style={{
                ...styles.SearchBarComponent, backgroundColor: themecolor.LOGINTHEMECOLOR1,
                borderColor: themecolor.BOXBORDERCOLOR1
            }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handleSearch()} style={{ ...styles.SearchIcon, }}>
                    <Icon name="search" size={20} color={themecolor.TXTWHITE} />
                </TouchableOpacity>

                <TextInput allowFontScaling={false}
                    onSubmitEditing={() => handleSearch()}
                    value={result}
                    onChangeText={(text) => handleText(text)}
                    style={{ ...styles.SearchTextInput, color: themecolor.TXTWHITE, }}
                    placeholderTextColor={themecolor.TXTGREYS} placeholder="Search by Book Name..." />

                {result != "" ?
                    <TouchableOpacity activeOpacity={0.5} onPress={() => handleClear()} style={styles.Close}>
                        <Icon name="close-circle-outline" size={23} color={themecolor.TXTWHITE} />
                    </TouchableOpacity>
                    :
                    <View style={styles.Close}>
                    </View>
                }

            </View>

            <View style={styles.MT10} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View
                        style={{
                            ...styles.container,
                        }}>
                        {data == 'No Data' ?
                            <View style={{ ...styles.noDataView }}>
                                <Image
                                    source={require('../../assets/images/search.png')}
                                    resizeMode="contain"
                                    style={{ width: "100%", height: 200 }}
                                />
                                <Text allowFontScaling={false} style={{ ...styles.noDataText1, color: themecolor.TXTWHITE }}>Oops! No matching products found.. </Text>
                                <Text allowFontScaling={false} style={{ ...styles.noDataText }}>Try another Search Term</Text>
                            </View>
                            :
                            <SearchFlateList data={data} />
                        }
                    </View>
                </ScrollView>

            )}

        </View>
    );
}
