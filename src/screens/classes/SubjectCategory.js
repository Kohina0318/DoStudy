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
import { styles } from '../../assets/css/ClassesCss/CategoryStyle';
import { SubjectCategoryFlateList } from '../../components/shared/FlateLists/ClassesFlateList/SubjectCategoryFlateList';
import { getAllCategory } from '../../repository/ClassesRepository/CategoryRepo';



const { width } = Dimensions.get('screen');

export default function SubjectCategory(props) {
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

    // var data = [
    //     {
    //         id: 1,
    //         image: require('../../assets/images/allbook.png'),
    //         name: 'Books',
    //         onpress: "BookCategory",
    //         touch: false,
    //         itemToSend: { Id: props.route.params.Id,ClassId:props.route.params.ClassId,Name:props.route.params.Name}
    //     },
    //     {
    //         id: 2,
    //         image: require('../../assets/images/solved.png'),
    //         name: 'Solutions',
    //         onpress: "",
    //         touch: false,
    //     },
    //     {
    //         id: 3,
    //         image: require('../../assets/images/questionBank.png'),
    //         name: 'Question Bank',
    //         onpress: "",
    //         touch: false,
    //     },
    //     {
    //         id: 4,
    //         image: require('../../assets/images/allexams.png'),
    //         name: 'Exam Paper',
    //         onpress: "",
    //         touch: false,
    //     },
    //     {
    //         id: 5,
    //         image: require('../../assets/images/allvideos.png'),
    //         name: 'Vedio',
    //         onpress: "",
    //         touch: false,
    //     },
    //     {
    //         id: 6,
    //         image: require('../../assets/images/notes.png'),
    //         name: 'Notes',
    //         onpress: "",
    //         touch: false,
    //     },
    // ]

    const [data, setData] = useState([]);

    const handleCategory = async () => {
        try {
            var res = await getAllCategory();
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
        handleCategory();
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

                        <SubjectCategoryFlateList data={data} subjectId={props.route.params.Id} />
                    </View>

                </>
            )}
        </View>
    );
}
