import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerMain: {
        height: height, width: width,
    },
    mrg: {
        margin: 10
    },
    mrTop: {
        marginTop: 5
    },
    mrTop10: {
        marginTop: 10
    },
    mainHeading: {
        flexDirection: "row", justifyContent: 'space-between',
    },
    headingLine: {
        width: 150, height: 20, borderRadius: 20
    },
    headingbutton: {
        width: 90, height: 20, borderRadius: 20
    },
    listContainer: {
        flexDirection: "row", justifyContent: 'space-between', marginTop: 10, alignItems:"center",alignSelf:"center"
    },
    categoryCircle: {
        width: 60, height: 60, borderRadius: 50, marginLeft:11,marginRight:11,marginTop:5
    },
    brandBox: {
        width: width * 0.26, height: height * 0.09,marginLeft:10,marginRight:10,marginTop:5, borderRadius: 5
    },

    productBox: {
        marginLeft:10,marginRight:10,marginTop:5,
    },
    productImage:{
        width: width * 0.42, height: height * 0.22, borderRadius: 7
    },
    productLine:{
        width: width * 0.3, height:13,top:5, borderRadius:10
    },
    productLine1:{
        width: width * 0.38, height:12,top:10, borderRadius:10
    },
});

export { styles };
