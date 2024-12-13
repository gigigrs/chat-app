
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // Importando o storage do firebaseConfig

const MessageInput = ({ currentUser, sendMessage }) => {
  const [message, setMessage] = useState('');
  
  // Função para selecionar uma imagem da galeria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  // Função para capturar uma imagem com a câmera
  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  // Função para fazer o upload da imagem para o Firebase Storage
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `chat_images/${Date.now()}`);

    const uploadTask = uploadBytesResumable(imageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.error('Erro ao fazer upload:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        sendMessage(message, downloadURL); // Envia a URL da imagem junto com a mensagem
      }
    );
  };

  return (
    <View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Digite sua mensagem"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Selecionar Imagem" onPress={pickImage} />
      <Button title="Capturar Foto" onPress={captureImage} />
      <Button
        title="Enviar Mensagem"
        onPress={() => sendMessage(message)} // Envia mensagem de texto
      />
    </View>
  );
};

export default MessageInput;
