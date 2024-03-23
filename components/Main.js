import { Text, View, Pressable, Image, ImageBackground, TextInput, Modal} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { useFonts } from "expo-font"
import styles from "./styles";
import colors from "../assets/colors/colors";
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';

export default function Main(){
    const [text, setText] = useState('Hello, how are you?');
    const [counter, setCounter] = useState(10);
    const [translatedText, setTranslatedText] = useState('');
    const [textToSend,setTextToSend] = useState('Hello,%20how%20are%20you?');
    const [doTranslate,setDoTranslate] = useState(false);
    const [visibleOne, setVisibleOne] = useState(false);
    const [visibleTwo, setVisibleTwo] = useState(false);
    const [translateFrom, setTranslateFrom] = useState('English');
    const [translateTo, setTranslateTo] = useState('French');
    const [selectedContainerFrom, setSelectedContainerFrom] = useState('English');
    const [selectedContainerTo, setSelectedContainerTo] = useState('French');

    const icons_expand = {
        expand_down_active: require('../assets/images/expand_down_active.png'),
        expand_down: require('../assets/images/expand_down.png'),
    }

    const sourceOne = selectedContainerFrom === 'Spanish' ? icons_expand.expand_down_active : icons_expand.expand_down;
    const sourceTwo = selectedContainerTo === 'Spanish' ? icons_expand.expand_down_active : icons_expand.expand_down;

    const onChangeText =(newText) =>{
        setText(newText);
        setCounter(newText.length);
    }

    let [fontsLoaded] = useFonts({
        'DMSans-SemiBold': require('../assets/fonts/DMSans-SemiBold.ttf'),
        'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf')
    });
    useEffect(() => {
        if (fontsLoaded){
          SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        const getData = async ()=>{
            try{
                const response =  await fetch(`https://api.mymemory.translated.net/get?q=${textToSend}&langpair=${translateFrom}|${translateTo}`);
                const data = await response.json();
                setTranslatedText(data.responseData.translatedText);
            }catch(error){
                console.error("Error during getting data ",error);
            }
        };
        getData();
    }, [doTranslate]);
    
    useEffect(() => {
        const encodeText = text.replace(/ /g,'%20');
        setTextToSend(encodeText);
    }, [text]); 

    if (!fontsLoaded){
        return null;
    }

    const getFirstContainerStyle = (containerName)=>{
        const isSelected = containerName === selectedContainerFrom;
        return {
            containerStyle: isSelected ? {...styles.containerModal, backgroundColor:colors.greyOne, borderRadius: 10 } : styles.containerModal,
            textStyle: isSelected ? {color: 'white', fontFamily:'DMSans-Bold'} : {color:colors.greyOne, fontFamily:'DMSans-Bold' }
        }
    };
    const getSecondContainerStyle = (containerName)=>{
        const isSelected = containerName === selectedContainerTo;
        return {
            containerStyle: isSelected ? {...styles.containerModal, backgroundColor:colors.greyOne, borderRadius: 10} : styles.containerModal,
            textStyle: isSelected ? {color: 'white', fontFamily:'DMSans-Bold'} : {color:colors.greyOne, fontFamily:'DMSans-Bold' }
        }
    };

    const handleChooseLanguageFrom = (languageName)=>{
        setVisibleOne(!visibleOne);
        setTranslateFrom(languageName);
        setSelectedContainerFrom(languageName);
    };
    const handleChooseLanguageTo = (languageName)=>{
        setVisibleTwo(!visibleTwo);
        setTranslateTo(languageName);
        setSelectedContainerTo(languageName);
    };

    const handleTransition = ()=>{
        const from = translateFrom;
        const to = translateTo;
        setTranslateFrom(to);
        setTranslateTo(from);
        setSelectedContainerFrom(to);
        setSelectedContainerTo(from);
    };

    const handleCopyText = async ()=>{ 
        try{
            await Clipboard.setStringAsync(text);
        }catch(error){
            console.error("Error during coping text", error);
        }
    };
    
    const handleCopyTranslatedText = async ()=>{ 
        try{
            await Clipboard.setStringAsync(translatedText);
        }catch(error){
            console.error("Error during coping text", error);
        }
    };

    return(
        <View style={{flex:1}}>
            <ImageBackground 
                style={styles.bacgroundImage}
                source={require("../assets/images/hero_img.jpg")}
                resizeMode='cover'
                >
                <Text style={styles.textHeader}>translated.io</Text>
                <View style={{flex:1,justifyContent:'space-between'}}>
                    <View style={styles.containerOne}>
                        <View style={styles.headerContainerOne}>
                        <View style={styles.wrapperHeader}>
                            <View style={getFirstContainerStyle('English').containerStyle}>
                                <Text style={getFirstContainerStyle('English').textStyle}>English</Text>
                            </View>
                            <View style={getFirstContainerStyle('French').containerStyle}>
                                <Text style={getFirstContainerStyle('French').textStyle}>French</Text>
                            </View>
                            <Pressable style={getFirstContainerStyle('Spanish').containerStyle} onPress={()=> setVisibleOne(true)}>
                                <Text style={getFirstContainerStyle('Spanish').textStyle}>Spanish</Text>
                                <Image style={{width: 15, height:15}} source={sourceOne}/>
                            </Pressable>
                        </View>
                        <Modal visible={visibleOne} transparent={true} animationType="fade" >
                            <View style={styles.containerExpandMenuOne}>
                                <Pressable onPress={()=> handleChooseLanguageFrom('English')}>
                                    <Text style={styles.textExpandMenu}>English</Text>
                                </Pressable>
                                <Pressable onPress={()=> handleChooseLanguageFrom('French')}>
                                    <Text style={styles.textExpandMenu}>French</Text>
                                </Pressable>
                                <Pressable onPress={()=> handleChooseLanguageFrom('Spanish')}>
                                    <Text style={styles.textExpandMenu}>Spanish</Text>
                                </Pressable>
                            </View>
                        </Modal>
                        </View>
                        <View style={styles.wrapperContent}>
                            <TextInput 
                                style={styles.typedText}
                                onChangeText={onChangeText}
                                value={text}
                                maxLength={250}
                                multiline={true}
                            />
                            <View>
                                <View style={styles.containerCounter}>
                                    <Text style={styles.textCounter}>{counter}/250</Text>
                                </View>
                                <View style={styles.containerIcons}>
                                    <View style={styles.wrapperContainer}>
                                        <Pressable style={styles.containerIcon} onPress={()=>{Speech.speak(text, {language:`'${translateFrom}'`})}}>
                                            <Image source={require('../assets/images/sound.png')}/>
                                        </Pressable>
                                        <Pressable style={styles.containerIcon} onPress={handleCopyText}>
                                            <Image source={require('../assets/images/copy.png')}/>
                                        </Pressable>
                                    </View>
                                    <Pressable onPress={()=> setDoTranslate(!doTranslate)} style={styles.containerButton}>
                                        <Image style={styles.translateIcon} source={require('../assets/images/translate.png')}/>
                                        <Text style={styles.translateText}>Translate</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerTwo}>
                    <View style={styles.headerContainerTwo}>
                        <View style={styles.wrapperHeader}>
                            <View style={getSecondContainerStyle('English').containerStyle}>
                                <Text style={getSecondContainerStyle('English').textStyle}>English</Text>
                            </View>
                            <View style={getSecondContainerStyle('French').containerStyle}>
                                <Text style={getSecondContainerStyle('French').textStyle}>French</Text>
                            </View>
                            <Pressable style={getSecondContainerStyle('Spanish').containerStyle} onPress={()=> setVisibleTwo(true)}>
                                <Text style={getSecondContainerStyle('Spanish').textStyle}>Spanish</Text>
                                <Image style={{width: 15, height:15}} source={sourceTwo}/>
                            </Pressable>
                        </View>
                        <Modal visible={visibleTwo} transparent={true} animationType="fade" >
                            <View style={styles.containerExpandMenuTwo}>
                                <Pressable onPress={()=> handleChooseLanguageTo('English')}>
                                    <Text style={styles.textExpandMenu}>English</Text>
                                </Pressable>
                                <Pressable onPress={()=> handleChooseLanguageTo('French')}>
                                    <Text style={styles.textExpandMenu}>French</Text>
                                </Pressable>
                                <Pressable onPress={()=> handleChooseLanguageTo('Spanish')}>
                                    <Text style={styles.textExpandMenu}>Spanish</Text>
                                </Pressable>
                            </View>
                        </Modal>
                        <Pressable style={styles.containerIcon} onPress={handleTransition}>
                            <Image source={require('../assets/images/switch.png')}/>
                        </Pressable>
                        </View>
                        <View style={styles.wrapperContent}>
                            <Text style={styles.translatedText}>{translatedText}</Text>
                            <View style={styles.containerIcons}>
                                <View style={styles.wrapperContainer}>
                                    <Pressable style={styles.containerIcon} onPress={()=>{Speech.speak(translatedText, {language:`'${translateTo}'`})}}>
                                        <Image source={require('../assets/images/sound.png')}/>
                                    </Pressable>
                                    <Pressable style={styles.containerIcon} onPress={handleCopyTranslatedText}>
                                        <Image source={require('../assets/images/copy.png')}/>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};