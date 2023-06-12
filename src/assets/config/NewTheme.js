import { useColorScheme} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../App'
// import { ThemeProvider } from 'styled-components';
// import { DarkTheme } from '@react-navigation/native';



const darkTheme = {
    background: "#1A1A1A",
    foreground: "#FAFAFA"
  };
  
  const lightTheme = {
    background: "#FAFAFA",
    foreground: "#1A1A1A",
  };

export default function NewTheme(props) {
   const mode = useSelector(state=>state.mode);
   const colorScheme = useColorScheme();
   
   React.useEffect(()=>{
     store.dispatch({type:'THEME_CHANGE',payload:colorScheme})
    },[colorScheme]);


  return (

   null
    // <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}/>
   
  )
}

export{darkTheme,lightTheme}