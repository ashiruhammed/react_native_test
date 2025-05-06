import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { VideoPlayer } from '~/components/VideoPlayer';
import { Ionicons } from '@expo/vector-icons';

const videos = [
  {
    id: '1',
    title: 'React Native Basics - Learn how to build amazing mobile apps',
    thumbnail: 'https://placehold.co/300x200',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description:
      "In this comprehensive tutorial, you'll learn the fundamentals of React Native and how to build your first mobile application. We'll cover everything from setup to deployment.",
    views: '1.2M',
    likes: '45K',
    uploadDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Advanced Navigation - Master React Navigation in 2024',
    thumbnail: 'https://placehold.co/300x200',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description:
      'Take your React Native navigation skills to the next level with this in-depth guide to React Navigation. Learn about nested navigators, deep linking, and more.',
    views: '856K',
    likes: '32K',
    uploadDate: '1 week ago',
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
      <Stack.Screen
        options={{
          title: video.title,
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView style={styles.container}>
        <VideoPlayer videoUrl={video.videoUrl} />
        <View style={styles.content}>
          <Text style={styles.title}>{video.title}</Text>

          <View style={styles.statsContainer}>
            <Text style={styles.stats}>
              {video.views} views • {video.uploadDate}
            </Text>
            <View style={styles.actions}>
              <Pressable style={styles.actionButton}>
                <Ionicons name="thumbs-up-outline" size={24} color="#666" />
                <Text style={styles.actionText}>{video.likes}</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Ionicons name="thumbs-down-outline" size={24} color="#666" />
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Ionicons name="share-outline" size={24} color="#666" />
                <Text style={styles.actionText}>Share</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.channelInfo}>
            <View style={styles.channelHeader}>
              <View style={styles.channelAvatar}>
                <Ionicons name="person-circle" size={40} color="#666" />
              </View>
              <View style={styles.channelDetails}>
                <Text style={styles.channelName}>React Native Channel</Text>
                <Text style={styles.subscriberCount}>1.5M subscribers</Text>
              </View>
              <Pressable style={styles.subscribeButton}>
                <Text style={styles.subscribeText}>Subscribe</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.description}>
            <Text style={styles.descriptionText}>{video.description}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stats: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  channelInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelAvatar: {
    marginRight: 12,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subscriberCount: {
    fontSize: 14,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    color: '#fff',
    fontWeight: '600',
  },
  description: {
    paddingTop: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
