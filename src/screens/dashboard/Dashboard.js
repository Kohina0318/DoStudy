import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/DashBoardCss/DashboardStyle';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import DashboardShimmer from '../../components/shared/Shimmer/DashboardShimmer';
import CarouselFile from '../../components/shared/Carousel/CarouselFile';
import { DashBoardFlateList } from '../../components/shared/FlateLists/DashboardFlatList/DashBoardFlateList';
import { getCarousel } from '../../repository/DashboardRepository/DashboardRep';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';

export default function Dashboard(props) {
  const toast = useToast();
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  

  var data = [
    {
      id: 1,
      image: require('../../assets/images/classes.png'),
      name: 'Classes',
      onpress: "Classes",
      touch: false,
    },
    {
      id: 2,
      image: require('../../assets/images/preprasion.png'),
      name: 'Pre Prasions',
      onpress: "", 
      touch: false,
    },
    {
      id: 3,
      image: require('../../assets/images/courses.png'),
      name: 'Courses',
      onpress: "",
      touch: false,
    },
    {
      id: 4,
      image: require('../../assets/images/englishBook.png'),
      name: 'English Books',
      onpress: "",
      touch: false,
    },
    {
      id: 5,
      image: require('../../assets/images/hindibook.png'),
      name: 'Hindi Books',
      onpress: "",
      touch: false,
    },
    {
      id: 6,
      image: require('../../assets/images/youtube.png'),
      name: 'YouTube Classes',
      onpress: "",
      touch: false,
    },
    {
      id: 7,
      image: require('../../assets/images/liveclass.png'),
      name: 'Live Classes',
      onpress: "",
      touch: true,
    },
    {
      id: 8,
      image: require('../../assets/images/estore.png'),
      name: 'E-Stores',
      onpress: "",
      touch: true,
    },
    {
      id: 9,
      image: require('../../assets/images/result.png'),
      name: 'Results',
      onpress: "",
      touch: false,
    },
  ]

  const [carouselData, setCarouselData] = useState([]);

    const handleCarousel = async () => {
        try {
          var res = await getCarousel();
          if (res.status === true) {
            setCarouselData(res.data);
            setLoader(false)
          } else {
            setLoader(false)
          }
        } catch (e) {
          setLoader(false)
          console.log('errrror in..handleCarousel page-->', e);
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
        handleCarousel()
      }, [])
    

  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Header title="Home" />

      {loader ? (
        // <DashboardShimmer />
        <LoadingFullScreen  style={{ flex: 1 }} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={{ marginVertical: 5 }} /> */}

          <View
            style={{
              ...styles.container,
              // backgroundColor: themecolor.BOXBORDERCOLOR,
              backgroundColor: 'transparent',
            }}>
            <CarouselFile data={carouselData} />
          </View>

          <View style={{ ...styles.ViewHeading }}>
            <DashBoardFlateList data={data} />
          </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
