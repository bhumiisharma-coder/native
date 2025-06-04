// import { Slot, useRouter, useSegments } from 'expo-router';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from '../lib/firebase';
// import { useEffect, useState } from 'react';

// export default function RootLayout() {
//   const router = useRouter();
//   const segments = useSegments();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (loading) return;

//     const inAuthGroup = segments[0] === '(auth)';

//     if (!user && !inAuthGroup) {
//       // Redirect to signup if not logged in
//       router.replace('/(auth)/signup');
//     } else if (user && inAuthGroup) {
//       // Redirect to tabs if logged in
//       router.replace('/(tabs)');
//     }
//   }, [user, loading, segments]);

//   if (loading) return null;

//   return <Slot />;
// }



import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/signup');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  if (loading) return null;

  return <Slot />;
}
