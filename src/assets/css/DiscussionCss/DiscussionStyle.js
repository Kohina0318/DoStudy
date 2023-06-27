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
    innertopicContain:{
        width: width*0.95 ,
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
    commentCon:{
        width: "96%",padding:2,left:5
    },
    MT10: {
        marginTop: 10
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



});

export { styles };
