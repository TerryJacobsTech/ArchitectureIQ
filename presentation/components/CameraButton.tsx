/**
 * Camera Button Component (Presentation Layer)
 * Opens the device camera - presentation logic only
 * 
 * @format
 */

import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {launchCamera, ImagePickerResponse, CameraOptions} from 'react-native-image-picker';

interface CameraButtonProps {
  onPhotoTaken?: (photoUri: string) => void;
}

function CameraButton({onPhotoTaken}: CameraButtonProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1.0,
      saveToPhotos: false,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        // User cancelled
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (asset.uri && onPhotoTaken) {
          onPhotoTaken(asset.uri);
        }
      }
    });
  };

  return (
    <Pressable
      style={[
        styles.button,
        {backgroundColor: isDarkMode ? '#4A90E2' : '#007AFF'},
      ]}
      onPress={openCamera}
      android_ripple={{color: 'rgba(255, 255, 255, 0.3)'}}>
      <Text style={styles.cameraIcon}>📷</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cameraIcon: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default CameraButton;

