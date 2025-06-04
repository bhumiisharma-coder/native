// import { View, Text, Button, StyleSheet } from 'react-native';
// import { auth } from '../../lib/firebase';

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Your App!</Text>
//       <Text>You're successfully logged in as {auth.currentUser?.email}</Text>
      
//       <Button 
//         title="Sign Out" 
//         onPress={() => auth.signOut()}
//         color="red"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   }
// });




// import React, { useEffect, useState } from 'react';
// import { db } from '../../lib/firebase';
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   doc,
//   updateDoc,
//   increment,
//   addDoc,
//   serverTimestamp,
//   DocumentData,
//   QueryDocumentSnapshot,
// } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// interface Video {
//   id: string;
//   url: string;
//   title: string;
//   description: string;
//   userEmail: string | null;
//   likesCount?: number;
//   commentsCount?: number;
//   createdAt?: any;
// }

// interface Comment {
//   text: string;
//   user: string | null;
//   createdAt?: any;
// }

// const HomePage: React.FC = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
//   const [comments, setComments] = useState<Record<string, Comment[]>>({});
//   const [newComment, setNewComment] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchVideos = async () => {
//       const q = query(collection(db, "all_videos"), orderBy("createdAt", "desc"));
//       const snapshot = await getDocs(q);

//       const videoList: Video[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           url: data.url,
//           title: data.title,
//           description: data.description,
//           userEmail: data.userEmail ?? null,
//           likesCount: data.likesCount ?? 0,
//           commentsCount: data.commentsCount ?? 0,
//           createdAt: data.createdAt,
//         };
//       });

//       setVideos(videoList);
//       await loadAllComments(videoList);
//     };

//     fetchVideos();
//   }, []);

//   const loadAllComments = async (videos: Video[]) => {
//     const allComments: Record<string, Comment[]> = {};

//     for (const video of videos) {
//       const commentsRef = collection(db, "all_videos", video.id, "comments");
//       const snapshot = await getDocs(commentsRef);
//       const commentList: Comment[] = snapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           text: data.text,
//           user: data.user ?? null,
//           createdAt: data.createdAt,
//         };
//       });
//       allComments[video.id] = commentList;
//     }

//     setComments(allComments);
//   };

//   const handleLike = async (videoId: string) => {
//     setLikeLoading(prev => ({ ...prev, [videoId]: true }));
//     const videoRef = doc(db, "all_videos", videoId);

//     try {
//       await updateDoc(videoRef, {
//         likesCount: increment(1)
//       });

//       setVideos(prev =>
//         prev.map(video =>
//           video.id === videoId
//             ? { ...video, likesCount: (video.likesCount || 0) + 1 }
//             : video
//         )
//       );
//     } catch (error) {
//       console.error("❌ Error liking video:", error);
//     }

//     setLikeLoading(prev => ({ ...prev, [videoId]: false }));
//   };

//   const handleComment = async (videoId: string) => {
//     const text = newComment[videoId];
//     if (!text || text.trim() === '') return;

//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (!user) {
//       alert("❌ Please log in to comment.");
//       return;
//     }

//     const commentRef = collection(db, "all_videos", videoId, "comments");

//     try {
//       await addDoc(commentRef, {
//         text,
//         user: user.email,
//         createdAt: serverTimestamp()
//       });

//       // Update local comments state
//       setComments(prev => ({
//         ...prev,
//         [videoId]: [...(prev[videoId] || []), { text, user: user.email }]
//       }));

//       setNewComment(prev => ({ ...prev, [videoId]: "" }));
//     } catch (error) {
//       console.error("❌ Error posting comment:", error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>🎬 Video Feed</h1>

//       {videos.map(video => (
//         <div key={video.id} style={{
//           marginBottom: '30px',
//           padding: '15px',
//           border: '1px solid #ccc',
//           borderRadius: '10px',
//           backgroundColor: '#f9f9f9'
//         }}>
//           <video width="320" height="240" controls>
//             <source src={video.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>

//           <h3>{video.title}</h3>
//           <p>{video.description}</p>
//           <p><strong>Uploaded by:</strong> {video.userEmail}</p>

//           <button onClick={() => handleLike(video.id)} disabled={likeLoading[video.id]}>
//             ❤️ Like
//           </button>
//           <span style={{ marginLeft: '10px' }}>👍 {video.likesCount || 0} Likes</span>

//           <div style={{ marginTop: '15px' }}>
//             <input
//               type="text"
//               placeholder="Add a comment..."
//               value={newComment[video.id] || ""}
//               onChange={(e) =>
//                 setNewComment(prev => ({ ...prev, [video.id]: e.target.value }))
//               }
//               style={{ width: '70%', padding: '5px' }}
//             />
//             <button onClick={() => handleComment(video.id)} style={{ marginLeft: '5px' }}>
//               💬 Comment
//             </button>
//           </div>

