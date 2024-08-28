
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import styles from './styles';

export default function App() {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);

    const requestPermissions = async () => {
        // Request camera permission
        let { status: cameraStatus } =
            await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
            Alert.alert(
                'Permission needed',
                'Camera access is required to take photos. Please grant camera permission.'
            );
            cameraStatus = (await ImagePicker.requestCameraPermissionsAsync())
                .status;
            if (cameraStatus !== 'granted') return false;
        }

        // Request location permission
        let { status: locationStatus } =
            await Location.requestForegroundPermissionsAsync();
        if (locationStatus !== 'granted') {
            Alert.alert(
                'Permission needed',
                'Location access is required to tag your photos. Please grant location permission.'
            );
            locationStatus = (
                await Location.requestForegroundPermissionsAsync()
            ).status;
            if (locationStatus !== 'granted') return false;
        }

        return true;
    };

    const takePhoto = async () => {
        const permissionsGranted = await requestPermissions();
        if (!permissionsGranted) return;

        // Get current location
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
        });

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to App!</Text>
            <Button title="Take a Photo" onPress={takePhoto} />
            {image && (
                <ImageBackground source={{ uri: image }} style={styles.image}>
                    {location && (
                        <Text style={styles.locationText}>
                            Lat: {location.latitude}, Lon: {location.longitude}
                        </Text>
                    )}
                </ImageBackground>
            )}
            <StatusBar style="auto" />
        </View>
    );
}
