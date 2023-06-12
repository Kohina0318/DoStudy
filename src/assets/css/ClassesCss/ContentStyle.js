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

  contentContainerStyle:{
    width:width*0.944, justifyContent:"flex-start", 
  },
  datalistView: {
    width: width * 0.93,
    marginTop: 6,
    padding: 13,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginBottom: 1,
  },
  heading:{
    fontSize: FontSize.labelText4,
    fontWeight: 'bold',
  },
  txt:
  {
      color: Colors.bluetheme,
      fontFamily: FontFamily.Popinssemibold,
      fontSize: FontSize.labelText2,
      fontWeight: 'bold',
  },
  txt1:
  {
      fontFamily: FontFamily.Popinssemibold,
      color: Colors.black,
      fontSize: FontSize.labelText4,
      fontWeight: 'bold',
  },
  mt5:{
    marginTop:7
  },
  buttonView:{ width:width*0.25,alignItems:"center",padding:4, borderRadius:20},
  buttontxt: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    color:"#fff",
    alignItems:"center",
    justifyContent:'center',
    alignSelf:"center",
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: height*0.4,
},




  
  
});

export {styles};
