import { StyleSheet } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';

const styles = StyleSheet.create({
    loadingFullView: {
        alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, width: '100%'
    },
    loadingContentView: { justifyContent: "center", alignItems: "center", margin: 10 },
    txt: {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: FontSize.labelText3,
    },
    txtHead:{
        fontSize: FontSize.labelText5,
        fontFamily: FontFamily.PopinsMedium,
        color: Colors.black,
        fontWeight:'bold',
    },
    mrg5: {
        margin: 5
    }
})

export { styles };