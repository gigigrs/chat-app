# Chat App com Firebase

Este projeto é um aplicativo de chat criado utilizando **React Native** e **Firebase**, com funcionalidades de autenticação de usuários, envio de mensagens e imagens. Além disso, possui uma funcionalidade extra de redirecionamento para o Facebook.

---

## Funcionalidades

- **Autenticação:**
  - Login e cadastro de usuários utilizando **Firebase Authentication**.
- **Chat em tempo real:**
  - Lista de usuários disponíveis para conversas.
  - Envio de mensagens entre os usuários.
- **Envio de imagens:**
  - Upload de imagens no chat com armazenamento no **Firebase Storage** e exibição no histórico de mensagens.
- **Funcionalidade extra:**
  - Botão de redirecionamento para o perfil do Facebook.
- **Logout:**
  - Opção para desconectar o usuário e limpar o estado de autenticação.

---

## Tecnologias Utilizadas

- **React Native**
- **Expo**
- **Firebase (Auth, Firestore e Storage)**
- **NativeWind (TailwindCSS para React Native)**
- **JavaScript**

---

## Layout

O design do aplicativo foi criado utilizando o **NativeWind** (estilização baseada no TailwindCSS). Ele é responsivo e funciona em diferentes tamanhos de tela. A estrutura das telas é intuitiva, focada na experiência do usuário.

---

## Requisitos de Instalação

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- **Node.js** (versão LTS)
- **Expo CLI**
- **Git**

---

## Instalação e Configuração

1. Clone o repositório:

```bash
    git clone https://github.com/seu-usuario/chat-app.git
```

2. Navegue até a pasta do projeto:

```bash
    cd chat-app
```

3. Instale as dependências:

```bash
    npm install
```

4. Configure as variáveis de ambiente no arquivo `.env` com suas credenciais do Firebase:

```
FIREBASE_API_KEY=SEU_API_KEY
FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
FIREBASE_PROJECT_ID=SEU_PROJECT_ID
FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
FIREBASE_APP_ID=SEU_APP_ID
```

5. Inicie o aplicativo:

```bash
    expo start
```

6. Teste no emulador ou diretamente em um dispositivo físico utilizando o aplicativo **Expo Go**.

-

## Documentação do Código

### Exemplo: Envio de Imagens no Firebase

```javascript
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Alert } from 'react-native';

const uploadImage = async (uri, userId) => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `chats/${userId}/${new Date().getTime()}`);

        const response = await fetch(uri);
        const blob = await response.blob();

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', null, null, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Imagem carregada:', downloadURL);
            // Salve o URL no Firestore
        });
    } catch (error) {
        Alert.alert("Erro", "Falha ao enviar imagem");
        console.error(error);
    }
};
```

---

## Melhorias Futuras

- Implementar notificações push para mensagens recebidas.
- Adicionar suporte a temas claro e escuro.
- Melhorar a experiência de envio de imagens com redimensionamento automático.



