import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NoteCard } from '@/components/note-card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    initUser();
  }, []);

  const initUser = async () => {
    const tempUserId = 'demo-user-' + Math.random().toString(36).substring(7);
    setUserId(tempUserId);
    loadNotes(tempUserId);
  };

  const loadNotes = async (uid: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error loading notes:', error);
      Alert.alert('Error', 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleNotePress = (note: Note) => {
    Alert.alert(
      note.title || 'Untitled',
      note.content || 'No content',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteNote(note.id),
        },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const { error } = await supabase.from('notes').delete().eq('id', noteId);

      if (error) throw error;

      setNotes(notes.filter((n) => n.id !== noteId));
      Alert.alert('Success', 'Note deleted');
    } catch (error) {
      console.error('Error deleting note:', error);
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  const handleCreateNote = () => {
    Alert.prompt(
      'New Note',
      'Enter note title:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create',
          onPress: async (title) => {
            if (!title || !userId) return;

            Alert.prompt(
              'Note Content',
              'Enter note content:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Save',
                  onPress: async (content) => {
                    try {
                      const { data, error } = await supabase
                        .from('notes')
                        .insert({
                          title: title || 'Untitled',
                          content: content || '',
                          user_id: userId,
                        })
                        .select()
                        .single();

                      if (error) throw error;

                      setNotes([data, ...notes]);
                      Alert.alert('Success', 'Note created');
                    } catch (error) {
                      console.error('Error creating note:', error);
                      Alert.alert('Error', 'Failed to create note');
                    }
                  },
                },
              ],
              'plain-text'
            );
          },
        },
      ],
      'plain-text'
    );
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">My Notes</ThemedText>
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: isDark ? '#0066cc' : '#007AFF' },
          ]}
          onPress={handleCreateNote}>
          <IconSymbol name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol
            name="doc.text"
            size={64}
            color={isDark ? '#666' : '#ccc'}
          />
          <ThemedText style={styles.emptyText}>No notes yet</ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Tap the + button to create your first note
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              id={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.created_at}
              onPress={() => handleNotePress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 8,
    textAlign: 'center',
  },
});
