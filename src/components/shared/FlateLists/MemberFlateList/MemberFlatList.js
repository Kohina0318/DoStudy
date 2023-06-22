import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
    Dimensions, ImageBackground
} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/MemberShipCss/MemberShipStyle';
import RazorpayCheckout from 'react-native-razorpay';
import { getProfileInfo } from '../../../../repository/ProfileRepository/EditProfileRepo';
import HalfSizeButton from '../../button/halfSizeButton';
import { useToast } from 'react-native-toast-notifications';
import { postMemberShipPayment } from '../../../../repository/MemberShipRepository/MemberShipRep';

const { width, height } = Dimensions.get('screen');

function MemberDataFlatList({ item, themecolor, userPhoneNo, userName, userEmail, setLoader }) {
    const navigation = useNavigation();
    const toast = useToast();

    const access_key = 'rzp_test_cdnNWMaIkNop2J';
    const random_id = Math.random().toFixed(16).split('.')[1];

    const handlePayNow = async () => {
        var options = {
            description: random_id,
            image:
                'https://img.freepik.com/free-vector/stem-education-logo-with-icon-ornament-elements_1308-67352.jpg?size=626&ext=jpg',
            currency: 'INR',
            key: access_key, // Your api key
            amount: parseInt(item.amount) * 100,
            name: 'OEN Study',
            handler: function (response) {
                console.log(response.razorpay_payment_id);
            },
            prefill: {
                name: userName,
                contact: userPhoneNo,
                email: userEmail,
            },
            theme: { color: 'blue' },
            modal: {
                ondismiss: () => console.log("handleDismis")
            },
        };
        RazorpayCheckout.open(options)
            .then(async (data) => {
                setLoader(true)
                if (data.razorpay_payment_id) {

                    // console.log("data.razorpay_payment_id....",data.razorpay_payment_id)

                    var body = new FormData();
                    body.append('payment_type', 'razorpay');
                    body.append('razorToken', access_key);
                    body.append('package_id', item.id);
                    body.append('package_amount', parseInt(item.amount));
                    body.append('razorpay_signature', data.razorpay_signature);
                    body.append('razorpay_order_id', data.razorpay_order_id);
                    body.append('razorpay_payment_id', data.razorpay_payment_id);
                    body.append('zb_order_id', random_id);

                    var res = await postMemberShipPayment(body);
                    //   console.log("postMemberShipPayment....",res)
                    if (res.status == true) {
                        setLoader(false);
                        // props.navigation.navigate('PaymentConfirmation', { data: detailData })
                        props.navigation.navigate('Dashboard');
                    } else {
                        setLoader(false);
                        toast.show(res.message, {
                            type: 'warning',
                            placement: 'bottom',
                            duration: 1000,
                            offset: 30,
                            animationType: 'slide-in',
                        });
                    }
                } else {
                    setLoader(false)
                    toast.show(
                        'Something Went wrong!, Please try after sometime.',
                        {
                            type: 'danger',
                            placement: 'bottom',
                            duration: 1000,
                            offset: 30,
                            animationType: 'slide-in',
                        },
                    );
                }
            })
            .catch(error => {
                setLoader(false)
                console.log(
                    `....Error in RazorpayCheckout...>>: ${error.code} | ${error.description}`,
                );
            });
        RazorpayCheckout.onExternalWalletSelection(data => {
            console.log(`External Wallet Selected: ${data.external_wallet} `);
        })
    }

    return (
        <View
            style={{ ...styles.classContanier, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        >

            <View style={{ ...styles.classImg }}>
                <Image
                    source={{ uri: item.package_image }}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>

            <View style={styles.innerCon} >
                <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={{ color: themecolor.ADDTOCARTBUTTONCOLOR, ...styles.txt, }}>
                    {item.package_name}
                </Text>

                <View style={styles.margT} />

                <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={{ color: themecolor.TXTWHITE, ...styles.classhead }}>
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt1 }}>&#8377;</Text>
                    {" "}
                    {parseInt(item.amount)}
                    {" "}
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt1 }}>for {item.validation == 12 ? "1 Year" : item.validation == 1 ? item.validation + " Month" : item.validation + " Months"}  </Text>
                </Text>
            </View>

            <View style={styles.margT10} />


            <View style={{ ...styles.tabBorderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

            <View style={styles.margT10} />
            <View style={styles.margT10} />

            <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{ color: themecolor.TXTGREYS, ...styles.txt1, }}>
                Ad free experience
            </Text>

            <View style={styles.margT10} />

            <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{ color: themecolor.TXTGREYS, ...styles.txt1, }}>
                Personalised recommendations
            </Text>

            <View style={styles.margT10} />

            <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{ color: themecolor.TXTGREYS, ...styles.txt1, }}>
                Topics of interest selected by you
            </Text>

            <View style={styles.margT10} />
            <View style={styles.margT10} />

            <View style={{ width: "65%", marginBottom: 20 }}>
                <HalfSizeButton
                    title="Pay Now"
                    icon=""
                    onPress={() => handlePayNow()}
                    color="#fff"
                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                    borderColor={themecolor.BOXBORDERCOLOR1}
                />
            </View>

        </View>
    );
}

function MemberFlatList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <MemberDataFlatList item={item} themecolor={themecolor} userName={props.userName} userEmail={props.userEmail} userPhoneNo={props.userPhoneNo} setLoader={props.setLoader} />
            )}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}

function ActiveMemberShip(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    var dataAll = props.data;

    const Banner = ({ message, style }) => {
        return (
            <Text style={[styles.banner, style]}>
                {message}
            </Text>
        );
    };

    return (
        <View style={{ overflow: "hidden" }}>
            <View style={{ ...styles.innerContanier, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                <View style={{ ...styles.acitiveImgView }}>
                    <Image
                        source={{ uri: dataAll.package_image }}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%', borderRadius: 7 }}
                    />
                </View>
                <View style={styles.activeInnerCon} >
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ color: themecolor.ADDTOCARTBUTTONCOLOR, ...styles.txt, }}>
                        {dataAll.package_name}
                    </Text>

                    <View style={styles.margT} />

                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ color: themecolor.TXTWHITE, ...styles.classhead }}>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={{ color: themecolor.TXTWHITE, ...styles.txt1 }}>&#8377;</Text>
                        {" "}
                        {parseInt(dataAll.amount)}
                        {" "}
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={{ color: themecolor.TXTWHITE, ...styles.txt1 }}>for {dataAll.validation == 12 ? "1 Year" : dataAll.validation == 1 ? dataAll.validation + " Month" : dataAll.validation + " Months"}  </Text>
                    </Text>

                </View>

            </View>

            <Banner
                message="Activated"
                style={{
                    color: themecolor.TXTWHITE1,
                    backgroundColor: themecolor.TEXTGREEN,
                    fontWeight: 'bold',
                }}
            />
        </View>
    )
}

export { MemberFlatList, ActiveMemberShip };