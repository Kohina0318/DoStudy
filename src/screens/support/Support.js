// import React, { useState, useEffect,useRef } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { WebView } from 'react-native-webview';
// import MaterialIcons from 'react-native-vector-icons/Ionicons';
// import Tts from 'react-native-tts';

// const HTMLParagraph = ({ html }) => {
//   const [highlightedWord, setHighlightedWord] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const webViewRef = useRef(null);

//   useEffect(() => {
//     const onTtsFinish = () => {
//       setIsSpeaking(false);
//       setHighlightedWord(null);
//     };

//     Tts.addEventListener('tts-finish', onTtsFinish);

//     return () => {
//       Tts.removeEventListener('tts-finish', onTtsFinish);
//     };
//   }, []);

//   const handleWordPress = (word) => {
//     setHighlightedWord(word);
//     Tts.speak(word);
//   };

//   const handleWebViewMessage = (event) => {
//     const word = event.nativeEvent.data;
//     console.log("hgjjkkjk...",word)
//     handleWordPress(word);
//   };

//   const handleParagraphPress = (paragraph) => {
//     Tts.stop();
//     setHighlightedWord(null);
//     const paragraphText = paragraph.replace(/<[^>]+>/g, '');
//     Tts.speak(paragraphText);
//   };

//   // const handleWebViewMessage = (event) => {
//   //   const message = event.nativeEvent.data;
//   //   const data = JSON.parse(message);

//   //   if (data.type === 'highlight') {
//   //     setHighlightedWord(data.word);
//   //   } else if (data.type === 'speak') {
//   //     Tts.stop();
//   //     setIsSpeaking(true);
//   //     Tts.speak(data.word);
//   //   }
//   // };

//   // const handleLineByLineSpeech = () => {
//   //   webViewRef.current.injectJavaScript(`
//   //     const paragraphs = Array.from(document.getElementsByTagName('p'));
//   //     paragraphs.forEach((paragraph) => {
//   //       const text = paragraph.textContent;
//   //       window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'speak', word: text }));
//   //     });
//   //   `);
//   //   Tts.stop();
//   //   setHighlightedWord(null);
//   //   html.split('</p>').forEach((paragraph) => {
//   //     const paragraphText = paragraph.replace(/<[^>]+>/g, '');
//   //     Tts.speak(paragraphText);
//   //   });
//   // };

//   const handleLineByLineSpeech = () => {
//     Tts.stop();
//     setHighlightedWord(null);
//     html.split('</p>').forEach((paragraph) => {
//       const paragraphText = paragraph.replace(/<[^>]+>/g, '');
//       Tts.speak(paragraphText);
//     });
//   };

//   const handleStopSpeech = () => {
//     Tts.stop();
//     setHighlightedWord('');
//   };

//   // const processedHtml = html.replace(/<p>/g, '<p onClick="onParagraphPress(this)">');

//   // const injectedJavaScript = `
//   //   function onParagraphPress(paragraph) {
//   //     const text = paragraph.textContent;
//   //     window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'highlight', word: text }));
//   //     window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'speak', word: text }));
//   //   }
//   // `;

//   return (
//     <View>
//       <View style={{ alignItems: 'center', marginTop: 20 }}>
//         <TouchableOpacity onPress={handleLineByLineSpeech}>
//           <MaterialIcons name="ios-volume-high-outline" size={40} color="black" />
//         </TouchableOpacity>
//       </View>
//       <WebView
//         ref={webViewRef}
//         originWhitelist={['*']}
//         // source={{ html: processedHtml }}
//         source={{ html }}
//         onMessage={handleWebViewMessage}
//         // injectedJavaScript={injectedJavaScript}
//       />
//       <TouchableOpacity onPress={handleStopSpeech}>
//         <Text style={{ textAlign: 'center', marginTop: 10 }}>
//           Stop Speech
//         </Text>
//       </TouchableOpacity>
//       {html.split('</p>').map((paragraph, index) => {
//         const cleanedParagraph = paragraph.replace(/<[^>]+>/g, '');
//         return (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleParagraphPress(paragraph)}
//           >
//             <Text
//               style={{
//                 paddingHorizontal: 10,
//                 paddingVertical: 5,
//                 color: cleanedParagraph.includes(highlightedWord) ? '#fff' : '#000',
//                 backgroundColor:
//                   cleanedParagraph.includes(highlightedWord) ? 'blue' : 'transparent',
//               }}
//             >
//               {cleanedParagraph}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const Support = () => {
//   const htmlContent = `
//     <p>बोलना वाक-शक्ति द्वारा ध्वनियों को जोड़कर बने एक विस्तृत शब्दकोश के शब्दों का प्रयोग कर के करी गई संचार की क्रिया को कहते हैं।</p>
//     <p>Speech is a human vocal communication using language. </p>
//     <p>This is the third paragraph.</p>
//     <p>Each language uses phonetic combinations of vowel and consonant sounds that form the sound of its words, and using those words in their semantic</p>
//     <p>आमतौर पर प्रभावशाली संचार के लिये बोलने में कम-से-कम १, ००० शब्दों का प्रयोग देखा गया है। </p>
//     <p> हर शब्द को स्वर और व्यंजन वर्णों का स्वानिक मिश्रण कर के बनाया जाता है</p>
//   `;

