import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVideoStore } from '../store/videoStore';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterType = 'all' | 'watched' | 'unwatched';

export default function Home() {
  const { videos, loadVideos, getFilteredVideos } = useVideoStore();
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadVideos();
  }, []);

  const filteredVideos = getFilteredVideos(filter);

  const renderFilterButton = (filterType: FilterType, label: string) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.activeFilterButton]}
      onPress={() => setFilter(filterType)}>
      <Text
        style={[styles.filterButtonText, filter === filterType && styles.activeFilterButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Library</Text>
        <View style={styles.filterContainer}>
          {renderFilterButton('all', 'All')}
          {renderFilterButton('watched', 'Watched')}
          {renderFilterButton('unwatched', 'Unwatched')}
        </View>
      </View>

      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/video/${item.id}`} asChild>
            <TouchableOpacity style={styles.videoCard}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.isWatched && (
                  <View style={styles.watchedBadge}>
                    <Text style={styles.watchedText}>Watched</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.videoList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  videoList: {
    padding: 16,
  },
  videoCard: {
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
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#eee',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  watchedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  watchedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
