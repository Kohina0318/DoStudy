
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text,Dimensions,useWindowDimensions } from 'react-native';
import Tts from 'react-native-tts';
import HTML from 'react-native-render-html';

const { width, height } = Dimensions.get('window');

const Support = () => {
  const { contentWidth } = useWindowDimensions();
 
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const htmlData = [
    "<p><a href=\"https://en.wikipedia.org/wiki/Cricket\">international cricketer</a> and the former captain of the <a href=\"https://en.wikipedia.org/wiki/India_national_cricket_team\">Indian national cricket team</a> who plays as a right-handed <a href=\"https://en.wikipedia.org/wiki/Batting_(cricket)\">batsman</a> for <a href=\"https://en.wikipedia.org/wiki/Royal_Challengers_Bangalore\">Royal Challengers Bangalore</a> in the <a href=\"https://en.wikipedia.org/wiki/Indian_Premier_League\">IPL</a> and for <a href=\"https://en.wikipedia.org/wiki/Delhi_cricket_team\">Delhi</a> in Indian domestic cricket. Widely</p>",
     "<p>&nbsp;regarded as one of the greatest batsmen of all time, and the best of the current generation <a href=\"https://en.wikipedia.org/wiki/Virat_Kohli#cite_note-indiatoday.intoday.in-4\">[4]</a> Kohli holds the records for scoring most runs in <a href=\"https://en.wikipedia.org/wiki/Twenty20_International\">T20 internationals</a> and in the IPL. In 2020, the <a href=\"https://en.wikipedia.org/wiki/International_Cricket_Council\">International Cricket Council</a> named him the <a href=\"https://en.wikipedia.org/wiki/ICC_Awards_of_the_Decade\">male cricketer of the decade</a>.&nbsp;</p>", "<p>Kohli has also contributed to India's successes, including winning the <a href=\"https://en.wikipedia.org/wiki/2011_Cricket_World_Cup\">2011 World Cup</a> and the <a href=\"https://en.wikipedia.org/wiki/2013_ICC_Champions_Trophy\">2013 Champions trophy</a>.</p>", "<p>Born and raised in New Delhi, Kohli trained at the <a href=\"https://en.wikipedia.org/wiki/West_Delhi_Cricket_Academy\">West Delhi Cricket Academy</a> and started his youth career with the Delhi Under-15 team.</p>", "<p>&nbsp;He made his international debut in 2008 and quickly became a key player in the ODI team and later made his Test debut in 2011. In 2013, Kohli reached the number one spot in the <a href=\"https://en.wikipedia.org/wiki/ICC_Men%27s_Player_Rankings\">ICC rankings</a> for ODI batsmen for the first time. During <a href=\"https://en.wikipedia.org/wiki/2014_ICC_World_Twenty20\">2014 T20 World Cup</a>, he set a record for the most runs scored in the tournament. In 2018, he achieved yet another milestone, becoming the world's top-ranked Test batsman, making him the only Indian cricketer to hold the number one spot in all three formats of the game. His form continued in 2019, when he became the first player to score 20,000 international runs in a single decade. In 2021, Kohli made the decision to step down as the captain of the Indian national team for T20Is, following the T20 World Cup and in early 2022 he stepped down as the captain of the Test team as well.</p>", "</p>"]
  

  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    Tts.addEventListener('tts-finish', handleTTSFinish);

    return () => {
      Tts.removeEventListener('tts-finish', handleTTSFinish);
    };
  }, []);


  const fetchAndSetVoice = async () => {
    try {
      const voices = await Tts.voices();
      console.log('Tts.voices..............',voices); 
      const desiredVoice = voices.find(voice => voice.id === 'hi-in-x-hid-local');
      if (desiredVoice) {
        Tts.setDefaultLanguage(desiredVoice.language)
        Tts.setDefaultVoice(desiredVoice.id); 
      } else {
        console.warn('Desired voice not found');
      }
    } catch (error) {
      console.error('Error fetching available voices:', error);
    }
  };

  useEffect(()=>{
    fetchAndSetVoice()
  },[])

  const handlePlay = (index) => {
    Tts.stop();
    setActiveIndex(index);
    setIsPlaying(true);
    setRecognizedText('');
    Tts.speak(htmlData[index].replace(/<[^>]+>/g, ''));
  };

  const handleTTSFinish = () => {
    const currentActiveIndex = activeIndexRef.current;
    if (currentActiveIndex !== -1 && currentActiveIndex < htmlData.length - 1) {
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
    if (index >= 0 && index < htmlData.length) {
      Tts.speak(htmlData[index].replace(/<[^>]+>/g, ''));
    }
  };

  
  

  return (
    <View style={{ margin: 50 }}>

<TouchableOpacity
        onPress={() => handlePlay(0)}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          margin: 5,
        }}
      >
        <Text style={{ color: '#fff' }}>Play</Text>
      </TouchableOpacity>
      
      {htmlData.map((html, index) => (
        <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
          <HTML
           contentWidth={contentWidth} 
          source={{ html:html }}
          enableExperimentalBRCollapsing={true}
          enableExperimentalGhostLinesPrevention={true}
          defaultViewProps={{ width:width*0.9 }}
          style={{
              fontSize: 16,
              fontWeight: activeIndex === index ? 'bold' : 'normal',
              color: activeIndex === index ? 'red' : '#000',
            }}
            tagsStyles={{  p: {
              fontSize: 16,
              color: activeIndex === index ? 'red' : '#000',
              textAlign: 'left',
              fontWeight: activeIndex === index ? 'bold' : 'normal',
              height: 'auto',
              width:"100%",
            },
            h2: {
              fontSize: 16,
              color: activeIndex === index ? 'red' : '#000',
              textAlign: 'left',
              fontWeight: activeIndex === index ? 'bold' : 'normal',
              height: 'auto',
              width:"100%",
            },
            ul: {
              fontSize: 16,
              color: "#000",
              height: 'auto',
              width:"100%",
            },
            li: {
              fontSize: 16,
              color: "#000",
              textAlign: 'left',
              height: 'auto',
              width:"100%",
            },
            span: {

              height: 'auto',
              width:"100%", 
            },
            body: {
              height: 'auto',
              width:"100%",
            },}}
           />
        </TouchableOpacity>
      ))}

     

      {isPlaying && (
        <TouchableOpacity onPress={handleStop}>
          <Text>Stop</Text>
        </TouchableOpacity>
      )}

      <Text>Recognized Text: {recognizedText}</Text>
    </View>
  );
};

