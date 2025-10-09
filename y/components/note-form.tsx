import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface NoteFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function NoteForm({
  initialTitle = '',
  initialContent = '',
  onSubmit,
  onCancel,
  submitLabel = 'Save',
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSubmit = async () => {
    if (!title.trim() && !content.trim()) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit(title, content);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.titleInput,
          {
            color: isDark ? '#fff' : '#000',
            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
          },
        ]}
        placeholder="Note title"
        placeholderTextColor={isDark ? '#666' : '#999'}
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />
      <TextInput
        style={[
          styles.contentInput,
          {
            color: isDark ? '#fff' : '#000',
            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
          },
        ]}
        placeholder="Note content"
        placeholderTextColor={isDark ? '#666' : '#999'}
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        editable={!loading}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={loading}>
          <ThemedText style={styles.buttonText}>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.submitButton,
            { backgroundColor: isDark ? '#0066cc' : '#007AFF' },
          ]}
          onPress={handleSubmit}
          disabled={loading || (!title.trim() && !content.trim())}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={[styles.buttonText, { color: '#fff' }]}>{submitLabel}</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  contentInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
