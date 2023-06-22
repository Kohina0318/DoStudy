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
      marginTop:5
  },
  innerView: {
    width: width,
    marginTop: 6,
    padding: 13,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    // borderWidth: 0.5
  },
  dataListView:{
    width: width * 0.85,
    marginTop: 3,
    padding: 15,
  },
  innerlistRow:{
    
    display:"flex",
    flexDirection:"row",
  },
  ImgView: {
    width: width * 0.35,
    height: width * 0.35,
    borderWidth: 2,
    borderRadius: 100,
    marginBottom:5
  },
  imgEdit:{
    width: "100%", height: "100%", 
    resizeMode: 'cover', 
    borderRadius: 100 
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
      fontSize: FontSize.labelText4,
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
  }

    
});

export {styles};
