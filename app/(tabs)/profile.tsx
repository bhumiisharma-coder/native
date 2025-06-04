// import React, { useEffect, useState } from 'react';
// import { getAuth } from 'firebase/auth';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { db } from '../../lib/firebase';

// const ProfilePage = () => {
//   const [userVideos, setUserVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserVideos = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (!user) {
//         alert("❌ User not logged in.");
//         setLoading(false);
//         return;
//       }

//       const userVideosRef = collection(db, "users_videos", user.uid, "videos");
//       const q = query(userVideosRef, orderBy("createdAt", "desc"));
//       const snapshot = await getDocs(q);

//       const videos = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//       setUserVideos(videos);
//       setLoading(false);
//     };

//     fetchUserVideos();
//   }, []);

//   return (
//     <div>
//       <h1>👤 My Uploaded Videos</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : userVideos.length === 0 ? (
//         <p>You haven't uploaded any videos yet.</p>
//       ) : (
//         userVideos.map(video => (
//           <div key={video.id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '10px' }}>
//             <video width="320" height="240" controls>
//               <source src={video.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <h3>{video.title}</h3>
//             <p>{video.description}</p>
//             <p>👍 {video.likesCount || 0} Likes</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProfilePage;



// app/(tabs)/profile.tsx

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
// import { Video } from 'expo-av';
// import { getAuth } from 'firebase/auth';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { db } from '../../lib/firebase';

// interface VideoData {
//   id: string;
//   url: string;
//   title?: string;
//   description?: string;
//   likesCount?: number;
// }

// const { width } = Dimensions.get('window');

// const ProfilePage = () => {
//   const [userVideos, setUserVideos] = useState<VideoData[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserVideos = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (!user) {
//           alert("❌ User not logged in.");
//           setLoading(false);
//           return;
//         }

//         const userVideosRef = collection(db, "users_videos", user.uid, "videos");
//         const q = query(userVideosRef, orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);

//         const videos = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...(doc.data() as Omit<VideoData, "id">),
//         }));

//         setUserVideos(videos);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         alert("Error fetching videos.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserVideos();
//   }, []);

//   const renderItem = ({ item }: { item: VideoData }) => (
//     <View style={styles.videoContainer}>
//       <Video
//         source={{ uri: item.url }}
//         style={styles.video}
//         useNativeControls
//         resizeMode={"contain" as any} // fix for TS error
//         isLooping={false}
//       />
//       <Text style={styles.title}>{item.title || "Untitled Video"}</Text>
//       <Text style={styles.description}>{item.description || ""}</Text>
//       <Text style={styles.likes}>👍 {item.likesCount || 0} Likes</Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading videos...</Text>
//       </View>
//     );
//   }

//   if (userVideos.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <Text>You haven't uploaded any videos yet.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>👤 My Uploaded Videos</Text>
//       <FlatList
//         data={userVideos}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// export default ProfilePage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 16,
//     fontWeight: 'bold',
//   },
//   videoContainer: {
//     marginBottom: 30,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#fafafa',
//   },
//   video: {
//     width: width - 40,
//     height: 220,
//     borderRadius: 8,
//     backgroundColor: '#000',
//   },
//   title: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   description: {
//     marginTop: 4,
//     fontSize: 14,
//     color: '#555',
//   },
//   likes: {
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });




import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface VideoData {
  id: string;
  url: string;
  title?: string;
  description?: string;
  likesCount?: number;
}

const { width } = Dimensions.get('window');

export default function Profile() {
  const [userVideos, setUserVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("❌ User not logged in.");
          setLoading(false);
          return;
        }

        const userVideosRef = collection(db, "users_videos", user.uid, "videos");
        const q = query(userVideosRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const videos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<VideoData, "id">),
        }));

        setUserVideos(videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
        alert("Error fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, []);

  const renderItem = ({ item }: { item: VideoData }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        useNativeControls
        resizeMode={"contain" as any}
        isLooping={false}
      />
      <Text style={styles.title}>{item.title || "Untitled Video"}</Text>
      <Text style={styles.description}>{item.description || ""}</Text>
      <Text style={styles.likes}>👍 {item.likesCount || 0} Likes</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading videos...</Text>
      </View>
    );
  }

  if (userVideos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>You haven't uploaded any videos yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 My Uploaded Videos</Text>
      <FlatList
        data={userVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  video: {
    width: width - 40,
    height: 220,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  likes: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