//           <div style={{ marginTop: '10px' }}>
//             {(comments[video.id] || []).map((c, index) => (
//               <p key={index} style={{ margin: '4px 0' }}>
//                 <strong>{c.user}:</strong> {c.text}
//               </p>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;









// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { Video, ResizeMode } from 'expo-av'; // Import ResizeMode enum
// import { db } from '../../lib/firebase';
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   doc,
//   updateDoc,
//   increment,
//   addDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// interface VideoItem {
//   id: string;
//   url: string;
//   title: string;
//   description: string;
//   userEmail: string | null;
//   likesCount?: number;
//   commentsCount?: number;
//   createdAt?: any;
// }

// interface Comment {
//   text: string;
//   user: string | null;
//   createdAt?: any;
// }

// const HomeScreen: React.FC = () => {
//   const [videos, setVideos] = useState<VideoItem[]>([]);
//   const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
//   const [comments, setComments] = useState<Record<string, Comment[]>>({});
//   const [newComment, setNewComment] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const q = query(collection(db, 'all_videos'), orderBy('createdAt', 'desc'));
//       const snapshot = await getDocs(q);

//       const videoList: VideoItem[] = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           url: data.url,
//           title: data.title,
//           description: data.description,
//           userEmail: data.userEmail ?? null,
//           likesCount: data.likesCount ?? 0,
//           commentsCount: data.commentsCount ?? 0,
//           createdAt: data.createdAt,
//         };
//       });

//       setVideos(videoList);
//       await loadAllComments(videoList);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       setLoading(false);
//     }
//   };

//   const loadAllComments = async (videoList: VideoItem[]) => {
//     const allComments: Record<string, Comment[]> = {};
//     for (const video of videoList) {
//       const commentsRef = collection(db, 'all_videos', video.id, 'comments');
//       const snapshot = await getDocs(commentsRef);
//       allComments[video.id] = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           text: data.text,
//           user: data.user ?? null,
//           createdAt: data.createdAt,
//         };
//       });
//     }
//     setComments(allComments);
//   };

//   const handleLike = async (videoId: string) => {
//     setLikeLoading((prev) => ({ ...prev, [videoId]: true }));
//     const videoRef = doc(db, 'all_videos', videoId);

//     try {
//       await updateDoc(videoRef, {
//         likesCount: increment(1),
//       });
//       setVideos((prev) =>
//         prev.map((video) =>
//           video.id === videoId
//             ? { ...video, likesCount: (video.likesCount ?? 0) + 1 }
//             : video
//         )
//       );
//     } catch (error) {
//       console.error('Error liking video:', error);
//     }

//     setLikeLoading((prev) => ({ ...prev, [videoId]: false }));
//   };

//   const handleComment = async (videoId: string) => {
//     const text = newComment[videoId];
//     if (!text || text.trim() === '') return;

//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (!user) {
//       alert('Please log in to comment.');
//       return;
//     }

//     const commentRef = collection(db, 'all_videos', videoId, 'comments');

//     try {
//       await addDoc(commentRef, {
//         text,
//         user: user.email,
//         createdAt: serverTimestamp(),
//       });

//       // Update local comments state
//       setComments((prev) => ({
//         ...prev,
//         [videoId]: [...(prev[videoId] || []), { text, user: user.email }],
//       }));

