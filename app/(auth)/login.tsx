// import React, { useState } from 'react';
// import { View, Text, TextInput, Pressable, Alert } from 'react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useRouter } from 'expo-router';
// import { auth } from '../../lib/firebase';

// export default function Login() { 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
      
//       Alert.alert(
//         "Success", 
//         "Logged in successfully!",
//         [{ text: "OK", onPress: () => router.replace('/(tabs)') }]
//       );
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome Back</Text>
      
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
      
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />
      
//       <Pressable onPress={handleLogin}>
//         <Text >Log In</Text>
//       </Pressable>
      
//       <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
//         <Text>Don't have an account? </Text>
//         <Pressable onPress={() => router.push('/(auth)/signup')}>
//           <Text style={{ color: '#0095f6' }}>Sign Up</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = {
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#0095f6',
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   }
// };





import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../../lib/firebase';

export default function Login() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      
      <Pressable 
        onPress={handleLogin} 
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Log In'}
        </Text>
      </Pressable>
      
      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <Pressable onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.link}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF0000', // YouTube red
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  link: {
    color: '#FF0000',
    fontWeight: 'bold',
  }
});