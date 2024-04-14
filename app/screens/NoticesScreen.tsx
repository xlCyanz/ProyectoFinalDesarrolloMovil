// screens/NoticesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import NoticeStore from '../models/NoticeStore'; // Ajusta la ruta a donde se ubica tu NoticeStore

const NoticesScreen: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [localNotices, setLocalNotices] = useState(NoticeStore.notices);

  const loadNotices = async () => {
    setIsLoading(true);
    try {
      await NoticeStore.fetchNotices();
      setLocalNotices(NoticeStore.notices);
    } catch (error) {
      console.error("Failed to load notices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {localNotices.map((notice) => (
        <View key={notice.id} style={styles.card}>
          <Text style={styles.title}>{notice.titulo}</Text>
          <Text style={styles.date}>{notice.fecha}</Text>
          <Text style={styles.content}>{notice.contenido}</Text>
        </View>
      ))}
    </View>
  );
});

// Colores definidos para evitar el uso de literales de color en los estilos
const colors = {
  black: '#000',
  darkGray: '#333',
  lightGray: '#666',
  white: '#fff',
};

// Estilos con propiedades en orden alfabético
const styles = StyleSheet.create({
  activityIndicator: {
    color: colors.black,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    color: colors.darkGray,
    fontSize: 14,
    padding: 10,
    textAlign: 'justify',
  },
  date: {
    color: colors.lightGray,
    fontSize: 12,
    marginBottom: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default NoticesScreen;
