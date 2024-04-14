// app/screens/VideosScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react-lite';
import config from '../config'; // Ajusta la importación según la estructura de tu proyecto

// Define la interfaz para los datos de un video
interface Video {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  link: string; // Este es el ID del video de YouTube
}

// Colores definidos para evitar el uso de literales de color en los estilos
const colors = {
  white: '#fff',
  black: '#000',
  // ... otros colores que puedas necesitar
};

export const VideosScreen: React.FC = observer(() => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.API_URL}videos.php`);
        const result = await response.json();
        if (result.exito) {
          setVideos(result.datos);
        } else {
          console.log('Failed to fetch videos', result.mensaje);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.black} />;
  }

  return (
    <View style={styles.container}>
      {videos.map((video) => (
        <View key={video.id} style={styles.card}>
          <Text style={styles.title}>{video.titulo}</Text>
          <Text style={styles.date}>{video.fecha}</Text>
          <WebView
            style={styles.webview}
            source={{ uri: `https://www.youtube.com/embed/${video.link}` }}
            allowsFullscreenVideo
            javaScriptEnabled
          />
          <Text style={styles.description}>{video.descripcion}</Text>
        </View>
      ))}
    </View>
  );
});

// Estilos corregidos con las propiedades en orden alfabético
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white, // Usa la variable de color definida
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black, // Usa la variable de color definida
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 14,
    padding: 16,
  },
  description: {
    fontSize: 14,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  webview: {
    height: 200,
  },
});

export default VideosScreen;