//       setNewComment((prev) => ({ ...prev, [videoId]: '' }));
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const renderVideoItem = ({ item }: { item: VideoItem }) => (
//     <View style={styles.videoContainer}>
//       <Video
//         source={{ uri: item.url }}
//         style={styles.video}
//         useNativeControls
//         resizeMode={ResizeMode.CONTAIN} // Correctly use ResizeMode enum
//         isLooping
//       />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text>{item.description}</Text>
//       <Text style={styles.uploadedBy}>Uploaded by: {item.userEmail ?? 'Unknown'}</Text>

//       <View style={styles.likesRow}>
//         <Button
//           title={`❤️ Like (${item.likesCount ?? 0})`}
//           onPress={() => handleLike(item.id)}
//           disabled={likeLoading[item.id]}
//           color="#e63946"
//         />
//       </View>

//       <View style={styles.commentInputRow}>
//         <TextInput
//           style={styles.commentInput}
//           placeholder="Add a comment..."
//           value={newComment[item.id] || ''}
//           onChangeText={(text) =>
//             setNewComment((prev) => ({ ...prev, [item.id]: text }))
//           }
//         />
//         <TouchableOpacity
//           style={styles.commentButton}
//           onPress={() => handleComment(item.id)}
//         >
//           <Text style={styles.commentButtonText}>💬</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.commentsSection}>
//         {(comments[item.id] || []).map((c, idx) => (
//           <Text key={idx} style={styles.commentText}>
//             <Text style={{ fontWeight: 'bold' }}>{c.user ?? 'Anon'}: </Text>
//             {c.text}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#333" />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={videos}
//       keyExtractor={(item) => item.id}
//       renderItem={renderVideoItem}
//       contentContainerStyle={{ padding: 20 }}
//       ListHeaderComponent={<Text style={styles.header}>🎬 Video Feed</Text>}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   videoContainer: {
//     marginBottom: 30,
//     padding: 15,
//     borderRadius: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   video: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     backgroundColor: '#000',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   uploadedBy: {
//     fontStyle: 'italic',
//     marginTop: 4,
//   },
//   likesRow: {
//     marginTop: 10,
//   },
//   commentInputRow: {
//     flexDirection: 'row',
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   commentInput: {
//     flex: 1,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#fff',
//   },
//   commentButton: {
//     marginLeft: 10,
//     backgroundColor: '#e63946',
//     padding: 10,
//     borderRadius: 20,
//   },
//   commentButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   commentsSection: {
//     marginTop: 10,
//   },
//   commentText: {
//     marginVertical: 2,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { db } from '../../lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface VideoItem {
  id: string;
  url: string;
  title: string;
  description: string;
  userEmail: string | null;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: any;
}

interface Comment {
  text: string;
  user: string | null;
  createdAt?: any;
}

export  default  function Home() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const q = query(collection(db, 'all_videos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const videoList: VideoItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          url: data.url,
          title: data.title,
          description: data.description,
          userEmail: data.userEmail ?? null,
          likesCount: data.likesCount ?? 0,
          commentsCount: data.commentsCount ?? 0,
          createdAt: data.createdAt,
        };
      });

      setVideos(videoList);
      await loadAllComments(videoList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  const loadAllComments = async (videoList: VideoItem[]) => {
    const allComments: Record<string, Comment[]> = {};
    for (const video of videoList) {
      const commentsRef = collection(db, 'all_videos', video.id, 'comments');
      const snapshot = await getDocs(commentsRef);
      allComments[video.id] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          text: data.text,
          user: data.user ?? null,
          createdAt: data.createdAt,
        };
      });
    }
    setComments(allComments);
  };

  const handleLike = async (videoId: string) => {
    setLikeLoading((prev) => ({ ...prev, [videoId]: true }));
    const videoRef = doc(db, 'all_videos', videoId);

    try {
      await updateDoc(videoRef, {
        likesCount: increment(1),
      });
      setVideos((prev) =>
        prev.map((video) =>
          video.id === videoId
            ? { ...video, likesCount: (video.likesCount ?? 0) + 1 }
            : video
        )
      );
    } catch (error) {
      console.error('Error liking video:', error);
    }

    setLikeLoading((prev) => ({ ...prev, [videoId]: false }));
  };

  const handleComment = async (videoId: string) => {
    const text = newComment[videoId];
    if (!text || text.trim() === '') return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to comment.');
      return;
    }

    const commentRef = collection(db, 'all_videos', videoId, 'comments');

    try {
      await addDoc(commentRef, {
        text,
        user: user.email,
        createdAt: serverTimestamp(),
      });

      setComments((prev) => ({
        ...prev,
        [videoId]: [...(prev[videoId] || []), { text, user: user.email }],
      }));

      setNewComment((prev) => ({ ...prev, [videoId]: '' }));
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.uploadedBy}>Uploaded by: {item.userEmail ?? 'Unknown'}</Text>

      <View style={styles.likesRow}>
        <Button
          title={`❤️ Like (${item.likesCount ?? 0})`}
          onPress={() => handleLike(item.id)}
          disabled={likeLoading[item.id]}
          color="#e63946"
        />
      </View>

      <View style={styles.commentInputRow}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment[item.id] || ''}
          onChangeText={(text) =>
            setNewComment((prev) => ({ ...prev, [item.id]: text }))
          }
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleComment(item.id)}
        >
          <Text style={styles.commentButtonText}>💬</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentsSection}>
        {(comments[item.id] || []).map((c, idx) => (
          <Text key={idx} style={styles.commentText}>
            <Text style={{ fontWeight: 'bold' }}>{c.user ?? 'Anon'}: </Text>
            {c.text}
          </Text>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={renderVideoItem}
      contentContainerStyle={{ padding: 20 }}
      ListHeaderComponent={<Text style={styles.header}>🎬 Video Feed</Text>}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  uploadedBy: {
    fontStyle: 'italic',
    marginTop: 4,
  },
  likesRow: {
    marginTop: 10,
  },
  commentInputRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  commentButton: {
    marginLeft: 10,
    backgroundColor: '#e63946',
    padding: 10,
    borderRadius: 20,
  },
  commentButtonText: {
    color: 'white',
    fontSize: 18,
  },
  commentsSection: {
    marginTop: 10,
  },
  commentText: {
    marginVertical: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
