import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
}

export function VideoCard({ id, title, thumbnail }: VideoCardProps) {
  return (
    <Link href={`/video/${id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
          <View style={styles.playButton}>
            <Ionicons name="play-circle" size={40} color="#fff" />
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.metaInfo}>
            <View style={styles.channelInfo}>
              <View style={styles.channelAvatar}>
                <Ionicons name="person-circle" size={24} color="#666" />
              </View>
              <Text style={styles.channelName}>React Native Channel</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statText}>1.2M views</Text>
              <Text style={styles.statText}>•</Text>
              <Text style={styles.statText}>2 days ago</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#f0f0f0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelAvatar: {
    marginRight: 8,
  },
  channelName: {
    fontSize: 14,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});
