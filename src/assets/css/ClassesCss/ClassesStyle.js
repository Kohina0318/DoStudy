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
courseInnerView:{
  flexDirection: "row", justifyContent: "flex-start", width: "97%"
},
  classContanier:{
    width: width * 0.46,
    margin: 3,
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
    width:width * 0.4, height:height*0.15 ,
  },
  classMT5:{
    marginTop: 5
  },
  classhead:{
    fontSize: 11,
    fontWeight: 'bold',
  },

  contentContainerStyle:{
    width:width*0.944, justifyContent:"flex-start", 
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
  fullContanier:{
    width: width * 0.94,
    margin: 5,
    padding: 15,
    alignItems: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  CoursesContanier:{
    width: width * 0.46,
    margin: 4,
    padding: 10,
    alignItems: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  fullImg:{
    width:width * 0.85, height:height*0.25 
  },
  CoursesImg:{
    width:width * 0.4, height:height*0.32
  },
 
  
});

export {styles};
