import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'

export default function _layout() {
  return (
    // O componente Stack organiza as telas em uma pilha de navegação. 
    // Isso permite alternar entre diferentes telas dentro da aplicação, mantendo o histórico de navegação.
    <Stack>
        {/* Define uma nova tela dentro da pilha de navegação.
            A tela é chamada de "home" e possui uma configuração personalizada para o cabeçalho. */}
        <Stack.Screen
            name="home" // Nome da tela, que pode ser usada para referência em outras partes do código, como navegação
            options={{
                // O header da tela é personalizado para usar o componente HomeHeader em vez do cabeçalho padrão.
                // Isso permite um controle completo sobre o design e comportamento do cabeçalho.
                header: ()=> <HomeHeader />
            }}
        />
    </Stack>
  )
}
