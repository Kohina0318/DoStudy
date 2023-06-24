import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/ModelsCss/RatingModelStyle';
import StarRating from 'react-native-star-rating';

const { width } = Dimensions.get('screen');

export default RatingModel = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [modalVisible, setModalVisible] = useState(true);


  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}
      onRequestClose={() => {
        props.setStarRating(props.starRating1)
        props.setCommentRating(props.commentRating1)
        props.setShowmodal(!props.showmodal)
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: themecolor.RB2 }}>
          <View style={styles.ModalViewWidth}>
            <View style={styles.ModelVideoCenter}>
              <Text allowFontScaling={false} style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>
                Rating us
              </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.9 }}>
              <View style={{ width: width * 0.5, margin: 20 }}>
                <StarRating
                  activeOpacity={0.5}
                  disabled={false}
                  maxStars={5}
                  rating={props.starRating}
                  selectedStar={rating => props.setStarRating(rating)}
                  starSize={30}
                  fullStarColor={themecolor.STARCOLOR}
                />
              </View>
            </View>
            <View style={styles.MV2} />

            <View style={{
              ...styles.textInputView,
              backgroundColor: themecolor.OTPBOXCOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
              <TextInput
                allowFontScaling={false}
                value={props.commentRating}
                placeholderTextColor={themecolor.TXTGREYS}
                placeholder="Comment"
                onChangeText={text => props.setCommentRating(text)}
                style={{
                  color: themecolor.TXTWHITE,
                  ...styles.textInput,
                }}
              />
            </View>

            <View style={styles.MV2} />

            <View style={styles.FLexCenter}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.press()}>
                <View
                  style={{
                    ...styles.ModelDoneButton,
                    backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
                  }}>
                  <Text allowFontScaling={false} style={{ ...styles.textStyleDone }}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
