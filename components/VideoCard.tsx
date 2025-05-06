import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getVideoProgress, formatTime } from '~/utils/videoProgress';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
}

export function VideoCard({ id, title, thumbnail }: VideoCardProps) {
  const [progress, setProgress] = useState<{
    currentTime: number;
    duration: number;
    isWatched: boolean;
  } | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const videoProgress = await getVideoProgress(id);
    setProgress(videoProgress);
  };

  return (
    <Link href={`/video/${id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
          <View style={styles.playButton}>
            <Ionicons name="play-circle" size={40} color="#fff" />
          </View>
          {progress && progress.duration > 0 && (
            <>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${(progress.currentTime / progress.duration) * 100}%` },
                  ]}
                />
              </View>
              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>
                  {formatTime(progress.currentTime)} / {formatTime(progress.duration)}
                </Text>
              </View>
            </>
          )}
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
            {progress?.isWatched && (
              <View style={styles.watchedContainer}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.watchedText}>Watched</Text>
              </View>
            )}
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
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff0000',
  },
  durationContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
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
  watchedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  watchedText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
});
