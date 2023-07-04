import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5
    },
    innerContain:{
        width: width*0.95 ,
        padding: 13,
        // margin:2,
        alignItems: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#E9E9E9',
        borderWidth: 0.5,
        borderRadius:3,
        backgroundColor: '#FFF',
    },

    innerContaintop:{
        width: width,
        padding: 13,
        // margin:2,
        alignItems: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#E9E9E9',
        borderRadius:3,
        backgroundColor: '#FFF',
    },
    innertopicContain:{
        width: width*0.94 ,
        padding: 13,
        margin:3,
        alignItems: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#E9E9E9',
        borderWidth: 0.5,
        borderRadius:10,
        backgroundColor: '#FFF',
    },
    innercont1:{
        flexDirection:"row",
        width:"100%",
        alignSelf:"center",alignItems:"center"
    },
    namecontainer:{
        width: "85%",padding:5,left:5
    },
    txt:{
        fontSize: FontSize.labelText2,
        fontFamily: FontFamily.Popinssemibold,
        fontWeight:'700'
    },
    txt1:{
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsMedium,
    },
    txt2:{
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
    },
    txt3:{
        fontSize: FontSize.labelText4,
        fontFamily: FontFamily.PopinsMedium,
        fontWeight:'700'
    },
    txt3:{
        fontSize: FontSize.labelText4,
        fontFamily: FontFamily.PopinsMedium,
        fontWeight:'700'
    },
    smalltxt:{
        fontSize: FontSize.smallText,
        fontFamily: FontFamily.PopinsMedium,
        fontWeight:'700'
    },
    smalltxt1:{
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsMedium,
        fontWeight:'700'
    },
    smalltxt2:{
      fontSize: FontSize.labelText2,
      fontFamily: FontFamily.PopinsMedium,
      fontWeight:'700'
  },
    commentCon:{
        width: "96%",padding:2,left:5
    },
    commentCon1:{
        width: "100%",padding:5,justifyContent:"flex-start",alignSelf:'flex-start',alignItems:"flex-start"
    },
    TmeCon:{width: "100%",flexDirection:"row" , justifyContent:"space-between"},
    tmeConinnerLast:{width:"40%",  alignSelf:"flex-end",alignItems:"flex-end"},
    tmeConinnerLast1:{width:"50%",  alignSelf:"flex-end",alignItems:"flex-end"},
    MT10: {
        marginTop: 10
    },
    MT5: {
        marginTop: 5
    },
    bottomContain: {
        bottom: 0, flexDirection: "row", backgroundColor: "#fff", padding: 5, width: width,alignSelf:"center",justifyContent:"center",alignItems:"center",borderTopWidth:0.5,
    },
    bottomProfile: {
        width: "15%",padding:5,alignSelf:"center",justifyContent:"center",alignItems:"center"
    },
    bottomTextInput:{
        width: "72%",alignSelf:"center",justifyContent:"center",alignItems:"center"
    },
    bottommsgSend:{
        width: "13%",padding:2,alignSelf:"center",justifyContent:"center",alignItems:"center"
    },
    msgSend:{
        padding:7,borderRadius:50,alignSelf:"center",justifyContent:"center",alignItems:"center"
    },
    TextView: {
        height: 43,
        borderRadius: 3,
        borderWidth: 0.8,
        overflow: 'hidden',
        width: "100%",
      },
      TextInput:{
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
        left: 8,
        marginRight:10
      },
      disTopicCon:{
        margin: 10,  width: width*0.94 ,padding:10,
       
      },
      touchview: {
        // width: width,
        position: 'absolute',
        bottom: 8,
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

      touchview1: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'transparent'
      },
      
      mainView1: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: width * 0.94,
      },
      TextinputH1:{
        fontSize: FontSize.labelText,
        fontFamily: FontFamily.PopinsMedium,
        left: 5,
        bottom:4
      },
      TextInput1:{
        fontSize: FontSize.labelText3,
        fontFamily: FontFamily.PopinsMedium,
        left: 8,
        marginRight:10
      },
      TextView1: {
        height: 43,
        borderRadius: 10,
        borderWidth: 0.8,
        overflow: 'hidden',
        width: width * 0.85,
      },
      TextViewBig: {
        height: 159,
        borderRadius: 10,
        borderWidth: 0.8,
        overflow: 'hidden',
        width: width * 0.85,
      },
      viewDetailsimg:{
        margin:15,
        alignSelf: 'center',
        alignItems: 'center',
      },
      ImgView: {
        width: width * 0.35,
        height: width * 0.35,
        borderWidth: 2,
        borderRadius: 100,
        marginBottom:5
        
      },
      imgEdit:{
        width: "100%", height: "100%", borderRadius: 7 ,
      },
      mediaView:{
        width:width*0.83, height:width*0.6,borderRadius: 7 ,
      }


});

export { styles };
