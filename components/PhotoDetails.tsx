/**
 * Photo Details Component
 * Displays the captured photo
 * 
 * @format
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

interface PhotoDetailsProps {
  photoUri: string | null;
  onClose?: () => void;
}

function PhotoDetails({photoUri, onClose}: PhotoDetailsProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const textStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  if (!photoUri) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, textStyle]}>Captured Photo</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: photoUri}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {onClose && (
        <Text style={[styles.closeText, textStyle]} onPress={onClose}>
          Take Another Photo
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default PhotoDetails;

