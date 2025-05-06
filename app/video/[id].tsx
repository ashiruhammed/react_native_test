import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { VideoPlayer } from '~/components/VideoPlayer';

const videos = [
  {
    id: '1',
    title: 'React Native Basics',
    thumbnail: 'https://placehold.co/300x200',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: '2',
    title: 'Advanced Navigation',
    thumbnail: 'https://placehold.co/300x200',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
];

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return (
      <View style={styles.container}>
        <Text>Video not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: video.title }} />
      <View style={styles.container}>
        <VideoPlayer videoUrl={video.videoUrl} />
        <View style={styles.info}>
          <Text style={styles.title}>{video.title}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});
