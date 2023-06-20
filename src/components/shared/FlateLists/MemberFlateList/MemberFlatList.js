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

const { width, height } = Dimensions.get('screen');

function MemberDataFlatList({ item, themecolor, userPhoneNo, userName, userEmail }) {
    const navigation = useNavigation();
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
                if (data.razorpay_payment_id) {
                    console.log('razorpay_signature', data.razorpay_signature);
                    console.log('razorpay_order_id', data.razorpay_order_id);
                    console.log('razorpay_payment_id', data.razorpay_payment_id);
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
                        style={{ color: themecolor.TXTWHITE, ...styles.txt1 }}>for {item.validation} </Text>
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
                    onPress={()=>handlePayNow()}
                    color="#fff"
                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                    borderColor={themecolor.BOXBORDERCOLOR1}
                />
            </View>

        </View>
    );
}

export function MemberFlatList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <MemberDataFlatList item={item} themecolor={themecolor} userName={props.userName} userEmail={props.userEmail} userPhoneNo={props.userPhoneNo} />
            )}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}
