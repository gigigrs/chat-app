// components/MessageItem.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MessageItem = ({ message, currentUser }) => {
  // Verifica se a mensagem é do usuário atual
  const isCurrentUser = currentUser?.userId === message?.userId;

  return (
    <View className={`mb-3 flex-row ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[80%] p-3 rounded-2xl ${
          isCurrentUser
            ? 'bg-white border border-neutral-200'
            : 'bg-indigo-100 border border-indigo-200'
        }`}
      >
        {/* Exibe o texto da mensagem */}
        {message?.text && <Text className="text-base text-gray-800">{message?.text}</Text>}
        
        {/* Exibe a imagem, se houver */}
        {message?.image && (
          <Image
            source={{ uri: message.image }}
            className="mt-2 rounded-xl"
            style={{ width: wp(70), height: wp(70) }}
          />
        )}
      </View>
    </View>
  );
};

export default MessageItem;
