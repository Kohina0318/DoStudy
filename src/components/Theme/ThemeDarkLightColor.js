import { Appearance } from "react-native";
import { Colors } from "../../assets/config/Colors";
const isDarkMode = (Appearance.getColorScheme() === 'dark')

const Color = {
  WHITE: '#FFFFFF',
  TRANSPARENT: 'transparent',
  THEMECOLOR: isDarkMode ? '#181818' : '#f5f5f5',
  BOXTHEMECOLOR: isDarkMode ? '#3c3e44' : '#FFF',
  BOXBORDERCOLOR: isDarkMode ? 'rgba(60, 62, 68, .5)' : '#f5f6f7',
  THEMEBLACK: isDarkMode ? '#121B24' : '#252525',
  THEMEDARKGREEN: isDarkMode ? '#2F3F4D' : '#407F2C',
  THEMEWHITE: isDarkMode ? '#121B24' : '#FFFFFF',
  TXTGREETING: isDarkMode ? '#898989' : 'rgba(0, 0, 0, .5)',
  TXTWHITE: isDarkMode ? '#FFF' : '#000',
  TXTTHEME: isDarkMode ? '#676C69' : '#25A31D',
  TXTGREY: isDarkMode ? '#676C69' : '#9E9E9E',
  TXTDARKGREY: isDarkMode ? '#505050' : '#9E9E9E',
  TXTBLACK: isDarkMode ? '#676c69' : '#252525',
  TXTBlue: isDarkMode ? '#6495ED' : '#000',
  BLUEWHITE: isDarkMode ? '#6495ED' : Colors.bluetheme,
  BLUEWHITETEXT: isDarkMode ? '#6495ED' : Colors.bluetheme,
  LOGINTHEMECOLOR: isDarkMode ? '#181818' : '#FFF',
  HEADERTHEMECOLOR: isDarkMode ? '#0f3479' : Colors.bluetheme,
  INPUTTXT: isDarkMode ? '#0f3479' : Colors.black,
}



class MyThemeClass {

  constructor(mode) {
    this.mode = mode;
  }
  getThemeColor = () => {
    return {
      WHITE: '#FFFFFF',
      TRANSPARENT: 'transparent',
      THEMECOLOR: this.mode === 'dark' ? '#181818' : '#f5f5f5',
      THEMECOLOR1: this.mode === 'dark' ? '#181818' : '#FFF',
      BOXTHEMECOLOR: this.mode === 'dark' ? '#3c3e44' : '#FFF',
      BOXBORDERCOLOR: this.mode === 'dark' ? 'rgba(60, 62, 68, .5)' : '#fff',
      BOXBORDERCOLOR1: this.mode === 'dark' ? 'rgba(60, 62, 68, .5)' : '#E9E9E9',
      BOXBORDERCOLOR2: this.mode === 'dark' ? 'rgba(60, 62, 68, .5)' : '#281E5D',
      THEMEBLACK: this.mode === 'dark' ? '#121B24' : '#252525',
      THEMEDARKGREEN: this.mode === 'dark' ? '#2F3F4D' : '#407F2C',
      THEMEWHITE: this.mode === 'dark' ? '#121B24' : '#FFFFFF',
      TXTGREETING: this.mode === 'dark' ? '#898989' : 'rgba(0, 0, 0, .5)',
      TXTWHITE: this.mode === 'dark' ? '#FFF' : '#000',
      TXTWHITE1: this.mode === 'dark' ? '#000' : '#FFF',
      TXTTHEME: this.mode === 'dark' ? '#676C69' : '#25A31D',
      TXTGREY: this.mode === 'dark' ? '#676C69' : '#9E9E9E',
      TXTDARKGREY: this.mode === 'dark' ? '#505050' : '#9E9E9E',
      TXTBLACK: this.mode === 'dark' ? '#676c69' : '#252525',
      TXTBlue: this.mode === 'dark' ? '#6495ED' : '#000',
      BLUEWHITE: this.mode === 'dark' ? '#6495ED' : Colors.bluetheme,
      BLUEWHITETEXT: this.mode === 'dark' ? '#6495ED' : Colors.bluetheme,
      LOGINTHEMECOLOR: this.mode === 'dark' ? '#181818' : '#FFF',
      LOGINTHEMECOLOR1: this.mode === 'dark' ? '#000' : '#fff',
      CONTENTHEADEROPACITY: this.mode === 'dark' ?  'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)',
      HEADERTHEMECOLOR: this.mode === 'dark' ? '#0f3479' : Colors.bluetheme,
      INPUTTXT: this.mode === 'dark' ? '#0f3479' : Colors.black,
      LIGHTGREY: this.mode === 'dark' ? '#84817a' : "#f5f5f5",
      TXTGREYS: this.mode === 'dark' ? 'grey' : '#84817a',
      GREY: this.mode === 'dark' ? '#808080' : '#f5f5f5',
      NEWGREY: this.mode === 'dark' ? '#808080' : '#dfe4ea',
      FOOTER: this.mode === 'dark' ? '#3c3e44' : '#f5f5f5',
      BORDER: this.mode === 'dark' ? 'grey' : '#e2e2e2',
      TRIP: this.mode === 'dark' ? '#0f3479' : '#FFF',
      TRIP1: this.mode === 'dark' ? '#6495ED' : '#FFF',
      TRIP2: this.mode === 'dark' ? '#f5f5f5' : "#000",
      RB: this.mode === 'dark' ? '#ecf0f1' : '#FFF',
      DRAWER: this.mode === 'dark' ? '#f5f6fa' : '#FFF',
      ICON: this.mode === 'dark' ? '#FFF' : Colors.bluetheme,
      CARD: this.mode === 'dark' ? '#e2e2e2' : '#ecf0f1',
      RB2: this.mode === 'dark' ? '#484848' : 'white',
      MODAL: this.mode === 'dark' ? '#9E9E9E' : '#a3bad357',
      TABLE: this.mode === 'dark' ? '#0f3479' : '#f1f8ff',
      CHECK: this.mode === 'dark' ? '#0f3479' : Colors.bluetheme1,
      AV: this.mode === 'dark' ? '#FFF' : '#9E9E9E',
      AV2: this.mode === 'dark' ? '#FFF' : '#252525',
      LOADER: this.mode === 'dark' ? 'rgba(60, 62, 62, .8)' : 'rgba(245, 245, 245, 0.9)',
      LABEL: this.mode === 'dark' ?  '#FFFFFF': '#0f3479',
      TEXTRED: this.mode === 'dark' ?  '#eb2f06':   '#ff3838',
      TEXTGREEN: this.mode === 'dark' ?  '#20bf6b':  '#4cd137',
      STARCOLOR: this.mode === 'dark' ?  '#f39c12':  '#ffd32a',
      BACKICON: this.mode === 'dark' ? '#FFF' : Colors.bluetheme,
      ICONINPUT: this.mode === 'dark' ? 'grey' : Colors.bluetheme,
      OTPBOXCOLOR: this.mode === 'dark' ? '#3c3e44' : Colors.Textinputbg,
      BORDERCOLOR: this.mode === 'dark' ? Colors.bluetheme : "#fff",
      ADDTOCARTBUTTONCOLOR:  this.mode === 'dark' ? "#0f3479" : Colors.bluetheme,
      MODAL: this.mode === 'dark' ? '#9E9E9E' : '#a3bad357',
     
    }

  }

}

export default { Color };
export { MyThemeClass }
