
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