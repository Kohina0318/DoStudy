import {StyleSheet, Dimensions} from 'react-native';
import { Colors } from '../../config/Colors';
import {FontFamily as Fonts} from '../../fonts/FontFamily';
import {FontSize} from '../../fonts/Fonts';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarTitle: {
    fontSize: FontSize.labelText5,
    // color: Colors.white,
    fontWeight: '700',
    // marginRight: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    // backgroundColor:'yellow'
  },
  androidButtonText: {
    color: 'blue',
    fontSize: FontSize.h1,
  },

  toolBar: {
    width: width,
    display: 'flex',
    fontSize: FontSize.h1,
    height: height * 0.09,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: Fonts.primarySemiBold,
    justifyContent: 'space-evenly',
  
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.h4,
    fontWeight: '700',
    marginBottom: 16,
  },

  toggle: {
    borderRadius:20
  },
  mainView: {
    width: '100%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomWidth:1
  },
  mainViewContainer: {
    justifyContent: 'center',
    marginTop: 22,
  },
  headerInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: width,
    height: 70,
  },
  iconTitle: {
    width: width * 0.8,
  },
  iconTitle1: {
    width: width * 0.8,
  },
  headText: {
    fontSize: FontSize.labelText5,
    fontFamily: Fonts.PopinsMedium,
    color: Colors.black,
    fontWeight:'800',
    alignSelf: 'center',
  },
  iconView: {
    width: width * 0.17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:"center",
  },
  iconViewCont:{
    width: width * 0.1,alignItems:"center",alignSelf:"center",borderRadius:50,padding:5
  },
  iconText:{
    width: width * 0.08, alignSelf:"center",borderRadius:15
  },
  iconTitle1: {
    width: width * 0.7,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInnerView1: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: width,
    height: 70,
  },
  toggle1: {
    justifyContent:'flex-start'
  },
  
  contentheaderInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:5,
    
  },
  contentImgBack:{
    flex: 1,
    width: width,    
    justifyContent: 'space-between',
    height: height*0.4,
    borderBottomStartRadius:15,borderBottomEndRadius:15,
    overflow: 'hidden'
  },
  contenttoggle: {
    borderRadius:20,
    backgroundColor:'rgba(225, 255, 255, .65)',
    padding:5,

  },
  contentBackIcon:{
    width: width * 0.1,margin:5
  },
  
  contentTitle: {
    display:"flex",
    justifyContent:"center",
    backgroundColor:'rgba(225, 255, 255, .65)',
    width:"100%",
    height:"15%",
    alignItems:"center",
    borderBottomStartRadius:15,borderBottomEndRadius:15
  },
  Animatedheader: {
    justifyContent: 'center',
    alignItems: 'center',      
    left: 0,
    right: 0,
    paddingTop: 10         
  },
  AnimatedheaderText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
 
  
 
});