export default Support;

/////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState, useEffect, useRef } from 'react';
// import { View, TouchableOpacity, Text, Dimensions, useWindowDimensions } from 'react-native';
// import Tts from 'react-native-tts';
// import PDFView from 'react-native-pdf-lib';

// const { width, height } = Dimensions.get('window');
// const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf'; // Replace with your PDF URL

// const Support = () => {
//   const { contentWidth } = useWindowDimensions();

//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [recognizedText, setRecognizedText] = useState('');

//   const activeIndexRef = useRef(activeIndex);

//   useEffect(() => {
//     activeIndexRef.current = activeIndex;
//   }, [activeIndex]);

//   useEffect(() => {
//     Tts.addEventListener('tts-finish', handleTTSFinish);

//     return () => {
//       Tts.removeEventListener('tts-finish', handleTTSFinish);
//     };
//   }, []);

//   const handlePlay = (index) => {
//     Tts.stop();
//     setActiveIndex(index);
//     setIsPlaying(true);
//     setRecognizedText('');
//     // Fetch the PDF content and extract the text of the selected page or paragraph
//     fetch(pdfUrl)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const pdfContent = reader.result;
//           // Extract the text from the PDF content based on the selected index
//           const selectedText = extractTextFromPdfContent(pdfContent, index);
//           Tts.speak(selectedText);
//         };
//         reader.readAsText(blob);
//       });
//   };

