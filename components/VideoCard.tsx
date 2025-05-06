import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
}

export function VideoCard({ id, title, thumbnail }: VideoCardProps) {
  return (
    <Link href={`/video/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
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
    backgroundColor: '#f0f0f0',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});
