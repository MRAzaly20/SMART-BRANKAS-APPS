import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  ref, onValue
} from 'firebase/database';
import { db } from './src/config';

export function Tracker({ navigation }) {
  const [latitudeData, setLatitude] = useState(null);
  const [longitudeData, setLongitude] = useState(null);

  const starCountRef = ref(db, 'ESP32/LAT');
  const startMsg = ref(db, 'ESP32/LNG');

  useEffect(() => {
    const latData = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const floatNumberLat = parseFloat(data);
        setLatitude(floatNumberLat);
      }
    });

    const lngData = onValue(startMsg, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const floatNumberLNG = parseFloat(data);
        setLongitude(floatNumberLNG);
      }
    });

    return () => {
      latData();
      lngData();
    };
  }, []);

  // Tambahkan kondisi untuk menunggu data tersedia sebelum rendering peta
  if (latitudeData === null || longitudeData === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Tampilkan indikator loading atau pesan lainnya */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitudeData,
          longitude: longitudeData,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          description="Delivery person 1"
          coordinate={{ latitude: latitudeData, longitude: longitudeData }}
        />
      </MapView>
    </SafeAreaView>
  );
}
