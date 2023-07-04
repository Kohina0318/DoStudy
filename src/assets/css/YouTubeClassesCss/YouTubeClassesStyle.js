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

  classContanier:{
    width: width,
    margin: 4,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
  },
  classImg:{
    width:width,height:height*0.3,  alignItems: 'center',backgroundColor: '#000',
    alignSelf: 'center',
  },
  classImgOpacity:{
    width:width*0.3,height:"100%", backgroundColor:"rgba(0, 0, 0, 0.5)", padding:10, alignItems:'center',
    alignSelf: 'flex-end',justifyContent:"center"
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
  MT15:{
    marginTop: 15
  },
  MT5:{
    marginTop: 5
  },
  bigtxt:{
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.PopinsMedium,
    fontWeight:"700"
},
txt:{
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.PopinsMedium,
},
smalltxt:{
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
},
lastinnerView:{
  justifyContent:"flex-end", alignItems:"flex-end", width:width , right:1, alignSelf:"flex-end" , marginTop:2
},
youtubIcon:{
  backgroundColor:"rgba(0, 0, 0, 0.5)",
  padding:15,
  borderRadius:50
},
YoutubeVideo:{
  backgroundColor:"#000",height:height, justifyContent:"center",alignContent:"center",
}
 
  
});

export {styles};
