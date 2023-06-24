import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        // backgroundColor:themecolor.RB2,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // height:height*0.3
      },
      ModelVideoCenter: {
        justifyContent: 'center',
        alignSelf: 'center',
      },
      submittext: {
        fontSize: FontSize.labelText4,
        color: Colors.black,
        textAlign: 'center',
        width: width * 0.82,
        alignSelf: 'center',
        fontFamily: FontFamily.Popinssemibold,
        top: 5,
      },
      MV2: {marginVertical: 2},
      FLexCenter: {flexDirection: 'row', justifyContent: 'center'},
      ModelDoneButton: {
        height: 38,
        width: width * 0.3,
        top: 10,
        backgroundColor: Colors.bluetheme,
        borderRadius: 18,
        justifyContent: 'center',
      },
      textStyleDone: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
      },
      backgroundVideo: {
        height: 250,
      },
      textInput: {
        fontSize: FontSize.labelText3,
        height: 43,
        fontFamily: FontFamily.PopinsRegular,
        left:10
      },
      textInputView: {
        width: width * 0.6,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 0.8,
      },
                  
});

export {styles};