import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    height: height,
    width: width,
  },
  BackIconView: {
    width: width * 0.12,
    marginTop: 25,
    margin: 10
  },
  toggle: {
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
  },
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgView: {
    marginTop:20,
    width: width * 0.4,
    height: width * 0.4,
  },
  mt20:{
    marginTop:20
  },
  mt10:{
    marginTop:12
  },
  headTxt:
  {
      fontFamily: FontFamily.Popinssemibold,
      color: Colors.black,
      fontSize: FontSize.labelText4,
  },
  txt:
  {
      fontFamily: FontFamily.PopinsRegular,
      color: Colors.black,
      fontSize: FontSize.labelText3,
  },
  txtBold:
  {
      fontFamily: FontFamily.PopinsRegular,
      color: Colors.black,
      fontSize: FontSize.labelText3,
      fontWeight:"800"
  },
  innerContainer:{
    width:width*0.85,
    height:height*0.64,
    justifyContent:"space-between",
  },
  innerView1: {
    justifyContent: 'center',

  },
  textInputView: {
    width: width * 0.85,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.8,
  },
  textViewWidth:{
    width: width * 0.72,
  },
  textInput: {
    fontSize: FontSize.labelText3,
    height: 43,
    fontFamily: FontFamily.PopinsRegular,
  },
  forgot: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  forgotTxt: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  innerBottomView: {
    alignItems: 'center',
    margin:20,
  },
  bottomRow:{
    display:"flex",
    flexDirection:"row",
    alignSelf:'center',
  },
  borderLine:{
    borderWidth: 0.3,
    width: width * 0.3,
    height:-0.10,
    alignSelf:'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45
  },
  otpView:{
    width: width * 0.83,
  },
  borderStyleHighLighted: {
    borderColor: Colors.bluetheme,
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    fontSize:FontSize.labelText4,
   fontFamily:FontFamily.PopinsRegular,
   color:"#000"
  },
  

  underlineStyleHighLighted: {
    borderColor: Colors.bluetheme,
  },


});

export { styles };
