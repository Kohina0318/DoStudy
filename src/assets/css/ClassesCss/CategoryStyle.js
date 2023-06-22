import {StyleSheet, Dimensions} from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { fontSize } from '../../fonts/FontSize';
import { FontSize } from '../../fonts/Fonts';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:5
  },

  subContanier:{
    width: width * 0.455,
    height:height*0.3,
    margin: 4,
    alignItems: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  subImg:{
    width:"100%", height:height*0.305, borderRadius: 10,
  },
  subConView:{
    width:"100%",height:"20%",marginTop:-42,backgroundColor:'rgba(255, 255, 255, 0.7)',alignItems:'center',display:"flex",justifyContent:"center",borderBottomStartRadius:10,borderBottomEndRadius:10
  },
  subMT5:{
    marginTop: 5
  },
  subhead:{
    fontSize: FontSize.labelText4,
    fontWeight: 'bold',
  },
  contentContainerStyle:{
    width:width*0.944, justifyContent:"flex-start", 
  },
  classContanier:{
    width: width * 0.46,
    margin: 2,
    padding: 10,
    alignItems: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  classImg:{
    width:width * 0.4, height:height*0.15 ,overflow:'hidden',
  },
  classMT5:{
    marginTop: 5
  },
  classhead:{
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    fontSize: FontSize.labelText2,
    fontWeight: 'bold',
  },
 
  
});

export {styles};
