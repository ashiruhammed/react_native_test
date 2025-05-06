import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Video } from '../store/videoStore';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const progress =
    video.currentTime && video.duration ? (video.currentTime / video.duration) * 100 : 0;

  const formatTime = (seconds?: number) => {
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Link href={`/video/${video.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="white" />
          </View>
          {video.currentTime && video.duration && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(video.currentTime)} / {formatTime(video.duration)}
              </Text>
            </View>
          )}
          {video.isWatched && (
            <View style={styles.watchedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="white" />
              <Text style={styles.watchedText}>Watched</Text>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
        </View>
        {progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 22,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff0000',
  },
  timeContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  watchedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  watchedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});
