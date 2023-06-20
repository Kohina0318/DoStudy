import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/ModelsCss/SucessModelStyle';

export default SuccessModel = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);

  const handleClickOnDone = () => {
    setModalVisible(!modalVisible);
    if (props.comeIn == "ComeInProduct" || props.comeIn == "comeInCart") {
      navigation.navigate("Login", {comeIn:props.comeIn})
    }else{ 
    navigation.navigate(props.navigateTo)
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: themecolor.RB2 }}>
          <View style={styles.ModalViewWidth}>
            <View style={styles.ModelVideoCenter}>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: 250,
                  width: 300
                }}
                source={require('../../../assets/images/successEmailSend.gif')}
              />
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
                    backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
                  }}>
                  <Text allowFontScaling={false} style={{ ...styles.textStyleDone }}>Done</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
