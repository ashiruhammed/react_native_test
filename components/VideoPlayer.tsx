import { StyleSheet, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  initialTime?: number;
}

export function VideoPlayer({ videoUrl, onTimeUpdate, initialTime }: VideoPlayerProps) {
  const player = useVideoPlayer(videoUrl, (player) => {
    if (initialTime) {
      player.currentTime = initialTime;
    }
    player.play();
  });

  useEffect(() => {
    if (onTimeUpdate) {
      // Update progress every second
      const interval = setInterval(() => {
        const currentTime = player.currentTime;
        const duration = player.duration;
        if (duration > 0) {
          onTimeUpdate(currentTime, duration);
        }
      }, 1000);

      // Also listen for timeUpdate events for more frequent updates
      const subscription = player.addListener('timeUpdate', ({ currentTime }) => {
        const duration = player.duration;
        if (duration > 0) {
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
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
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
