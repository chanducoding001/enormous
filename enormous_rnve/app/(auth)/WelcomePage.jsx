import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const WelcomePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await SecureStore.getItemAsync("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      {userData ? (
        <View style={styles.box}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.name || "N/A"}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email || "N/A"}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  box: {
    width: '90%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    elevation: 5, 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});
