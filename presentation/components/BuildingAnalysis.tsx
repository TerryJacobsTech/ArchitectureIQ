/**
 * Building Analysis Component (Presentation Layer)
 * Displays building analysis results - presentation logic only
 * 
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Building} from '../../domain/entities/Building';
import {useAppContext} from '../context/AppContext';

interface BuildingAnalysisProps {
  photoUri: string;
  onClose?: () => void;
}

function BuildingAnalysis({
  photoUri,
  onClose,
}: BuildingAnalysisProps): React.JSX.Element {
  const {analyzeBuildingUseCase} = useAppContext();
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState<Building | null>(null);
  const [error, setError] = useState<string | null>(null);

  const textStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
  };

  useEffect(() => {
    processImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoUri]);

  const processImage = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await analyzeBuildingUseCase.execute(photoUri);
      setBuilding(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);
      Alert.alert('Analysis Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, textStyle]}>Building Analysis</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{uri: photoUri}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, textStyle]}>
              Analyzing building...
            </Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, textStyle]}>Error: {error}</Text>
            <Text
              style={[styles.retryText, textStyle]}
              onPress={processImage}>
              Retry
            </Text>
          </View>
        )}

        {building && !loading && (
          <View style={styles.resultsContainer}>
            {building.hasName() && (
              <View style={styles.resultSection}>
                <Text style={[styles.label, textStyle]}>Building Name:</Text>
                <Text style={[styles.value, textStyle]}>{building.name}</Text>
              </View>
            )}

            {building.hasArchitectureStyle() && (
              <View style={styles.resultSection}>
                <Text style={[styles.label, textStyle]}>
                  Architecture Style:
                </Text>
                <Text style={[styles.value, textStyle]}>
                  {building.architectureStyle}
                </Text>
              </View>
            )}

            <View style={styles.resultSection}>
              <Text style={[styles.label, textStyle]}>Description:</Text>
              <Text style={[styles.description, textStyle]}>
                {building.description}
              </Text>
            </View>
          </View>
        )}

        {onClose && (
          <Text style={[styles.closeText, textStyle]} onPress={onClose}>
            Take Another Photo
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
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
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#007AFF',
  },
  resultsContainer: {
    width: '100%',
    marginTop: 10,
  },
  resultSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  closeText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
    color: '#007AFF',
  },
});

export default BuildingAnalysis;

