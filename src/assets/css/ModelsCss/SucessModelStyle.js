import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width} = Dimensions.get('window');

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
      },
      ModelVideoCenter: {
        justifyContent: 'center',
        alignSelf: 'center',
      },
      ModelVideoCenter1: {
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection:'row'
      },
      submittext: {
        fontSize: FontSize.h4,
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
      img:{
        width:100,height:100
      }
                  
});

export {styles};
