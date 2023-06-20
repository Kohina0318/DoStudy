import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/ModelsCss/SucessModelStyle';

export default VerifyModel = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);

  const handleClickOnDone = () => {
    setModalVisible(!modalVisible);
    navigation.reset({
      index: 0,
      routes: [{ name: props.navigateTo }],
    });

    // if (props.comeIn === "comeInCart") {
    //   navigation.navigate("CartAddress")
    // }
    // else if (props.comeIn == "ComeInProduct") {
    //   if (props.comeInLogin == "comeInLogin") {
    //     navigation.pop(2)
    //   } else {
    //     navigation.goBack();
    //   }
    // } else {
    //   navigation.navigate(props.navigateTo)
    // }

  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: themecolor.TXTWHITE1 }}>
          <View style={styles.ModalViewWidth}>
            <View style={styles.ModelVideoCenter}>
              {mode == 'dark' ?
                <Image
                  source={require('../../../assets/images/green-tick.gif')}
                  style={styles.backgroundVideo}
                  resizeMode={'contain'}
                /> :
                <Video
                  source={require('../../../assets/images/Videos/confirmation.mp4')}
                  style={styles.backgroundVideo}
                  muted={true}
                  resizeMode={'contain'}
                  repeat={true}
                  rate={2.0}
                  ignoreSilentSwitch={'obey'}
                />}
              <Text allowFontScaling={false} style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>
                {props.title}
              </Text>
            </View>
            <View style={styles.MV2} />

            <View style={styles.FLexCenter}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClickOnDone()}>
                <View
                  style={{
                    ...styles.ModelDoneButton,
                    backgroundColor: themecolor.BACKICON,
                  }}>
                  <Text allowFontScaling={false} style={{ ...styles.textStyleDone, color: themecolor.TXTWHITE1 }}>Done</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
