import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type RulesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RulesScreen'>;

const RulesScreen = () => {
  const navigation = useNavigation<RulesScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regras do Jogo</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.ruleText}>1. As músicas irão tocar durante 30 segundos.</Text>
        <Text style={styles.ruleText}>2. Cabe a você decidir qual a opção correta.</Text>
        <Text style={styles.ruleText}>3. Ao clicar na resposta, uma nova música começará automaticamente.</Text>
        <Text style={styles.ruleText}>4. Ao final, você verá quantas respostas acertou e errou.</Text>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
        <Text style={styles.buttonText}>Iniciar Jogo</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  ruleText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RulesScreen;
