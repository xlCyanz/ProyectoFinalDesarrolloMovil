// app/screens/ServicesScreen.tsx
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import config from '../config'; // Ajusta la importación según la estructura de tu proyecto

// Define la interfaz para los datos de un servicio
interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
}

// Define un objeto de colores para usar en los estilos
const colors = {
  white: '#fff',
  black: '#000',
  darkGray: '#333',
  lightGray: '#666',
};

export const ServicesScreen: React.FC = observer(() => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${config.API_URL}servicios.php`);
        const result = await response.json();
        if (result.exito) {
          setServices(result.datos);
        } else {
          console.log('Failed to fetch services', result.mensaje);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.black} />;
  }

  return (
    <ScrollView style={styles.container}>
      {services.map((service) => (
        <View key={service.id} style={styles.card}>
          <Image source={{ uri: service.foto }} style={styles.image} />
          <View style={styles.textArea}>
            <Text style={styles.title}>{service.nombre}</Text>
            <Text style={styles.description}>{service.descripcion}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
});

// Los estilos ahora usan el objeto de colores
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  container: {
    flex: 1,
  },
  description: {
    color: colors.darkGray,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'justify',
  },
  image: {
    height: 200,
    width: '100%',
  },
  textArea: {
    padding: 16,
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServicesScreen;
