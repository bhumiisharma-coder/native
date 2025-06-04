// import React, { useState } from 'react';
// import { View, Text, TextInput, Pressable, Alert } from 'react-native';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useRouter } from 'expo-router';
// import { auth, db } from '../../lib/firebase';
// import { doc, setDoc } from 'firebase/firestore';

// export default function SignupScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const router = useRouter();

//   const handleSignup = async () => {
//     try {
//       // 1. Create user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
//       // 2. Save additional user data in Firestore
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         username,
//         email,
//         createdAt: new Date(),
//       });

//       // 3. Show success alert
//       Alert.alert(
//         "Success", 
//         "Account created successfully!",
//         [{ text: "OK", onPress: () => router.replace('/(tabs)') }]
//       );
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Create Account</Text>
      
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//         autoCapitalize="none"
//       />
      
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
      
//       <Pressable onPress={handleSignup}>
//         <Text >Sign Up</Text>
//       </Pressable>
      
//       <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
//         <Text>Already have an account? </Text>
//         <Pressable onPress={() => router.push('/(auth)/login')}>
//           <Text style={{ color: '#0095f6' }}>Login</Text>
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


// (auth)/signup.tsx


// import React, { useState } from "react";
// import { View, Text, TextInput, Pressable, Alert } from "react-native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from "expo-router";
// import { auth, db } from "../../lib/firebase";
// import { doc, setDoc } from "firebase/firestore";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         username,
//         email,
//         createdAt: new Date(),
//       });

//       Alert.alert("Success", "Account created successfully!", [
//         { text: "OK", onPress: () => router.replace("/(tabs)") },
//       ]);
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create Account</Text>

//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//         autoCapitalize="none"
//       />

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

//       <Pressable onPress={handleSignup}>
//         <Text >Sign Up</Text>
//       </Pressable>

//       <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
//         <Text>Already have an account? </Text>
//         <Pressable onPress={() => router.push("/(auth)/login")}>
//           <Text style={{ color: "#0095f6" }}>Login</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = {
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: "#0095f6",
//     padding: 12,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// };




import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      
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
        onPress={handleSignup} 
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Text>
      </Pressable>
      
      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.link}>Login</Text>
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