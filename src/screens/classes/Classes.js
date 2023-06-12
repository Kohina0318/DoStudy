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
import { styles } from '../../assets/css/ClassesCss/ClassesStyle';
import { ClassFlatList } from '../../components/shared/FlateLists/ClassesFlateList/ClassFlatList';
import { getClasses } from '../../repository/ClassesRepository/ClasessRep';


const { width } = Dimensions.get('screen');

export default function Classes(props) {
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

    const handleClasses = async () => {
        try {
          var res = await getClasses();
          if (res.status === true) {
            setData(res.data);
            setLoader(false)
          } else {
            setLoader(false)
          }
        } catch (e) {
          setLoader(false)
          console.log('errrror in..handleClasses page-->', e);
          toast.show('Something went wrong!, Try again later.', {
            type: 'danger',
            placement: 'bottom',
            duration: 1000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      };
    
      useEffect(() => {
        handleClasses()
      }, [])
    
    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

            <Header title="Class" backIcon={true}
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
                             <ClassFlatList data={data} />
                        ) : (
                            <NoDataMsg title="No Data Found!" />
                        )}

                    </View>

                </>
            )}
        </View>
    );
}
