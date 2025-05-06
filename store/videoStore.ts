import { create } from 'zustand';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration?: number;
  currentTime?: number;
  isWatched?: boolean;
}

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  setCurrentVideo: (video: Video | null) => void;
  updateVideoProgress: (videoId: string, currentTime: number, duration: number) => void;
  markVideoAsWatched: (videoId: string) => void;
  loadVideos: () => void;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  currentVideo: null,

  setCurrentVideo: (video) => set({ currentVideo: video }),

  updateVideoProgress: (videoId, currentTime, duration) => {
    const { videos } = get();
    const updatedVideos = videos.map((video) =>
      video.id === videoId
        ? {
            ...video,
            currentTime,
            duration,
            isWatched: currentTime / duration >= 0.9,
          }
        : video
    );

    set({ videos: updatedVideos });
  },

  markVideoAsWatched: (videoId) => {
    const { videos } = get();
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, isWatched: true } : video
    );

    set({ videos: updatedVideos });
  },

  loadVideos: () => {
    // Mock video data
    const mockVideos: Video[] = [
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

    set({ videos: mockVideos });
  },
}));
