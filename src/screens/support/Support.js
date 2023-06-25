import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';

const HTMLParagraph = ({ html }) => {
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    const onTtsFinish = () => {
      setIsSpeaking(false);
      setHighlightedWord(null);
    };

    Tts.addEventListener('tts-finish', onTtsFinish);

    return () => {
      Tts.removeEventListener('tts-finish', onTtsFinish);
    };
  }, []);

  const handleWordPress = (word) => {
    setHighlightedWord(word);
    Tts.speak(word);
  };

  // const handleWebViewMessage = (event) => {
  //   const word = event.nativeEvent.data;
  //   console.log("hgjjkkjk...",event)
  //   handleWordPress(word);
  // };

  const handleParagraphPress = (paragraph) => {
    Tts.stop();
    setHighlightedWord(null);
    const paragraphText = paragraph.replace(/<[^>]+>/g, '');
    Tts.speak(paragraphText);
  };

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    const data = JSON.parse(message);

    if (data.type === 'highlight') {
      setHighlightedWord(data.word);
    } else if (data.type === 'speak') {
      Tts.stop();
      setIsSpeaking(true);
      Tts.speak(data.word);
    }
  };

  const handleLineByLineSpeech = () => {
    webViewRef.current.injectJavaScript(`
      const paragraphs = Array.from(document.getElementsByTagName('p'));
      paragraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'speak', word: text }));
      });
    `);
    Tts.stop();
    setHighlightedWord(null);
    html.split('</p>').forEach((paragraph) => {
      const paragraphText = paragraph.replace(/<[^>]+>/g, '');
      Tts.speak(paragraphText);
    });
  };

  // const handleLineByLineSpeech = () => {
  //   Tts.stop();
  //   setHighlightedWord(null);
  //   html.split('</p>').forEach((paragraph) => {
  //     const paragraphText = paragraph.replace(/<[^>]+>/g, '');
  //     Tts.speak(paragraphText);
  //   });
  // };

  const handleStopSpeech = () => {
    Tts.stop();
    setHighlightedWord('');
  };

  const processedHtml = html.replace(/<p>/g, '<p onClick="onParagraphPress(this)">');

  const injectedJavaScript = `
    function onParagraphPress(paragraph) {
      const text = paragraph.textContent;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'highlight', word: text }));
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'speak', word: text }));
    }
  `;

  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={handleLineByLineSpeech}>
          <MaterialIcons name="ios-volume-high-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: processedHtml }}
        onMessage={handleWebViewMessage}
        injectedJavaScript={injectedJavaScript}
      />
      <TouchableOpacity onPress={handleStopSpeech}>
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Stop Speech
        </Text>
      </TouchableOpacity>
      {html.split('</p>').map((paragraph, index) => {
        const cleanedParagraph = paragraph.replace(/<[^>]+>/g, '');
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleParagraphPress(paragraph)}
          >
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: cleanedParagraph.includes(highlightedWord) ? '#fff' : '#000',
                backgroundColor:
                  cleanedParagraph.includes(highlightedWord) ? 'blue' : 'transparent',
              }}
            >
              {cleanedParagraph}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Support = () => {
  const htmlContent = `
    <p>बोलना वाक-शक्ति द्वारा ध्वनियों को जोड़कर बने एक विस्तृत शब्दकोश के शब्दों का प्रयोग कर के करी गई संचार की क्रिया को कहते हैं।</p>
    <p>Speech is a human vocal communication using language. </p>
    <p>This is the third paragraph.</p>
    <p>Each language uses phonetic combinations of vowel and consonant sounds that form the sound of its words, and using those words in their semantic</p>
    <p>आमतौर पर प्रभावशाली संचार के लिये बोलने में कम-से-कम १, ००० शब्दों का प्रयोग देखा गया है। </p>
    <p> हर शब्द को स्वर और व्यंजन वर्णों का स्वानिक मिश्रण कर के बनाया जाता है</p>
  `;

  return (
    <View>
      <HTMLParagraph html={htmlContent} />
    </View>
  );
};

export default Support;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { WebView } from 'react-native-webview';
// import Tts from 'react-native-tts';

// const HTMLParagraph = ({ html }) => {
//   const [highlightedWord, setHighlightedWord] = useState('');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isLineByLineSpeech, setIsLineByLineSpeech] = useState(false);
//  const [activeIndex, setActiveIndex] = useState(null);



