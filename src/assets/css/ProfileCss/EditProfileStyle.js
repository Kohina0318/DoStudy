import {StyleSheet, Dimensions} from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: width * 0.95,
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
  },
  
  ImgView: {
    width: width * 0.35,
    height: width * 0.35,
    borderWidth: 2,
    borderRadius: 100,
    marginBottom:5
  },
  imgEdit:{
    width: "100%", height: "100%", resizeMode:'cover', borderRadius: 100 
  },
  headTxt:
  {
      color: Colors.bluetheme,
      fontFamily: FontFamily.Popinssemibold,
      fontSize: FontSize.labelText4,
      fontWeight: 'bold',
  },
  txt:
  {
      color: Colors.bluetheme,
      fontFamily: FontFamily.Popinssemibold,
      fontSize: FontSize.labelText3,
  },
  smallTxt:
  {
      color: Colors.bluetheme,
      fontFamily: FontFamily.Popinssemibold,
      fontSize: FontSize.labelText2,
  },
  viewDetails:{
    margin:15,
    alignSelf: 'center',
    alignItems: 'center',
  },
  mt10:{
    marginTop:10
  },
  editicon:{
    marginTop:-32,padding:5,marginLeft:50,borderRadius:25,alignSelf:"center",
    width:width*0.08,justifyContent:"center",height:width*0.08
  },
  TextinputH:{
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    left: 5,
    bottom:4
  },
  TextInput:{
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    left: 8,
    marginRight:10
  },
  TextView: {
    height: 43,
    borderRadius: 10,
    borderWidth: 0.8,
    overflow: 'hidden',
    width: width * 0.85,
  },
  touchview: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent'
  },
  
  mainView: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.94,
  },
  TextViewPswd: {
    height: 43,
    borderRadius: 8,
    borderWidth: 0.8,
    overflow: 'hidden',
    width: width * 0.85,
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center",
  },
  Mv5: {
    marginVertical: 5,
  },
  Mh5: {
    marginHorizontal: 1,
  },
  pswdchangeWidth:{
    width: width * 0.76,
  },
  inputBoxHalf:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextViewHalf: {
    height: 43,
    borderRadius: 8,
    borderWidth: 0.8,
    overflow: 'hidden',
    width: width * 0.42,
  },
  forgot: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    display:'flex',
    width:"95%"
   
  },
  forgotTxt: {
    fontSize: 12,
    fontWeight: 'bold',
  },
    
});

export {styles};
