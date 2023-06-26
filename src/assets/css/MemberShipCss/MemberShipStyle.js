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
    innerContanier:{
    width: width * 0.95,
    margin: 3,
    padding:13,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection:"row",
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
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
  classheadd:{
    fontSize: FontSize.labelText5,
    fontFamily:FontFamily.PopinsExtraBold,
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
    marginTop:15
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
  acitiveImgView:{
    width:width *  0.22, height:width*0.22 ,borderRadius: 10,justifyContent:"center",alignItems: 'center',padding:5,
    alignSelf: 'center',
  
  },
  activeInnerCon:{
    marginTop:5,
    left:20
  },
  banner: {
    position: 'absolute',
    right: -30,
    top: 30,
    width: 129,
    transform: [{ rotate: "45deg" }],
    backgroundColor: 'black',
    color: 'white',
    padding: 2,
    textAlign: 'center',
    fontSize: FontSize.labelText,
    fontFamily:FontFamily.Popinsbold,
    elevation:1,
    fontWeight:'bold'
  },
  adsContainer: {
    width:width *0.95,
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:10
  },
  MT10:{
    marginTop: 10
  },
 
  
});

export {styles};
