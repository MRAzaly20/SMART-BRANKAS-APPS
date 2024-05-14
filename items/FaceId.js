// import { Button, View, Animated, Easing, Text } from 'react-native';
// import * as styles from '../ui_app/Face_ui';

// export function FaceId({ navigation }) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.ball1}></View>
//         <View style={styles.ball1}></View>
//         <View style={styles.ball1}></View>
//         <View style={styles.ball1}></View>
//       </View>
//     );
//   }
import { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  IconComponentProvider,
  Icon,
  IconButton,
  HStack,
  VStack,
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ref, set, onValue, push, update, remove } from "firebase/database";
import { db } from "../src/config";
import { WebView } from "react-native-webview";
import * as LocalAuthentication from "expo-local-authentication";

export function FaceId({ navigation }) {
  const [Facedata, setFacedata] = useState("");
  const [MsgData, setMsgData] = useState("");
  const starCountRef = ref(db, "ESP32/stream_faceId");
  const startMsg = ref(db, "ESP32/message_rcv");
  const [modalVisible, setModalVisible] = useState(false);
  const [username, onChangeUser] = useState("");
  const [presentTodo, setPresentTodo] = useState("");
  // Tentukan panjang string yang habis dibagi 4
  //console.log(DataForFace);
  console.log(username);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        setFingerprint(true);
      }
    })();
  }, []);

  const handle = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      });
      if (biometricAuth.success) {
        navigation.navigate("DatabaseUser");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const FaceData64 = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.length > 0) {
        setFacedata(data);
      }
      //console.log(Facedata);
    });
    const StatusData = onValue(startMsg, (snapshot) => {
      const data = snapshot.val();
      if (data && data.length > 0) {
        setMsgData(data);
      }
      //console.log(Facedata);
    });

    return () => {
      FaceData64();
      StatusData();
    };
  }, []);

  const sendData = (Data) => {
    set(ref(db, "ESP32/" + "sendData"), Data);
  };
  const addUser = async (Data) => {
    await set(ref(db, "ESP32/" + "sendData"), "capture:" + Data)
      .then(() => {
        setModalVisible(false);
        onChangeUser("");
        push(ref(db, "ESP32/todos_data"), {
          done: false,
          title: Data,
        });
      })
      .catch((error) => {
        // Tangani kesalahan jika ada
        console.error(error);
      });
  };

  return (
    <View style={stylesApp.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesApp.centeredView}>
          <View style={stylesApp.modalView}>
            <View
              style={{
                backgroundColor: "rgba(16, 191, 255, 0.5)",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 30,
                marginTop: -10,
                borderRadius: 5,
              }}
            >
              <Text style={stylesApp.modalText}>PLease Enter Name</Text>
            </View>
            <TextInput
              style={stylesApp.input}
              onChangeText={onChangeUser}
              placeholder="Enter name"
            />
            <HStack
              spacing={10}
              style={{ position: "relative", left: "22%", bottom: -15 }}
            >
              <Pressable
                style={[stylesApp.button, stylesApp.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={stylesApp.textStyle}>cancel</Text>
              </Pressable>
              <Pressable
                style={[stylesApp.button, stylesApp.buttonCloseAdd]}
                onPress={() => addUser(username)}
              >
                <Text style={stylesApp.textStyle}>Add user</Text>
              </Pressable>
            </HStack>
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={["#0091ff", "#00ffe1"]}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={stylesApp.box}
      />

      <LinearGradient
        colors={["#0091ff", "#00ffe1"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={stylesApp.ball}
      ></LinearGradient>
      <View style={stylesApp.Frame}>
        <WebView
          style={stylesApp.web}
          originWhitelist={["*"]}
          source={{
            html: `
                        <body style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;"> 
                    <img style="width: 90%; height: 80%; border-radius: 26px; image-resolution: 300dpi;" src=${Facedata} />
                    </body>`,
          }}
        />
      </View>
      <View style={stylesApp.glassCard}>
        <LinearGradient
          colors={["rgba(16, 191, 255, 0.5)", "rgba(16, 191, 255, 0.5)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={stylesApp.stream_status}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>{MsgData}</Text>
        </LinearGradient>

        <HStack spacing={130} style={stylesApp.StackBg}>
          <VStack spacing={30} m={-100}>
            <LinearGradient
              colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={stylesApp.stream}
            >
              <TouchableOpacity
                onPress={() => sendData("stream")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={stylesApp.buttonText}>Stream</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={stylesApp.stream}
            >
              <TouchableOpacity
                onPress={() => sendData("detect")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={stylesApp.buttonText}>Detect</Text>
              </TouchableOpacity>
            </LinearGradient>
          </VStack>
          <VStack spacing={30} m={-100}>
            <LinearGradient
              colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={stylesApp.stream}
            >
              <TouchableOpacity
                onPress={() => sendData("recognise")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={stylesApp.buttonText}>Acces</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={stylesApp.stream}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={stylesApp.buttonText}>Add user</Text>
              </TouchableOpacity>
            </LinearGradient>
          </VStack>
        </HStack>
      </View>
      <View style={stylesApp.userNav}>
        <HStack
          m={4}
          spacing={6}
          style={{
            width: 272,
            height: 48,
            position: "relative",
            borderColor: "rgba(255,255,255,0.5)",
            borderWidth: 1.5,
            left: 20,
            top: 6,
            backgroundColor: "rgba(16, 191, 255, 0.5)",
            elevation: 25,
            borderRadius: 10,
          }}
        >
          <IconButton
            onPress={handle}
            icon={(props) => (
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="account-plus"
                  {...props}
                  style={{ color: "#fff" }}
                  size={30}
                />
              </IconComponentProvider>
            )}
          />
          <IconButton
            onPress={() => navigation.navigate("FaceId")}
            icon={(props) => (
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="eye"
                  {...props}
                  style={{ color: "#fff" }}
                  size={30}
                />
              </IconComponentProvider>
            )}
          />
          <IconButton
            onPress={() => navigation.navigate("Setting")}
            style={{
              backgroundColor: "rgba(7, 197, 19, 0.7)",
              elevation: 25,
              shadowOpacity: 1,
              shadowColor: "#000",
              borderColor: "rgba(255,255,255,0.5)",
              borderWidth: 1.5, // Soft shadow color
              shadowOffset: {
                width: 50,
                height: 50,
              },
              width: 55,
              height: 55,
              position: "relative",
              top: -6,
            }}
            icon={(props) => (
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="account"
                  {...props}
                  style={{ color: "#fff" }}
                  size={35}
                />
              </IconComponentProvider>
            )}
          />
          <IconButton
            onPress={() => navigation.navigate("MAPS")}
            icon={(props) => (
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="google-maps"
                  {...props}
                  style={{ color: "#fff" }}
                  size={30}
                />
              </IconComponentProvider>
            )}
          />
          <IconButton
            icon={(props) => (
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="cctv"
                  {...props}
                  style={{ color: "#fff" }}
                  size={30}
                />
              </IconComponentProvider>
            )}
          />
        </HStack>
      </View>
    </View>
  );
}

const stylesApp = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: "#ededed",
  },
  box: {
    width: 300,
    height: 300,
    borderRadius: 250,
    position: "relative",
    left: -100,
    top: -150,
  },
  StackBg: {
    position: "relative",
    left: "-30%",
    top: 130,
  },
  ball: {
    width: 300,
    height: 300,
    borderRadius: 250,
    position: "relative",
    left: 100,
    top: 130,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    position: "relative",
    left: 0,
    top: 5,
  },
  glassCard: {
    width: "105%",
    height: 220,
    backgroundColor: "rgba(255,255,255, 0.6)",
    borderRadius: 25,
    position: "relative",
    top: -610,
    left: "-2%",
    borderColor: "#fff",
    borderWidth: 2,
    elevation: 150,
  },
  Frame: {
    width: "105%",
    height: 340,
    backgroundColor: "rgba(255,255,255, 0.6)",
    borderRadius: 25,
    position: "relative",
    top: -630,
    left: "-2%",
    borderColor: "#fff",
    borderWidth: 2,
    elevation: 150,
  },
  stream: {
    width: 120,
    height: 45,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-evenly",
    position: "relative",
    left: 200,
    top: 6,
  },
  stream_status: {
    width: "80%",
    height: 45,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-evenly",
    position: "relative",
    left: "10%",
    top: 13,
    borderWidth: 1,
    borderColor: "#fff",
  },
  userNav: {
    width: 320,
    height: 70,
    backgroundColor: "#fff",
    position: "relative",
    top: -590,
    left: "-2%",
    borderRadius: 30,
  },
  Img: {
    position: "relative",
    left: 20,
    top: 20,
  },
  web: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255, 0)",
  },
  modalView: {
    margin: 45,
    marginTop: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 100,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#D70404",
  },
  buttonCloseAdd: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#fff",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderRadius: 5,
    borderColor: "rgba(16, 191, 255, 0.5)",
  },
});
