import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { useAuth } from '../../context/authContext'; // Contexto de autenticação
import { StatusBar } from 'expo-status-bar'; // Controla a barra de status
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Responsividade
import ChatList from '../../components/ChatList'; // Componente para exibir a lista de chats
import { getDocs, query, where } from 'firebase/firestore'; // Funções do Firebase
import { usersRef } from '../../firebaseConfig'; // Referência à coleção de usuários no Firebase

export default function Home() {
    const { logout, user } = useAuth(); // Contexto de autenticação
    const [users, setUsers] = useState([]); // Lista de usuários para a chat list

    // useEffect para carregar a lista de usuários quando o componente é montado
    useEffect(() => {
        if (user?.uid) {
            getUsers(); // Se o usuário estiver logado, busca a lista de usuários
        }
    }, [user?.uid]);

    // Função assíncrona para buscar os usuários no Firestore
    const getUsers = async () => {
        const q = query(usersRef, where('userId', '!=', user?.uid)); // Query para excluir o usuário logado
        const querySnapshot = await getDocs(q); // Executa a query no Firestore
        let data = []; // Array temporário para armazenar os dados

        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data() }); // Preenche a lista de usuários
        });

        setUsers(data); // Atualiza o estado com os dados dos usuários
    };

    // Função para redirecionar o usuário para o Facebook
    const redirectToFacebook = () => {
        const facebookUrl = 'https://www.facebook.com'; // URL do Facebook
        Linking.openURL(facebookUrl).catch(err => console.error("Erro ao abrir o Facebook", err));
    };

    return (
        <View style={styles.container}>
            {/* Barra de Status com tema claro */}
            <StatusBar style="light" />

            {/* Exibe lista de chats ou indicador de carregamento */}
            {users.length > 0 ? (
                <ChatList currentUser={user} users={users} />
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )}

            {/* Botão para redirecionar para o Facebook */}
            <Pressable onPress={redirectToFacebook} style={styles.facebookButton}>
                <Text style={styles.buttonText}>Ir para o Facebook</Text>
            </Pressable>

            {/* Botão de logout */}
            <Pressable onPress={logout} style={styles.logoutButton}>
                <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: hp(30),
    },
    facebookButton: {
        position: 'absolute',
        bottom: hp(15),
        left: wp(10),
        backgroundColor: '#1877F2', // Cor do botão do Facebook
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(10),
        borderRadius: 30,
    },
    logoutButton: {
        position: 'absolute',
        bottom: hp(10),
        left: wp(10),
        backgroundColor: '#FF5B5B', // Cor para o botão de logout
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(10),
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: wp(4),
        textAlign: 'center',
    },
});
