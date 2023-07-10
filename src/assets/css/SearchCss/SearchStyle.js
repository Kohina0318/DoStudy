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
  MT5:{
    marginTop: 5
  },
  MT10:{
    marginTop: 10
  },
  SearchBarComponent: {
    width: width * 0.95,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 10,
    height: 48,
    borderWidth:0.5
  },
  SearchIcon: {alignSelf: 'center',width: width * 0.09,alignItems:"center",padding:5, borderRadius:50,left:5},
  SearchTextInput: {
    width: width * 0.73,
    fontFamily: FontFamily.PopinsMedium,
    fontSize:FontSize.labelText4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  Close: {alignSelf: 'center',alignItems:"center",width: width * 0.09,right:5,padding:5, borderRadius:50,},
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height:height*0.8
  },
  noDataText: {
    fontSize: FontSize.labelText3,
    color: 'grey',
  },
  noDataText1: {
    fontSize: FontSize.labelText3,
    fontWeight: 'bold',
  },
  
  
});

export {styles};
