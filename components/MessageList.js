// components/MessageList.js
import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { db } from '../firebaseConfig'; // Certifique-se de que o Firestore esteja configurado
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import MessageItem from './MessageItem'; // Componente que exibe cada mensagem
import MessageInput from './MessageInput'; // Componente para digitar e enviar mensagens

const MessageList = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = collection(db, 'messages');

  // Função para enviar mensagens
  const sendMessage = async (message, imageURL = null) => {
    try {
      const newMessage = {
        text: message,
        image: imageURL,  // Adiciona a URL da imagem, se houver
        userId: currentUser.userId,
        timestamp: new Date(),
      };

      await addDoc(messagesRef, newMessage);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  // Função para monitorar as mensagens
  useEffect(() => {
    const q = query(messagesRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
      setMessages(fetchedMessages.reverse());
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem message={item} currentUser={currentUser} />
        )}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      
      {/* Exibe a indicação de "usuário digitando" */}
      {isTyping && <Text>Usuário está digitando...</Text>}

      {/* Componente de input de mensagem */}
      <MessageInput currentUser={currentUser} sendMessage={sendMessage} />
    </View>
  );
};

export default MessageList;
