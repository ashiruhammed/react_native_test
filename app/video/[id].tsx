import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { VideoPlayer } from '../../components/VideoPlayer';
import { useVideoStore } from '../../store/videoStore';

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const { videos, currentVideo, setCurrentVideo, updateVideoProgress } = useVideoStore();

  useEffect(() => {
    const video = videos.find((v) => v.id === id);
    if (video) {
      setCurrentVideo(video);
    }
  }, [id, videos]);

  if (!currentVideo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Video not found</Text>
      </View>
    );
  }

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    updateVideoProgress(currentVideo.id, currentTime, duration);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: currentVideo.title,
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.videoContainer}>
          <VideoPlayer
            videoUrl={currentVideo.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            initialTime={currentVideo.currentTime}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{currentVideo.title}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.statText}>
                {currentVideo.duration ? Math.floor(currentVideo.duration / 60) : 0} min
              </Text>
            </View>
            {currentVideo.isWatched && (
              <View style={styles.watchedContainer}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.watchedText}>Watched</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  watchedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  watchedText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
