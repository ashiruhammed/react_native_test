import { StyleSheet, View, Platform } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  initialTime?: number;
  isPipEnabled?: boolean;
}

export function VideoPlayer({
  videoUrl,
  onTimeUpdate,
  initialTime,
  isPipEnabled = true,
}: VideoPlayerProps) {
  const lastTimeRef = useRef<number>(initialTime || 0);

  const player = useVideoPlayer(videoUrl, (player) => {
    if (initialTime) {
      player.currentTime = initialTime;
      lastTimeRef.current = initialTime;
    }
    player.play();
  });

  useEffect(() => {
    if (onTimeUpdate) {
      const interval = setInterval(() => {
        const currentTime = player.currentTime;
        const duration = player.duration;
        if (duration > 0) {
          lastTimeRef.current = currentTime;
          onTimeUpdate(currentTime, duration);
        }
      }, 1000);

      const subscription = player.addListener('timeUpdate', ({ currentTime }) => {
        const duration = player.duration;
        if (duration > 0) {
          lastTimeRef.current = currentTime;
          onTimeUpdate(currentTime, duration);
        }
      });

      return () => {
        clearInterval(interval);
        subscription.remove();
      };
    }
  }, [player, onTimeUpdate]);

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture={isPipEnabled && Platform.OS === 'ios'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});
