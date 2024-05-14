import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Image,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { ref, set } from "firebase/database";
import { db } from "./src/config";
import * as styles from "./ui_app/ui";
import {
  IconComponentProvider,
  Icon,
  IconButton,
  HStack,
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Switch } from "@react-native-material/core";
//import LottieView from 'lottie-react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import dayjs from "dayjs";
import { Routes } from "./userNavigation";
import * as LocalAuthentication from "expo-local-authentication";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

//const image = require("./assets/walpaper.jpg");
const image = {
  uri: "https://i2.wp.com/allpicts.in/wp-content/uploads/2016/11/Diagonal-Squares-2-for-Samsung-Galaxy-S7-and-Edge-Wallpaper.jpg?resize=768%2C1365",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function Settings({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [face_sys, setFacesys] = useState(true);
  const [fin_sys, setFinsys] = useState(true);
  const [vib_sys, setVibsys] = useState(true);
  const [lock_sys, setOpenState] = useState(true);

  console.log("face", face_sys);
  console.log("fin", fin_sys);
  console.log("vib", vib_sys);
  console.log("Open", lock_sys);

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

  const [date, setDate] = useState(dayjs());
  useEffect(() => {
    let timer = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const pushData = () => {
    const newValue = face_sys ? "DISABLE FACE" : "ENABLE FACE";
    set(ref(db, "ESP32/" + "FACE"), newValue);
  };
  const pushData2 = () => {
    const newValue = fin_sys ? "DISABLE FIN" : "ENABLE FIN";
    set(ref(db, "ESP32/" + "FINGER"), newValue);
  };
  const pushData3 = () => {
    const newValue = vib_sys ? "OFF" : "ON";
    set(ref(db, "ESP32/" + "VIB"), newValue);
  };
  const pushData4 = (DATA) => {
    //const newValue = lock_sys ? "OPEN" : "LOCK ";
    set(ref(db, "ESP32/" + "OPEN"), DATA);
  };
  const pushData5 = () => {
    //const newValue = lock_sys ? "OPEN" : "LOCK ";
    set(ref(db, "ESP32/" + "OPEN"), "LOCK");
  };

  return (
    <View style={styles.screenOne}>
      <ImageBackground
        source={image}
        style={{
          flex: 1,
          zIndex: 100,
          position: "relative",
          top: 0,
          height: 770,
        }}
      >
        <View style={styles.userCard}>
          <Text style={styles.welcome}>Welcome Home!</Text>
          <Text style={styles.userName}>Muhammad Ranah Azaly</Text>
          <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          ></View>
          <View style={styles.userbg}></View>
          <Image
            style={styles.userImg}
            source={{
              uri: "https://api.elearning.smtijogja.sch.id/api/v1/user-file/stream?file_uri=1859/other_information/ec98dacd-a086-4311-b383-0565d8c9c333.png",
            }}
          />
        </View>

        <View style={styles.bodyCard}>
          {/* <View style={styles.neumor} ></View> */}
          <View style={styles.cardOne}>
            <View style={{ position: "relative", left: 10 }}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="eye" size={65} color="rgba(0,119,255,0.5)" />
              </IconComponentProvider>
            </View>
            <Text style={styles.text_sys}>Face Recognition</Text>
            <Switch
              value={face_sys}
              onValueChange={(val) => {
                setFacesys(val);
                pushData();
              }}
              style={styles.sw1}
            />
            {/* <View style={styles.status1}>
                            <Text>on</Text>
                        </View> */}
          </View>

          <View style={styles.cardTwo}>
            <View style={{ position: "relative", left: 10, top: 5 }}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="fingerprint"
                  size={60}
                  color="rgba(255,25,100,0.5)"
                />
              </IconComponentProvider>
            </View>
            <Text style={styles.text_sysF}>Fingerprint</Text>
            <Switch
              value={fin_sys}
              onValueChange={(val) => {
                setFinsys(val);
                pushData2();
              }}
              style={styles.sw2}
            />
            {/* <View style={styles.status1}>
                            <Text>on</Text>
                        </View> */}
          </View>

          <View style={styles.CardTr}>
            <View style={{ position: "relative", left: 10, top: 5 }}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="lock-open"
                  size={55}
                  color="rgba(26, 164, 0, 0.7)"
                />
              </IconComponentProvider>
            </View>
            <Text style={styles.text_sysOpen}>Open / Lock</Text>
            <LinearGradient
              colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                marginLeft: 10,
                width: 60,
                height: 30,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                title="open"
                onPress={() => pushData4("OPEN")}
                style={{
                  borderRadius: 5,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 17 }}>open</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                marginLeft: 80,
                width: 60,
                height: 30,
                borderRadius: 5,
                marginTop: -30,
              }}
            >
              <TouchableOpacity
                title="open"
                onPress={() => pushData4("LOCK")}
                style={{
                  borderRadius: 5,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 17 }}>lock</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.Cardfr}>
            <View style={{ position: "relative", left: 10, top: 5 }}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon
                  name="bell-ring"
                  size={55}
                  color="rgba(238, 132, 40, .45)"
                />
              </IconComponentProvider>
            </View>
            <Text style={styles.text_sysV}>Vibration sensor</Text>
            <Switch
              value={vib_sys}
              onValueChange={(val) => {
                setVibsys(val);
                pushData3();
              }}
              style={styles.sw3}
            />
            {/* <View style={styles.status4}>
                            <Text>on</Text>
                        </View> */}
          </View>
        </View>
        <View style={styles.userNav}>
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
                <IconComponentProvider
                  onPress={() => navigation.navigate("Setting")}
                  IconComponent={MaterialCommunityIcons}
                >
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
              onPress={() => navigation.navigate("CCTV")}
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

        {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Button
        title="Press to Push fisrt data"
        onPress={pushData}
      />
      <Button
        title="Press to push second data"
        onPress={pushData1}
      /> */}
      </ImageBackground>
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
