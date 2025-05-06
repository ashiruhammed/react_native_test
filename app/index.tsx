import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { VideoCard } from '~/components/VideoCard';

const videos = [
  {
    id: '1',
    title: 'React Native Basics - Learn how to build amazing mobile apps',
    thumbnail: 'https://i.ytimg.com/vi/VozPNrt-LfE/maxresdefault.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: '2',
    title: 'Advanced Navigation - Master React Navigation in 2024',
    thumbnail: 'https://i.ytimg.com/vi/9XZEdCHZv4I/maxresdefault.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
];

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Discover',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending Videos</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search" size={24} color="#666" style={styles.icon} />
            <Ionicons name="notifications-outline" size={24} color="#666" style={styles.icon} />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
