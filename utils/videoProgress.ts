import AsyncStorage from '@react-native-async-storage/async-storage';

interface VideoProgress {
  currentTime: number;
  duration: number;
  isWatched: boolean;
}

const PROGRESS_KEY = '@video_progress';

export const saveVideoProgress = async (videoId: string, progress: VideoProgress) => {
  try {
    const existingData = await AsyncStorage.getItem(PROGRESS_KEY);
    const progressData = existingData ? JSON.parse(existingData) : {};
    progressData[videoId] = progress;
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving video progress:', error);
  }
};

export const getVideoProgress = async (videoId: string): Promise<VideoProgress | null> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    if (data) {
      const progressData = JSON.parse(data);
      return progressData[videoId] || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting video progress:', error);
    return null;
  }
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};
