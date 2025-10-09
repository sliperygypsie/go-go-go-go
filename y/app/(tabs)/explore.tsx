import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';

interface Stats {
  totalNotes: number;
  notesThisWeek: number;
  notesThisMonth: number;
}

export default function ExploreScreen() {
  const [stats, setStats] = useState<Stats>({ totalNotes: 0, notesThisWeek: 0, notesThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const { count: total } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true });

      const { count: week } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      const { count: month } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthAgo.toISOString());

      setStats({
        totalNotes: total || 0,
        notesThisWeek: week || 0,
        notesThisMonth: month || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title">Statistics</ThemedText>
          <TouchableOpacity onPress={loadStats}>
            <IconSymbol name="arrow.clockwise" size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                borderColor: isDark ? '#333' : '#e0e0e0',
              },
            ]}>
            <IconSymbol name="doc.text" size={32} color="#007AFF" />
            <ThemedText style={styles.statNumber}>{stats.totalNotes}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Notes</ThemedText>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                borderColor: isDark ? '#333' : '#e0e0e0',
              },
            ]}>
            <IconSymbol name="calendar" size={32} color="#34C759" />
            <ThemedText style={styles.statNumber}>{stats.notesThisWeek}</ThemedText>
            <ThemedText style={styles.statLabel}>This Week</ThemedText>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                borderColor: isDark ? '#333' : '#e0e0e0',
              },
            ]}>
            <IconSymbol name="chart.bar" size={32} color="#FF9500" />
            <ThemedText style={styles.statNumber}>{stats.notesThisMonth}</ThemedText>
            <ThemedText style={styles.statLabel}>This Month</ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              borderColor: isDark ? '#333' : '#e0e0e0',
            },
          ]}>
          <ThemedText type="subtitle" style={styles.infoTitle}>
            About This App
          </ThemedText>
          <ThemedText style={styles.infoText}>
            This is a notes app built with Expo and React Native, powered by Supabase for real-time
            data storage and synchronization.
          </ThemedText>
          <ThemedText style={[styles.infoText, { marginTop: 12 }]}>
            Features include:
          </ThemedText>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle" size={16} color="#34C759" />
              <ThemedText style={styles.featureText}>Create and manage notes</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle" size={16} color="#34C759" />
              <ThemedText style={styles.featureText}>Real-time database sync</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle" size={16} color="#34C759" />
              <ThemedText style={styles.featureText}>Dark mode support</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle" size={16} color="#34C759" />
              <ThemedText style={styles.featureText}>Usage statistics</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 44,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  infoTitle: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  featureList: {
    marginTop: 8,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