//   return (
//     <View>
//       <HTMLParagraph html={htmlContent} />
//     </View>
//   );
// };

// export default Support;


////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect,useRef } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { WebView } from 'react-native-webview';
// import MaterialIcons from 'react-native-vector-icons/Ionicons';
// import Tts from 'react-native-tts';

// const Support = (props ) => {

//   const textData = `
//     <p>बोलना वाक-शक्ति द्वारा ध्वनियों को जोड़कर बने एक विस्तृत शब्दकोश के शब्दों का प्रयोग कर के करी गई संचार की क्रिया को कहते हैं।</p>
//     <p>Speech is a human vocal communication using language. </p>
//     <p>This is the third paragraph.</p>
//     <p>Each language uses phonetic combinations of vowel and consonant sounds that form the sound of its words, and using those words in their semantic</p>
//     <p>आमतौर पर प्रभावशाली संचार के लिये बोलने में कम-से-कम १, ००० शब्दों का प्रयोग देखा गया है। </p>
//     <p> हर शब्द को स्वर और व्यंजन वर्णों का स्वानिक मिश्रण कर के बनाया जाता है</p>
//   `;

 
//   const [activeIndex, setActiveIndex] = useState(-1);
//     const [activeIndex1, setActiveIndex1] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [recognizedText, setRecognizedText] = useState('');
  

//     const activeIndexRef = useRef(activeIndex);
//       const activeIndexRef1 = useRef(activeIndex1);
    
//       useEffect(() => {
//         activeIndexRef.current = activeIndex;
//       }, [activeIndex]);
    
//       useEffect(() => {
//         activeIndexRef1.current = activeIndex1;
//       }, [activeIndex1]);
    
//       useEffect(() => {
//         Tts.addEventListener('tts-finish', handleTTSFinish);
    
//         return () => {
//           Tts.removeEventListener('tts-finish', handleTTSFinish);
//         };
//       }, []);
    
//   const handleWordPress = (word) => {
//     setHighlightedWord(word);
//     Tts.speak(word);
//   };

//   const handleWebViewMessage = (event) => {
//     const word = event.nativeEvent.data;
//     handleWordPress(word);
//   };

  
//     const handlePlay = (index) => {
//         Tts.stop();
//         setActiveIndex(index);
//         setIsPlaying(true);
//         setRecognizedText('');
//         const paragraphText = textData.replace(/<[^>]+>/g, '');
//         Tts.speak(paragraphText);
//         // Tts.speak(textData[index]);
//       };
    
//       const handleTTSFinish = () => {
       
//         const currentActiveIndex = activeIndexRef.current;
//         const currentActiveIndex1 = activeIndexRef1.current;
//         if (currentActiveIndex1 === 1 ) {
//           setIsPlaying(false);
//           setActiveIndex(-1);
//         } else if (currentActiveIndex !== -1 && currentActiveIndex < textData.length - 1) {
//           handlePlay(currentActiveIndex + 1);
//         } else {
//           setIsPlaying(false);
//           setActiveIndex(-1);
//         }
//       };
  
//       const handleStop = () => {
//         Tts.stop();
//         setIsPlaying(false);
//         setActiveIndex(-1);
//       };
    
