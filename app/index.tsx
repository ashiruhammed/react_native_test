import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { VideoCard } from '../components/VideoCard';
import { useVideoStore } from '../store/videoStore';

export default function HomeScreen() {
  const { videos, loadVideos } = useVideoStore();

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Video Library</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});
