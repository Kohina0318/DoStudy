import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/ModelsCss/SucessModelStyle';
import Icon from 'react-native-vector-icons/AntDesign';


export default ChosseFileTypeModal = props => {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);

    const handleClickOnDone = () => {
        props.setFileType('image')
        setModalVisible(!modalVisible)
        props.setShowmodal(false)
        props.onpressPhoto()
    };

    const handleClickOnDoneV = () => {
        props.setFileType('video')
        setModalVisible(!modalVisible)
        props.setShowmodal(false)
        props.onpressVideo()
    };

    const handleClickOnCancle = () => {
        setModalVisible(!modalVisible);
        props.setShowmodal(false)
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
                <View style={{ ...styles.modalView, backgroundColor: themecolor.TXTWHITE1 }}>
                    <View style={styles.ModalViewWidth}>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => handleClickOnCancle()} style={{width:"100%", justifyContent:"flex-end", alignItems:"flex-end", alignSelf:"flex-end", marginTop:-20}}>
                                <Icon name="closecircleo" size={25} color={themecolor.TEXTRED} />
                        </TouchableOpacity>

                        <Text allowFontScaling={false} style={{ ...styles.submittext, color: themecolor.TXTWHITE, fontWeight: "700" }}>
                            Choose upload file type
                        </Text>
                        <View style={styles.ModelVideoCenter1}>

                            <TouchableOpacity activeOpacity={0.5} onPress={() => handleClickOnDone()} style={{ padding: 10, borderRadius: 5, margin: 10 }}>
                                <Image
                                    source={require('../../../assets/images/imageIcon.jpg')}
                                    style={styles.img}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.5} onPress={() => handleClickOnDoneV()} style={{ padding: 10, borderRadius: 5, margin: 10 }}>
                                <Image
                                    source={require('../../../assets/images/allvideos.png')}
                                    style={styles.img}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
