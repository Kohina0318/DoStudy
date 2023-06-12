import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions, Text, BackHandler
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/ClassesCss/SubjectStyle';
import { getSubjects } from '../../repository/ClassesRepository/SubjectRep';
import { SubjectFlateList } from '../../components/shared/FlateLists/ClassesFlateList/SubjectFlateList';


const { width } = Dimensions.get('screen');

export default function Subjects(props) {
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

    const handleSubject = async () => {
        try {
            var res = await getSubjects(props.route.params.Id);
            if (res.status === true) {
                setData(res.data);
                setLoader(false)
            }else{
                setLoader(false)
            }
        } catch (e) {
            setLoader(false)
            console.log('errrror in..handleSubject page-->', e);
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
        handleSubject();
    }, []);


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

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
                            <SubjectFlateList data={data} />
                        ) : (
                            <NoDataMsg title="No Data Found!" />
                        )}

                    </View>

                </>
            )}
        </View>
    );
}
