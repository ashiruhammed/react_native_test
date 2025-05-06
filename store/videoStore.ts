import { create } from 'zustand';

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
  createdAt: Date;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration?: number;
  currentTime?: number;
  isWatched?: boolean;
  lastWatchedAt?: Date;
  comments: Comment[];
}

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  setCurrentVideo: (video: Video | null) => void;
  updateVideoProgress: (videoId: string, currentTime: number, duration: number) => void;
  markVideoAsWatched: (videoId: string) => void;
  addComment: (videoId: string, text: string, timestamp: number) => void;
  deleteComment: (videoId: string, commentId: string) => void;
  loadVideos: () => void;
  getFilteredVideos: (filter: 'all' | 'watched' | 'unwatched') => Video[];
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
            lastWatchedAt: new Date(),
          }
        : video
    );

    set({ videos: updatedVideos });
  },

  markVideoAsWatched: (videoId) => {
    const { videos } = get();
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, isWatched: true, lastWatchedAt: new Date() } : video
    );

    set({ videos: updatedVideos });
  },

  addComment: (videoId, text, timestamp) => {
    const { videos } = get();
    const updatedVideos = videos.map((video) =>
      video.id === videoId
        ? {
            ...video,
            comments: [
              ...video.comments,
              {
                id: Date.now().toString(),
                text,
                timestamp,
                createdAt: new Date(),
              },
            ],
          }
        : video
    );

    set({ videos: updatedVideos });
  },

  deleteComment: (videoId, commentId) => {
    const { videos } = get();
    const updatedVideos = videos.map((video) =>
      video.id === videoId
        ? {
            ...video,
            comments: video.comments.filter((comment) => comment.id !== commentId),
          }
        : video
    );

    set({ videos: updatedVideos });
  },

  getFilteredVideos: (filter) => {
    const { videos } = get();
    switch (filter) {
      case 'watched':
        return videos.filter((video) => video.isWatched);
      case 'unwatched':
        return videos.filter((video) => !video.isWatched);
      default:
        return videos;
    }
  },

  loadVideos: () => {
    const mockVideos: Video[] = [
      {
        id: '1',
        title: 'React Native Basics - Learn how to build amazing mobile apps',
        thumbnail: 'https://i.ytimg.com/vi/VozPNrt-LfE/maxresdefault.jpg',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        comments: [],
      },
      {
        id: '2',
        title: 'Advanced Navigation - Master React Navigation in 2024',
        thumbnail: 'https://i.ytimg.com/vi/9XZEdCHZv4I/maxresdefault.jpg',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        comments: [],
      },
    ];

    set({ videos: mockVideos });
  },
}));
