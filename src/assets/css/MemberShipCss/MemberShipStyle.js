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
      marginTop:10,
      width: width * 0.94,
  },

  classContanier:{
    width: width * 0.88,
   margin: 3,
    marginBottom:3,
    padding:10,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  classImg:{
    width:width *  0.78, height:height*0.2 ,borderRadius: 10,justifyContent:"center",margin:20,alignItems: 'center',
    alignSelf: 'center',
  },
  classMT5:{
    marginTop: 5
  },
  classhead:{
    fontSize: FontSize.labelTextbigger,
    fontFamily:FontFamily.PopinsExtraBold,
    fontWeight: 'bold',
  },
  txt:{
    fontSize: FontSize.labelText5,
    fontFamily:FontFamily.PopinsRegular,
    fontWeight: 'bold',
  },
  txt1:{
    fontSize: FontSize.labelText3,
    fontFamily:FontFamily.Popinsbold,
  },
  contentContainerStyle:{
    width:width*0.944, justifyContent:"flex-start", 
  },
   margT10:{
    marginTop:20
  },
  margT:{
    marginTop:5
  },
  innerCon:{
    marginTop:5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  tabBorderLine: {
    width: "75%",
    borderWidth: 0.3,
  },
  
  
});

export {styles};
