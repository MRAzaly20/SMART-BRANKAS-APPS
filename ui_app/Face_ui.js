import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 29,
        position: "relative",
        top: 15,
        left: 10,
        color: '#585858',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 0.5 },
        textShadowRadius: 0.5
    },
    userName: {
        fontSize: 17,
        fontWeight: 'normal',
        //fontStyle:'italic',
        position: "relative",
        top: 20,
        left: 10,
        color: '#737373',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 0.5 },
        textShadowRadius: 0.1
    },
    userImg: {
        borderRadius: 100,
        width: 110,
        height: 110,
        position: 'relative',
        left: 215,
        top: -180,
        zIndex: 1000,
    },
    userbg: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: 'relative',
        left: 210,
        top: -65,
        borderRadius: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 10,
    },
    bodyCard: {
        position: "relative",
        top: 110,
        width: 360,
        height: 550,
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 3,
        backgroundColor: "rgba(222,222,222, 0.75)",
    },
    date: {
        position: "relative",
        top: 55,
        left: 11,
        color: '#737373'
    },
    userCard: {
        width: 340,
        height: 150,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        position: 'relative',
        top: 50,
        borderRadius: 20,
        left: 10,
        borderColor: '#fff',
        borderWidth: 1
    },
    cardOne: {
        width: 150,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 1)',
        //padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255,1)',
        position: "relative",
        top: 65,
        left: 15,

    },
    cardTwo: {
        width: 150,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 1)',
        //padding: 10,
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 255)',
        position: "relative",
        top: -85,
        left: 190
    },
    CardTr: {
        width: 150,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 1)',
        //padding: 10,
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 255)',
        position: "relative",
        top: -65,
        left: 190
    },
    Cardfr: {
        width: 150,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 1)',
        //padding: 10,
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 255)',
        position: "relative",
        top: -215,
        left: 15
    },
    text_sys: {
        position: 'relative',
        left: 10,
        top: 7,
        fontWeight: 'bold',
        color: '#a0a0a0',
        fontSize: 15
    },
    text_sysF: {
        position: 'relative',
        left: 10,
        top: 10,
        fontWeight: 'bold',
        color: '#a0a0a0',
        fontSize: 15
    },
    text_sysV: {
        position: 'relative',
        left: 10,
        top: 10,
        fontWeight: 'bold',
        color: '#a0a0a0',
        fontSize: 15
    },
    text_sysOpen: {
        position: 'relative',
        left: 10,
        top: 10,
        fontWeight: 'bold',
        color: '#a0a0a0',
        fontSize: 15
    },
    sw1: {
        position: 'relative',
        top: 5,
        right: 100
    },
    sw2: {
        position: 'relative',
        top: 5,
        right: 100

    },
    sw3: {
        position: 'relative',
        top: 10,
        right: 100

    },
    sw4: {
        position: 'relative',
        top: 10,
        right: 100
    },
    status1: {
        position: 'relative',
        bottom: 32,
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(0, 58, 225, 0.15)',
        borderColor: '#f1f1f1',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 25,
        borderRadius: 5,
        left: 80
    },
    status2: {
        position: 'relative',
        bottom: 32,
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(0, 58, 225, 0.15)',
        borderColor: '#f1f1f1',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 25,
        borderRadius: 5,
        left: 80
    },
    status3: {
        position: 'relative',
        bottom: 27,
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(0, 58, 225, 0.15)',
        borderColor: '#f1f1f1',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 25,
        borderRadius: 5,
        left: 80
    },
    status4: {
        position: 'relative',
        bottom: 27,
        margin: 0,
        padding: 0,
        backgroundColor: 'rgba(0, 58, 225, 0.15)',
        borderColor: '#f1f1f1',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 25,
        borderRadius: 5,
        left: 80
    },
    userNav: {
        width: 320,
        height: 70,
        backgroundColor: '#fff',
        position: 'relative',
        top: -30,
        left: 20,
        borderRadius: 30
    },
    btnClickContain: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        bottom: 565,
        left: 295,
        alignItems: 'center',
        backgroundColor: '#rgba(255, 255, 255, 0.9)',
        borderRadius: 50,
        width: 45,
        height: 45,
        elevation: 25, 
        zIndex: 100
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnIcon: {
        height: 25,
        width: 25,
        color: 'rgba(0,0,0, 0.6)',
    },
    btnText: {
        fontSize: 18,
        color: 'rgba(0,0,0, 0.6)',
        marginLeft: 10,
        marginTop: 2,
    }

})

module.exports = styles;

// const CardUI = () => {
//     return (
//         <View style={styles.container}>
//             <View style={
//                 styles.card
//             }>
//                 <Text style={styles.text}>Glassmorphism Card</Text>
//             </View>

//         </View >
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#000',
//     },
//     // ball: {
//     //     width: 150,
//     //     height: 150,
//     //     borderRadius: 15,
//     //     position: 'relative',
//     //     top: 100,
//     //     backgroundColor: 'rgba(0, 255, 255, 1)',
//     //     padding: 10,
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //     borderWidth: 1,
//     //     borderColor: 'rgba(255, 255, 255, 0.6)',

//     // },
//     card: {
//         width: 150,
//         height: 150,
//         borderRadius: 10,
//         backgroundColor: 'rgba(255, 255, 255, 0.3)',
//         //padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: 'rgba(255, 255, 255, 0.6)',
//         // Neumorphism effect

//     },
//     text: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });


// export default CardUI;
