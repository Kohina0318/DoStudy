import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
  },
  fullcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },

  contentContainerStyle: {
    width: width * 0.944, justifyContent: "flex-start",
  },
  datalistView: {
    width: width * 0.94,
    marginTop: 6,
    padding: 13,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    display: "flex",
    marginBottom: 1,
  },
  datalistView1: {
    width: width * 0.94,
    marginTop: 6,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    display: "flex",
    marginBottom: 1,
  },
  innerViewCon1: {
    width: "90%",
  },
  innerViewCon2: {
    width: "10%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    borderRadius: 50
  },
  heading: {
    fontSize: FontSize.labelText4,
    fontWeight: 'bold',
    fontFamily: FontFamily.PopinsMedium,
  },
  txt:
  {
    color: Colors.bluetheme,
    fontFamily: FontFamily.PopinsRegular,
    fontSize: FontSize.labelText3,
  },
  txt1:
  {
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    fontSize: FontSize.labelText4,
  },
  txt2:
  {
    color: Colors.bluetheme,
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText2,

  },
  mt5: {
    marginTop: 7
  },
  mtt5: {
    marginTop: 4
  },
  mt15: {
    marginTop: 15
  },
  buttonView: { width: width * 0.25, alignItems: "center", padding: 4, borderRadius: 20 },
  buttontxt: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    color: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: "center",
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: height * 0.4,
  },
  m20: {
    margin: 15
  },

  touchview: {
    // width: width,
    position: 'absolute',
    bottom: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent'
  },

  mainView: {
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 50,
    borderWidth: 1
  },
  UnitHeading: {
    fontSize: FontSize.labelText5,
    fontWeight: 'bold',
    fontFamily: FontFamily.PopinsMedium,
    textAlign: "center"
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdfViewCon: {
    borderWidth: 1, width: width * 0.85, maxHeight: height
  },
  widthVideo: {
    width: width * 0.82,
    height: height
  },
  widthVideo1: {
    width: width * 0.82,
    height: height * 0.3,
    alignContent: "center", justifyContent: "center", alignSelf: "center", alignItems: "center"
  },
  VideoPlay: {
    padding: 15, borderRadius: 150, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 60, height: 60, alignContent: "center", justifyContent: "center", alignSelf: "center", alignItems: "center"
  },
  widthVideoBlackPadding: {
    width: width * 0.82,
    height: height * 0.33,
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#000"
  },
  widthImg: {
    width: width * 0.85,
    height: width * 0.52,
  },

  pdfImg: {
    width: width * 0.6,
    height: width * 0.3,
  },

  fullVideoContain: {
    flex: 1, backgroundColor: "#000", width: width, height: height, alignSelf: 'center', justifyContent: "center", padding: 10
  },
  fullVideoInnerCon: {
    width: "100%", height: "100%", alignSelf: 'center', justifyContent: "center", alignContent: "center",
  },
  fulllVideoView: {
    backgroundColor: "#000", width: "100%", height: "100%",
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

export { styles };