//   const handleTTSFinish = () => {
//     const currentActiveIndex = activeIndexRef.current;
//     if (currentActiveIndex !== -1 && currentActiveIndex < getPageCount()) {
//       handlePlay(currentActiveIndex + 1);
//     } else {
//       setIsPlaying(false);
//       setActiveIndex(-1);
//     }
//   };

//   const handleStop = () => {
//     Tts.stop();
//     setIsPlaying(false);
//     setActiveIndex(-1);
//   };

//   const handleTextClick = (index) => {
//     Tts.stop();
//     setActiveIndex(index);
//     setRecognizedText('');
//     handlePlay(index);
//   };

//   const getPageCount = () => {
//     // Implement logic to get the total page count of the PDF
//     // You can use a PDF parsing library or an API to retrieve this information
//     // For simplicity, let's assume the page count is 5
//     return 5;
//   };

//   const extractTextFromPdfContent = (pdfContent, index) => {
//     // Implement logic to extract text from the PDF content based on the selected index
//     // You can use a PDF parsing library or an API to extract the text
//     // For simplicity, let's assume each page contains a single paragraph
//     const paragraphs = pdfContent.split('\n\n');
//     return paragraphs[index];
//   };

//   return (
//     <View style={{ margin: 50 }}>
//       <TouchableOpacity
//         onPress={() => handlePlay(0)}
//         style={{
//           backgroundColor: 'blue',
//           padding: 10,
//           borderRadius: 5,
//           margin: 5,
//         }}
//       >
//         <Text style={{ color: '#fff' }}>Play</Text>
//       </TouchableOpacity>

//       {[...Array(getPageCount())].map((_, index) => (
//         <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: activeIndex === index ? 'bold' : 'normal',
//               color: activeIndex === index ? 'red' : '#000',
//             }}
//           >
//             Page {index + 1}
//           </Text>
//         </TouchableOpacity>
//       ))}

//       {isPlaying && (
//         <TouchableOpacity onPress={handleStop}>
//           <Text>Stop</Text>
//         </TouchableOpacity>
//       )}

//       <Text>Recognized Text: {recognizedText}</Text>
//     </View>
//   );
// };

// export default Support;




//////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect, useRef  } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { cancelAnimation } from 'react-native-reanimated';
// import Tts from 'react-native-tts';

// const Support = () => {

//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [activeIndex1, setActiveIndex1] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [recognizedText, setRecognizedText] = useState('');

//   // const textData = [
//   //   'बोलना वाक-शक्ति द्वारा ध्वनियों को जोड़कर बने एक विस्तृत शब्दकोश के शब्दों का प्रयोग कर के करी गई संचार की क्रिया को कहते हैं।',
//   //   'Speech is a human vocal communication using language. Each language uses phonetic combinations of vowel and consonant sounds that form the sound of its words, and using those words in their semantic ',
//   //   'आमतौर पर प्रभावशाली संचार के लिये बोलने में कम-से-कम १, ००० शब्दों का प्रयोग देखा गया है। हर शब्द को स्वर और व्यंजन वर्णों का स्वानिक मिश्रण कर के बनाया जाता है',
//   //   'ut labore et dolore magna aliqua.',
//   // ];

