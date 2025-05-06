# React Native Video Streaming App

A modern video streaming application built with React Native and Expo, featuring video progress tracking, watch history, and a beautiful UI.

## Features

- 📱 Modern, responsive UI
- 🎥 Video playback with progress tracking
- 📊 Watch history and progress persistence
- 🔍 Video search and filtering
- 💾 Local storage for user preferences
- 🎯 Mark videos as watched
- ⏱️ Resume from last watched position

## Tech Stack

- React Native
- Expo
- expo-video for video playback
- AsyncStorage for local storage
- React Navigation for routing
- TypeScript for type safety

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd video-streaming-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your device:

- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Press 'i' for iOS simulator
- Press 'a' for Android emulator

## Project Structure

```
├── app/                    # Main application code
│   ├── index.tsx          # Home screen
│   └── video/             # Video player screens
├── components/            # Reusable components
├── utils/                 # Utility functions
├── store/                 # State management
└── assets/               # Static assets
```

## Features Implemented

1. **Video List**

   - Scrollable list of videos
   - Thumbnail preview
   - Video duration
   - Watch progress indicator

2. **Video Player**

   - Inline and fullscreen playback
   - Progress tracking
   - Play/pause controls
   - Time display

3. **Progress Tracking**

   - Save watch progress
   - Resume from last position
   - Mark videos as watched
   - Progress bar visualization

4. **Local Storage**
   - Save video progress
   - Store watch history
   - Persist user preferences

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes.
