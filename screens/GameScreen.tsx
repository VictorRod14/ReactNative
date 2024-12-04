import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Audio } from 'expo-av';

const songs = [
  { audio: require('../assets/musica1.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'the emptiness machine', options: ['Crawling', 'Points Of Authority', 'Faint', 'the emptiness machine'] },
  { audio: require('../assets/musica2.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'carry on wayward son', options: ['carie wayward sun', 'carry on my way son', 'carry on wayward son', 'carry on my weight lost son'] },
  { audio: require('../assets/musica3.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'Down with the sickness', options: ['Down with the sickness', 'The Sound of Silence', 'Fade to Black', 'Breaking the Law'] },
  { audio: require('../assets/musica4.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'what the world burns', options: ['what the world burns', 'Fading in Reverse', 'Worlds Collide', 'The End'] },
  { audio: require('../assets/musica5.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'werewolf', options: ['werewolf', 'The Demon Inside', 'My Last Breath', 'Underworld'] },
  { audio: require('../assets/musica6.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'daze', options: ['daze', 'Fallen', 'Under the Stars', 'Dreams'] },
  { audio: require('../assets/musica7.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'Bohemian Rapasody', options: ['Bohemian Rapasody', 'We Are the Champions', 'Somebody to Love', 'Under Pressure'] },
  { audio: require('../assets/musica8.mp3'), image: require('../assets/logo.jpeg'), correctAnswer: 'psicosocial', options: ['psicosocial', 'Before I Forget', 'Duality', 'Left Behind'] },
];

const GameScreen = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const shuffleOptions = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const playSong = async (index: number) => {
    if (index >= songs.length) {
      setIsGameOver(true);
      return;
    }

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(songs[index].audio);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Erro ao carregar a música', error);
    }
  };

  useEffect(() => {
    if (currentSongIndex < songs.length) {
      playSong(currentSongIndex);
    }
  }, [currentSongIndex]);

  const handleAnswer = (selectedOption: string) => {
    const correctOption = songs[currentSongIndex].correctAnswer;

    if (selectedOption === correctOption) {
      setMessage('Muito bom!');
      setCorrectAnswers(prev => prev + 1);
    } else {
      setMessage('Você errou!');
      setMistakes(prev => prev + 1);
    }

    if (currentSongIndex + 1 < songs.length) {
      setCurrentSongIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentSongIndex(0);
    setMistakes(0);
    setCorrectAnswers(0);
    setMessage('');
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOverText}>Fim do Jogo!</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Acertos: {correctAnswers}</Text>
          <Text style={styles.stats}>Erros: {mistakes}</Text>
        </View>
        <View style={styles.restartButtonContainer}>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.buttonText}>Recomeçar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const shuffledOptions = shuffleOptions(songs[currentSongIndex].options);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={songs[currentSongIndex]?.image} style={styles.image} />
        </View>

        <Text style={styles.message}>{message}</Text>

        <View style={styles.optionsContainer}>
          <View style={styles.grid}>
            {shuffledOptions.slice(0, 4).map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  message: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  gameOverText: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  stats: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',  // Aumentei o peso da fonte para deixá-la mais chamativa
    marginBottom: 10,
  },
  restartButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  restartButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '60%', // Ajustado para ser proporcional aos outros botões
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