//       const handleTextClick = (index) => { 
//         Tts.stop();
//         setActiveIndex(index);
//         setRecognizedText('');
//         if (index >= 0 && index < textData.length) {
//           const paragraphText = textData.replace(/<[^>]+>/g, '');
//           Tts.speak(paragraphText);
//           // Tts.speak(textData[index]);
//           setActiveIndex1(1)
//         }
//       };
    


//       return (
//             <View style={{ margin: 50 }}>
//                 {textData.split('</p>').map((text, index) => {
//                   const cleanedParagraph = text.replace(/<[^>]+>/g, '');

//                   return(
//                 <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       fontWeight: activeIndex === index ? 'bold' : 'normal',
//                       color: activeIndex === index ? 'red' : '#000',
//                     }}
//                   >
//                     {cleanedParagraph}
//                   </Text>
//                 </TouchableOpacity>
//                   )
// })}
//               <Text>Recognized Text: {recognizedText}</Text>
        
//               <TouchableOpacity onPress={() => handlePlay(0)} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, margin:5 }}>
//                 <Text style={{color: "#fff"}}>Play</Text>
//               </TouchableOpacity>
        
//               {isPlaying && (
//                 <TouchableOpacity onPress={handleStop}>
//                   <Text>Stop</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           );
// };

// export default Support;







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cancelAnimation } from 'react-native-reanimated';
import Tts from 'react-native-tts';

const Support = () => {

  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const textData = [
    'बोलना वाक-शक्ति द्वारा ध्वनियों को जोड़कर बने एक विस्तृत शब्दकोश के शब्दों का प्रयोग कर के करी गई संचार की क्रिया को कहते हैं।',
    'Speech is a human vocal communication using language. Each language uses phonetic combinations of vowel and consonant sounds that form the sound of its words, and using those words in their semantic ',
    'आमतौर पर प्रभावशाली संचार के लिये बोलने में कम-से-कम १, ००० शब्दों का प्रयोग देखा गया है। हर शब्द को स्वर और व्यंजन वर्णों का स्वानिक मिश्रण कर के बनाया जाता है',
    'ut labore et dolore magna aliqua.',
  ];

  const activeIndexRef = useRef(activeIndex);
  const activeIndexRef1 = useRef(activeIndex1);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    activeIndexRef1.current = activeIndex1;
  }, [activeIndex1]);

  useEffect(() => {
    Tts.addEventListener('tts-finish', handleTTSFinish);

    return () => {
      Tts.removeEventListener('tts-finish', handleTTSFinish);
    };

  }, []);

 

 
  const handlePlay = (index) => {
    Tts.stop();
    setActiveIndex(index);
    setIsPlaying(true);
    setRecognizedText('');
    Tts.speak(textData[index]);
  };

  const handleTTSFinish = () => {
   
    const currentActiveIndex = activeIndexRef.current;
    const currentActiveIndex1 = activeIndexRef1.current;
    if (currentActiveIndex1 === 1 ) {
      setIsPlaying(false);
      setActiveIndex(-1);
    } else if (currentActiveIndex !== -1 && currentActiveIndex < textData.length - 1) {
      handlePlay(currentActiveIndex + 1);
    } else {
      setIsPlaying(false);
      setActiveIndex(-1);
    }
  };

  
  const handleStop = () => {
    Tts.stop();
    setIsPlaying(false);
    setActiveIndex(-1);
  };

  const handleTextClick = (index) => {
    Tts.stop();
    setActiveIndex(index);
    setRecognizedText('');
    if (index >= 0 && index < textData.length) {
      Tts.speak(textData[index]);
      setActiveIndex1(1)
    }
  };

  return (
    <View style={{ margin: 50 }}>
      {textData.map((text, index) => (
        <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: activeIndex === index ? 'bold' : 'normal',
              color: activeIndex === index ? 'red' : '#000',
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ))}
      <Text>Recognized Text: {recognizedText}</Text>

      <TouchableOpacity onPress={() => handlePlay(0)} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, margin:5 }}>
        <Text style={{color: "#fff"}}>Play</Text>
      </TouchableOpacity>

      {isPlaying && (
        <TouchableOpacity onPress={handleStop}>
          <Text>Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Support;