//   useEffect(() => {
//     const onTtsFinish = () => {
//       setIsSpeaking(false);
//       setHighlightedWord('');
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
//     handleWordPress(word);
//   };

//   const handleParagraphPress = (paragraph) => {
//     setIsLineByLineSpeech(false);
//     Tts.stop();
// setHighlightedWord('');
//     const paragraphText = paragraph.replace(/<[^>]+>/g, '');
//     Tts.speak(paragraphText);
//   };

//   const handleLineByLineSpeech = () => {
//     setIsLineByLineSpeech(!isLineByLineSpeech);
//     setIsSpeaking(false);
//     Tts.stop();
//     setHighlightedWord('');
//     html.split('</p>').forEach((paragraph) => {
//       const paragraphText = paragraph.replace(/<[^>]+>/g, '');
//       Tts.speak(paragraphText);
//     });
//   };

//   return (
//     <View>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html }}
//         onMessage={handleWebViewMessage}
//       />
//       <Text style={{ textAlign: 'center' }}>
//         Highlighted Word: {highlightedWord}
//       </Text>
//       <TouchableOpacity onPress={handleLineByLineSpeech}>
//         <Text style={{ textAlign: 'center', marginTop: 10 }}>
//           Line By Line Speech
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
//     <p>This is the first paragraph.</p>
//     <p>This is the second paragraph.</p>
//     <p>This is the third paragraph.</p>
//     <p>This is the fourth paragraph.</p>
//     <p>This is the fifth paragraph.</p>
//     <p>This is the sixth paragraph.</p>
//   `;

//   return (
//     <View>
//       <HTMLParagraph html={htmlContent} />
//     </View>
//   );
// };

// export default Support;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Tts from 'react-native-tts';

// const Support = () => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [recognizedText, setRecognizedText] = useState('');

//   const textData = [
//     'बोलना वाक-शक्ति द्वारा ध्वनियों को जोड़कर बने एक विस्तृत शब्दकोश के शब्दों का प्रयोग कर के करी गई संचार की क्रिया को कहते हैं।',
//     'Speech is a human vocal communication using language. Each language uses phonetic combinations of vowel and consonant sounds that form the sound of its words, and using those words in their semantic ',
//     'आमतौर पर प्रभावशाली संचार के लिये बोलने में कम-से-कम १, ००० शब्दों का प्रयोग देखा गया है। हर शब्द को स्वर और व्यंजन वर्णों का स्वानिक मिश्रण कर के बनाया जाता है',
//     'ut labore et dolore magna aliqua.',
//   ];

//   useEffect(() => {
//     Tts.addEventListener('tts-finish', handleTTSFinish);

//     return () => {
//       Tts.removeEventListener('tts-finish', handleTTSFinish);
//     };
//   }, []);

//   const handleTTSFinish = () => {
//     if (activeIndex !== null && activeIndex < textData.length - 1) {
//       // Move to the next text if available
//       handlePlay(activeIndex + 1);
//     } else {
//       // All texts have been spoken or paused
//       setIsPlaying(false);
//       setActiveIndex(null);
//     }
//   };

//   const handlePlay = (index) => {
//     var data = textData.length
    
//     for (var i = 0; i < data; i++) {
//     setActiveIndex(i);
//     setIsPlaying(true);
//     setRecognizedText('');
//     Tts.speak(textData[i]);
    
//     }
//   };

  
//   const handleStop = () => {
//     Tts.stop();
//     setIsPlaying(false);
//     setActiveIndex(null);
//   };

//   const handleTextClick = (index) => {
//     setActiveIndex(index);
//     setRecognizedText('');
//     if (index >= 0 && index < textData.length) {
//       Tts.stop();
//       Tts.speak(textData[index]);
//     }
//   };

//   return (
//     <View style={{ margin: 50 }}>
//       {textData.map((text, index) => (
//         <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: activeIndex === index ? 'bold' : 'normal',
//               color: activeIndex === index ? 'red' : '#000',
//             }}
//           >
//             {text}
//           </Text>
//         </TouchableOpacity>
//       ))}
//       <Text>Recognized Text: {recognizedText}</Text>

//       <TouchableOpacity onPress={() => handlePlay(0)} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, color: "#fff" }}>
//         <Text>Play</Text>
//       </TouchableOpacity>

//       {isPlaying && (
//         <TouchableOpacity onPress={handleStop}>
//           <Text>Stop</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default Support;