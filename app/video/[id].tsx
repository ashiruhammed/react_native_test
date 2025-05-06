import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { VideoPlayer } from '../../components/VideoPlayer';
import { useVideoStore } from '../../store/videoStore';

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const { videos, currentVideo, setCurrentVideo, updateVideoProgress, markVideoAsWatched } =
    useVideoStore();

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

  const handleMarkAsWatched = () => {
    markVideoAsWatched(currentVideo.id);
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                {currentVideo.duration ? formatTime(currentVideo.duration) : '00:00'}
              </Text>
            </View>
            {currentVideo.currentTime && currentVideo.duration && (
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {formatTime(currentVideo.currentTime)} / {formatTime(currentVideo.duration)}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.watchButton, currentVideo.isWatched && styles.watchedButton]}
            onPress={handleMarkAsWatched}>
            <Ionicons
              name={currentVideo.isWatched ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={20}
              color="white"
            />
            <Text style={styles.watchButtonText}>
              {currentVideo.isWatched ? 'Watched' : 'Mark as Watched'}
            </Text>
          </TouchableOpacity>
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
    marginBottom: 16,
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
  progressContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  watchedButton: {
    backgroundColor: '#2E7D32',
  },
  watchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
