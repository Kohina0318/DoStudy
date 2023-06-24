import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1,},
  bdContainter:{
    justifyContent: 'center',
      alignSelf: 'center',
  },
  container: {
    width:width,
    // height:height*0.31,
    marginBottom:8
  },
  container1: {
    width:width *0.95,
    height: height*0.3,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:11,
    borderWidth:1
  },
  image: {
    width: width,
    height: height*0.25,
    resizeMode:"contain"
  },
  header: {
    // color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5
  },
  body: {
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  container2: {
    width:width,
    height:height*0.2
  },
  brandsContainer: {
    width:width * 0.9,
  },
    CardText: {
      fontSize: FontSize.labelText4,
      fontFamily: FontFamily.PopinsMedium,
      color: Colors.black,
      fontWeight:'600',
      alignSelf: 'center',
    },
    ViewAllButton: {
      backgroundColor: Colors.bluetheme,
      borderRadius: 30,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    ViewAllButtonIcon: {
      color: Colors.white,
      fontSize: FontSize.smallText,
    },
    ViewHeading:{
      width: width * 0.95, alignSelf: 'center', marginBottom:8
    },
    ViewInnerHeading:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      position: 'relative',
      marginBottom:5
    },

    classContanier:{
      width: width * 0.307,
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
      width:width * 0.4, height:height*0.09 ,overflow:'hidden'
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
    smalltxt:{
      fontFamily: FontFamily.Popinssemibold,
      color: Colors.black,
      fontSize: FontSize.labelText,
      fontWeight: 'bold',
    },
    touchView:{
      backgroundColor: "rgba(252, 252, 203, 0.8)", width: width * 0.305, alignItems: "center", marginTop: -65,padding:2
    },
    mainViewCon:{
      display: 'flex', flexDirection: "column", alignItems: "center"
    },
    adsContainer: {
      width:width *0.95,
      justifyContent:"center",
      alignSelf:"center",
      borderRadius:10
    },
    adsContainer1: {
      width:width *0.95,
      height: height*0.1,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:11,
      borderWidth:1
      
    },
    adsimage: {
      width: "100%",
      height: "100%",
      resizeMode:"cover",
      borderRadius:10,
    },
    mgT10:{
      marginTop:10
    }
  

});

export {styles};
