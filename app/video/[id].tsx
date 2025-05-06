import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { VideoPlayer } from '../../components/VideoPlayer';
import { useVideoStore } from '../../store/videoStore';

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const {
    videos,
    currentVideo,
    setCurrentVideo,
    updateVideoProgress,
    markVideoAsWatched,
    addComment,
    deleteComment,
  } = useVideoStore();
  const [commentText, setCommentText] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videos.find((v) => v.id === id);
    if (video) {
      setCurrentVideo(video);
    }
  }, [id, videos]);

  if (!currentVideo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Video not found</Text>
      </View>
    );
  }

  const handleTimeUpdate = async (currentTime: number, duration: number) => {
    await updateVideoProgress(currentVideo.id, currentTime, duration);
  };

  const handleMarkAsWatched = async () => {
    setIsLoading(true);
    try {
      await markVideoAsWatched(currentVideo.id);
    } catch (error) {
      Alert.alert('Error', 'Failed to mark video as watched');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    setIsLoading(true);
    try {
      await addComment(currentVideo.id, commentText.trim(), currentVideo.currentTime || 0);
      setCommentText('');
      setIsAddingComment(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    Alert.alert('Delete Comment', 'Are you sure you want to delete this comment?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);
          try {
            await deleteComment(currentVideo.id, commentId);
          } catch (error) {
            Alert.alert('Error', 'Failed to delete comment');
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: currentVideo.title,
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.videoContainer}>
          <VideoPlayer
            videoUrl={currentVideo.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            initialTime={currentVideo.currentTime}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{currentVideo.title}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.statText}>
                {currentVideo.duration ? formatTime(currentVideo.duration) : '00:00'}
              </Text>
            </View>
            {currentVideo.currentTime && currentVideo.duration && (
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {formatTime(currentVideo.currentTime)} / {formatTime(currentVideo.duration)}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.watchButton, currentVideo.isWatched && styles.watchedButton]}
            onPress={handleMarkAsWatched}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Ionicons
                  name={currentVideo.isWatched ? 'checkmark-circle' : 'checkmark-circle-outline'}
                  size={20}
                  color="white"
                />
                <Text style={styles.watchButtonText}>
                  {currentVideo.isWatched ? 'Watched' : 'Mark as Watched'}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Comments</Text>
            {!isAddingComment ? (
              <TouchableOpacity
                style={styles.addCommentButton}
                onPress={() => setIsAddingComment(true)}
                disabled={isLoading}>
                <Ionicons name="add-circle-outline" size={20} color="#4CAF50" />
                <Text style={styles.addCommentText}>Add Comment</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  value={commentText}
                  onChangeText={setCommentText}
                  placeholder="Write your comment..."
                  multiline
                  editable={!isLoading}
                />
                <View style={styles.commentInputButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setCommentText('');
                      setIsAddingComment(false);
                    }}
                    disabled={isLoading}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.submitButton, isLoading && styles.disabledButton]}
                    onPress={handleAddComment}
                    disabled={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {currentVideo.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentTimestamp}>{formatTime(comment.timestamp)}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteComment(comment.id)}
                    style={styles.deleteButton}
                    disabled={isLoading}>
                    <Ionicons name="trash-outline" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  watchedButton: {
    backgroundColor: '#2E7D32',
  },
  watchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  commentsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  addCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addCommentText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontSize: 16,
  },
  commentInputContainer: {
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  commentInputButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cancelButton: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  commentItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
  commentText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
});
