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

  subContanier:{
    width: width * 0.455,
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
  subImg:{
    width:width * 0.4, height:height*0.12 
  },
  subMT5:{
    marginTop: 5
  },
  subhead:{
    fontSize: FontSize.labelText2,
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
 
});

export {styles};
