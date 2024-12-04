import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Redireciona para a próxima tela após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('RulesScreen'); // Aqui você pode mudar para a tela de regras ou a tela inicial do jogo
    }, 30000); // Aguarda 3 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Exibe o logo do jogo */}
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.text}>Bem-vindo ao RockFy!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RulesScreen')}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
