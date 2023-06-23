import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler,StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { BookCategoryFlateList } from '../../components/shared/FlateLists/ClassesFlateList/BookCategoryFlateList';
import { getBookCategory, getCategoryTopics } from '../../repository/ClassesRepository/CategoryRepo';
import { styles } from '../../assets/css/ClassesCss/CategoryStyle';



const { width } = Dimensions.get('screen');

export default function BookCategory(props) {
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

    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);

    const handleCategoryTopics = async () => {
        try {
            var res = await getCategoryTopics(props.route.params.Id, props.route.params.subjectId);
            console.log(res)

            if (res.status === true) {
                setData(res.data);
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (e) {
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

    useEffect(() => {
        handleCategoryTopics();
    }, []);


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title={props.route.params.Name} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <View
                        style={{
                            ...styles.container,
                        }}>

                        {data.length > 0 ? (
                            <BookCategoryFlateList data={data} />
                        ) : (
                            <NoDataMsg title="No Data Found!" />
                        )}

                    </View>

                </>
            )}
        </View>
    );
}
