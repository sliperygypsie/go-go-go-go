import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  onPress: () => void;
}

export function NoteCard({ title, content, createdAt, onPress }: NoteCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderColor: isDark ? '#333' : '#e0e0e0',
          },
        ]}>
        <ThemedText type="subtitle" style={styles.title} numberOfLines={1}>
          {title || 'Untitled Note'}
        </ThemedText>
        <ThemedText style={styles.content} numberOfLines={2}>
          {content || 'No content'}
        </ThemedText>
        <ThemedText style={styles.date}>
          {new Date(createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    marginBottom: 8,
    opacity: 0.7,
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
  },
});
