/**
 * Home Page Component (Presentation Layer)
 * Main page component - presentation logic only
 * 
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import CameraButton from './CameraButton';
import BuildingAnalysis from './BuildingAnalysis';

function HomePage(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const textStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const handlePhotoTaken = (uri: string) => {
    setPhotoUri(uri);
  };

  const handleClosePhoto = () => {
    setPhotoUri(null);
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <BuildingAnalysis photoUri={photoUri} onClose={handleClosePhoto} />
      ) : (
        <>
          <View style={styles.content}>
            <Text style={[styles.title, textStyle]}>Architecture IQ</Text>
            <Text style={[styles.subtitle, textStyle]}>
              Discover building information and architecture with your phones
              camera or saved photos.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CameraButton onPhotoTaken={handlePhotoTaken} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});

export default HomePage;

