import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { auth } from '../firebase/config';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle Email/Password Sign-In
    const handleEmailSignIn = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            Alert.alert('Success', 'Signed in successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    // Handle Email/Password Sign-Up
    const handleEmailSignUp = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Success', 'Account created successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    // Handle Anonymous Sign-In
    const handleAnonymousSignIn = async () => {
        try {
            await auth().signInAnonymously();
            Alert.alert('Success', 'Signed in anonymously!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    // Monitor Authentication State
    React.useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in:', user.uid);
            } else {
                console.log('User is signed out');
            }
        });
        return unsubscribe; // Cleanup on unmount
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
            <Button title="Sign In" onPress={handleEmailSignIn} />
            <Button title="Sign Up" onPress={handleEmailSignUp} />
            <Button title="Sign In Anonymously" onPress={handleAnonymousSignIn} />
        </View>
    );
};

export default LoginScreen;




// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/config';

// const LoginScreen = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async () => {
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             Alert.alert('Success', 'Logged in successfully!');
//         } catch (error) {
//             Alert.alert('Error', error.message);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Login</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 autoCapitalize="none"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 autoCapitalize="none"
//             />
//             <Button title="Login" onPress={handleLogin} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', padding: 16 },
//     title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
//     input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
// });

// export default LoginScreen;