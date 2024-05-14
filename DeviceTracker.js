import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    _getLocationAsync();
  }, []);

  const _handleMapRegionChange = (newRegion) => {
    // Only update the state if the map is ready to prevent excessive re-renders
    if (isMapReady) {
      setMapRegion(newRegion);
    }
  };

  const _handleMapReady = () => {
    setIsMapReady(true);
  };

  const _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationResult('Permission to access location was denied');
    } else {
      setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocationResult(JSON.stringify(location));

    // Center the map on the location we just fetched.
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>

      {locationResult === null ? (
        <ActivityIndicator />
      ) : hasLocationPermissions === false ? (
        <Text>Location permissions are not granted.</Text>
      ) : mapRegion === null ? (
        <Text>Map region doesn't exist.</Text>
      ) : (
        <MapView
          style={{ alignSelf: 'stretch', height: 570 }}
          region={mapRegion}
          onRegionChangeComplete={_handleMapRegionChange} // Use onRegionChangeComplete
          onLayout={_handleMapReady}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsPointsOfInterest={true} // Call _handleMapReady when the map layout is complete
        />
      )}

      <Text>Location: {locationResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
