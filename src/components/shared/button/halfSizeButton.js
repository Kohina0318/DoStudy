import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {FontFamily} from '../../../assets/fonts/FontFamily';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {FontSize} from '../../../assets/fonts/Fonts';

const {width} = Dimensions.get('window');

export default halfSizeButton = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const styles = StyleSheet.create({
    bigButton: {
      backgroundColor: props.backgroundColor,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height:props.height ? props.height:  width * 0.11,
      borderRadius: 10,
      borderWidth: 0.6,
      borderColor: props.borderColor,
    },
    textButton: {
      fontFamily: FontFamily.PopinsMedium,
      fontSize: props.fontSize ?props.fontSize : FontSize.labelText4,
      fontWeight: 'bold',
    },
  });

  return (
    <View>
      <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
        <View style={{...styles.bigButton   }}>
          <Text
           allowFontScaling={false}
            style={{
              color: props.color,
              ...styles.textButton,
            }}>
            {props.icon} {props.title} {props.iconLast}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

halfSizeButton.defaultProps = {
 disabled:false,
};
