import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { VideoCard } from '~/components/VideoCard';

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

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Video List' }} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
});
