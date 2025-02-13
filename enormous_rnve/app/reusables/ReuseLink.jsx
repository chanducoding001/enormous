import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

const ReuseLink = ({ btnText, toLink }) => {
  const router = useRouter(); // Get the router instance

  return (
    <View style={styles.linkContainer}>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push(toLink)} // Navigate manually
      >
        <Text style={styles.text}>{btnText}</Text>
      </Pressable>
    </View>
  );
};

export default ReuseLink;

const styles = StyleSheet.create({
  linkContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#005A9C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  buttonPressed: {
    backgroundColor: '#005BBB',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});