import { StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors/colors";
const window = Dimensions.get("window");

const styles = StyleSheet.create({
    textHeader:{
        color:'white',
        fontFamily:'DMSans-SemiBold',
        marginTop:window.height*0.1
    },
    bacgroundImage:{
        flex:1,
        alignItems:'center'
    },
    containerOne:{
        backgroundColor:colors.darkTwo,
        margin:20,
        width:window.width*0.95,
        height:window.height*0.4,
        borderRadius: 30,
        borderColor:colors.greyOne,
        borderWidth:2
    },
    containerTwo:{
        backgroundColor:colors.darkOne,
        margin:20,
        width:window.width*0.95,
        height:window.height*0.4,
        borderRadius: 30,
        borderColor:colors.greyOne,
        borderWidth:1
    },
    textLanguage:{
        color:colors.greyOne, 
        fontFamily:'DMSans-SemiBold',
        padding: 5
    },
    headerContainerOne:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:window.height*0.1,
        borderBottomWidth: 1,
        borderBottomColor:colors.greyOne,
        marginHorizontal:10,
        marginBottom:20,
        alignItems:'center'
    },
    typedText:{
        fontFamily:'DMSans-Bold',
        color:'white', 
        marginHorizontal:10
    },
    textCounter:{
        color:colors.greyOne, 
        fontSize:12, 
        fontFamily:'DMSans-SemiBold'
    },
    containerIcon:{
        borderWidth:1, 
        borderColor:colors.greyOne, 
        width:30,
        padding:2,
        margin:2,
        borderRadius:8
    },
    containerCounter:{
        flexDirection:'row-reverse',
        margin:10
    },
    containerIcons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:10,
        marginBottom:10
    },
    containerButton:{
        backgroundColor:colors.strongBlue, 
        borderRadius:10,
        padding:5,
        marginRight:10,
        borderColor:colors.lightBlue,
        borderWidth:1,
        width: window.width*0.32,
        height: window.height*0.05,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    translateIcon:{
        width:30, 
        height:35
    },
    translateText:{
        color:'white', 
        fontFamily:'DMSans-Bold'
    },
    headerContainerTwo:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:window.height*0.1,
        borderBottomWidth: 1,
        borderBottomColor:colors.greyOne,
        marginHorizontal:10,
        marginBottom:20
    },
    wrapperContainer:{
        flexDirection:'row'
    },
    translatedText:{
        fontFamily:'DMSans-Bold',
        color:'white', 
        marginHorizontal:10,
        marginBottom:20
    },
    
    containerModal:{
        height:window.height*0.05,
        width:window.width*0.2,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    containerExpandMenuOne:{
        backgroundColor:colors.darkOne,
        borderRadius: 10,
        position:'absolute',
        left:window.width*0.45,
        width:window.width*0.20,
        marginTop: window.height*0.19,
        padding:5,
    },
    containerExpandMenuTwo:{
        backgroundColor: colors.darkOne,
        borderRadius: 10,
        position:'absolute',
        left:window.width*0.45,
        width:window.width*0.20,
        marginTop: window.height*0.65,
        padding:5,
    },
    textExpandMenu:{
        color:colors.greyOne, 
        fontSize:12,
        fontFamily:'DMSans-SemiBold',
        margin:2
    },
    wrapperHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    wrapperContent:{
        flex:1,
        justifyContent:'space-between'
    }
});
export default styles;