//   const textData = [
//     "", 
//     "<a href=\"https://en.wikipedia.org/wiki/Cricket\">international cricketer</a> and the former captain of the <a href=\"https://en.wikipedia.org/wiki/India_national_cricket_team\">Indian national cricket team</a> who plays as a right-handed <a href=\"https://en.wikipedia.org/wiki/Batting_(cricket)\">batsman</a> for <a href=\"https://en.wikipedia.org/wiki/Royal_Challengers_Bangalore\">Royal Challengers Bangalore</a> in the <a href=\"https://en.wikipedia.org/wiki/Indian_Premier_League\">IPL</a> and for <a href=\"https://en.wikipedia.org/wiki/Delhi_cricket_team\">Delhi</a> in Indian domestic cricket. Widely</p>", 
//     "&nbsp;regarded as one of the greatest batsmen of all time, and the best of the current generation <a href=\"https://en.wikipedia.org/wiki/Virat_Kohli#cite_note-indiatoday.intoday.in-4\">[4]</a> Kohli holds the records for scoring most runs in <a href=\"https://en.wikipedia.org/wiki/Twenty20_International\">T20 internationals</a> and in the IPL. In 2020, the <a href=\"https://en.wikipedia.org/wiki/International_Cricket_Council\">International Cricket Council</a> named him the <a href=\"https://en.wikipedia.org/wiki/ICC_Awards_of_the_Decade\">male cricketer of the decade</a>.&nbsp;</p>", 
//     "Kohli has also contributed to India's successes, including winning the <a href=\"https://en.wikipedia.org/wiki/2011_Cricket_World_Cup\">2011 World Cup</a> and the <a href=\"https://en.wikipedia.org/wiki/2013_ICC_Champions_Trophy\">2013 Champions trophy</a>.</p>", 
//     "Born and raised in New Delhi, Kohli trained at the <a href=\"https://en.wikipedia.org/wiki/West_Delhi_Cricket_Academy\">West Delhi Cricket Academy</a> and started his youth career with the Delhi Under-15 team.</p>", 
//     "&nbsp;He made his international debut in 2008 and quickly became a key player in the ODI team and later made his Test debut in 2011. In 2013, Kohli reached the number one spot in the <a href=\"https://en.wikipedia.org/wiki/ICC_Men%27s_Player_Rankings\">ICC rankings</a> for ODI batsmen for the first time. During <a href=\"https://en.wikipedia.org/wiki/2014_ICC_World_Twenty20\">2014 T20 World Cup</a>, he set a record for the most runs scored in the tournament. In 2018, he achieved yet another milestone, becoming the world's top-ranked Test batsman, making him the only Indian cricketer to hold the number one spot in all three formats of the game. His form continued in 2019, when he became the first player to score 20,000 international runs in a single decade. In 2021, Kohli made the decision to step down as the captain of the Indian national team for T20Is, following the T20 World Cup and in early 2022 he stepped down as the captain of the Test team as well.</p>"];


//   const activeIndexRef = useRef(activeIndex);
//   const activeIndexRef1 = useRef(activeIndex1);

//   useEffect(() => {
//     activeIndexRef.current = activeIndex;
//   }, [activeIndex]);

//   useEffect(() => {
//     activeIndexRef1.current = activeIndex1;
//   }, [activeIndex1]);

//   useEffect(() => {
//     Tts.addEventListener('tts-finish', handleTTSFinish);

//     return () => {
//       Tts.removeEventListener('tts-finish', handleTTSFinish);
//     };

//   }, []);

 

 
//   const handlePlay = (index) => {
//     Tts.stop();
//     setActiveIndex(index);
//     setIsPlaying(true);
//     setRecognizedText('');
//     Tts.speak(textData[index]);
//   };

//   const handleTTSFinish = () => {
   
//     const currentActiveIndex = activeIndexRef.current;
//     const currentActiveIndex1 = activeIndexRef1.current;
//     if (currentActiveIndex1 === 1 ) {
//       setIsPlaying(false);
//       setActiveIndex(-1);
//     } else if (currentActiveIndex !== -1 && currentActiveIndex < textData.length - 1) {
//       handlePlay(currentActiveIndex + 1);
//     } else {
//       setIsPlaying(false);
//       setActiveIndex(-1);
//     }
//   };

  
//   const handleStop = () => {
//     Tts.stop();
//     setIsPlaying(false);
//     setActiveIndex(-1);
//   };

//   const handleTextClick = (index) => {
//     Tts.stop();
//     setActiveIndex(index);
//     setRecognizedText('');
//     if (index >= 0 && index < textData.length) {
//       Tts.speak(textData[index]);
//       setActiveIndex1(1)
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

//       <TouchableOpacity onPress={() => handlePlay(0)} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, margin:5 }}>
//         <Text style={{color: "#fff"}}>Play</Text>
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