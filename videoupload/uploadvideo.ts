// import { db } from '../../lib/firebase'; // Firebase config
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// // Upload video to Cloudinary
// export const uploadToCloudinary = async (videoFile) => {
//   const data = new FormData();
//   data.append('file', videoFile);
//   data.append('upload_preset', 'video_upload'); // Your Cloudinary preset
//   data.append('cloud_name', 'dpo6qlmur');       // Your Cloudinary cloud name

//   try {
//     const res = await fetch('https://api.cloudinary.com/v1_1/dpo6qlmur/video/upload', {
//       method: 'POST',
//       body: data,
//     });

//     const result = await res.json();
//     return result.secure_url; // Optionally add '.mp4' if needed
//   } catch (err) {
//     console.error('Cloudinary Upload Error:', err);
//     return null;
//   }
// };

// // Save video metadata to Firestore
// export const saveToFirestore = async (videoUrl, title, description) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//     alert("❌ User not logged in.");
//     return;
//   }

//   const videoData = {
//     url: videoUrl,
//     title,
//     description,
//     createdAt: serverTimestamp(),
//     userId: user.uid,
//     userEmail: user.email,
//     likesCount: 0,
//     commentsCount: 0,
//   };

//   try {
//     // Save to user's personal collection
//     const userVideosRef = collection(db, "users_videos", user.uid, "videos");
//     await addDoc(userVideosRef, videoData);

//     // Save to global collection
//     const allVideosRef = collection(db, "all_videos");
//     await addDoc(allVideosRef, videoData);

//     alert("✅ Video saved!");
//   } catch (error) {
//     console.error('Firestore Error:', error);
//     alert("❌ Failed to save video metadata.");
//   }
// };

// // Complete video upload handler
// export const handleVideoUpload = async (videoFile, title, description) => {
//   const url = await uploadToCloudinary(videoFile);
//   if (url) {
//     await saveToFirestore(url, title, description);
//   } else {
//     alert("❌ Video upload failed.");
//   }
// };


// videoupload/uploadvideo.ts



// import { db } from '../../lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// // Upload video to Cloudinary
// export const uploadToCloudinary = async (videoFile: File) => {
//   const data = new FormData();
//   data.append('file', videoFile);
//   data.append('upload_preset', 'video_upload'); // Your Cloudinary preset
//   data.append('cloud_name', 'dpo6qlmur');       // Your Cloudinary cloud name

//   try {
//     const res = await fetch('https://api.cloudinary.com/v1_1/dpo6qlmur/video/upload', {
//       method: 'POST',
//       body: data,
//     });

//     const result = await res.json();
//     return result.secure_url; // Optionally add '.mp4' if needed
//   } catch (err) {
//     console.error('Cloudinary Upload Error:', err);
//     return null;
//   }
// };

// // Save video metadata to Firestore
// export const saveToFirestore = async (videoUrl: string, title: string, description: string) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//     alert("❌ User not logged in.");
//     return;
//   }

//   const videoData = {
//     url: videoUrl,
//     title,
//     description,
//     createdAt: serverTimestamp(),
//     userId: user.uid,
//     userEmail: user.email,
//     likesCount: 0,
//     commentsCount: 0,
//   };

//   try {
//     // Save to user's personal collection
//     const userVideosRef = collection(db, "users_videos", user.uid, "videos");
//     await addDoc(userVideosRef, videoData);

//     // Save to global collection
//     const allVideosRef = collection(db, "all_videos");
//     await addDoc(allVideosRef, videoData);

//     alert("✅ Video saved!");
//   } catch (error) {
//     console.error('Firestore Error:', error);
//     alert("❌ Failed to save video metadata.");
//   }
// };

// // Complete video upload handler
// export const handleVideoUpload = async (videoFile: File, title: string, description: string) => {
//   const url = await uploadToCloudinary(videoFile);
//   if (url) {
//     await saveToFirestore(url, title, description);
//   } else {
//     alert("❌ Video upload failed.");
//   }
// };




import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';

// Type for videoFile param
// On web: it's File
// On mobile (expo): object with uri string (ImagePicker.Asset)
type VideoFile = File | { uri: string };

// Upload video to Cloudinary (accepts Blob or File)

export const uploadToCloudinary = async (videoFile: Blob | File): Promise<string | null> => {
  const data = new FormData();
  data.append('file', videoFile);
  data.append('upload_preset', 'video_upload'); // Your Cloudinary preset
  data.append('cloud_name', 'dpo6qlmur');       // Your Cloudinary cloud name

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dpo6qlmur/video/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    return result.secure_url as string;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    return null;
  }
};

// Save video metadata to Firestore
export const saveToFirestore = async (videoUrl: string, title: string, description: string): Promise<void> => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (!user) {
    alert("❌ User not logged in.");
    return;
  }

  const videoData = {
    url: videoUrl,
    title,
    description,
    createdAt: serverTimestamp(),
    userId: user.uid,
    userEmail: user.email,
    likesCount: 0,
    commentsCount: 0,
  };

  try {
    // Save to user's personal collection
    const userVideosRef = collection(db, "users_videos", user.uid, "videos");
    await addDoc(userVideosRef, videoData);

    // Save to global collection
    const allVideosRef = collection(db, "all_videos");
    await addDoc(allVideosRef, videoData);

    alert("✅ Video saved!");
  } catch (error) {
    console.error('Firestore Error:', error);
    alert("❌ Failed to save video metadata.");
  }
};

// Main handler to upload video and save metadata
export const handleVideoUpload = async (
  videoFile: VideoFile,
  title: string,
  description: string
): Promise<void> => {
  let fileToUpload: Blob | File;

  if ('uri' in videoFile) {
    // Mobile (expo) file, fetch blob from uri
    const response = await fetch(videoFile.uri);
    fileToUpload = await response.blob();
  } else {
    // Web file is File instance
    fileToUpload = videoFile;
  }

  const url = await uploadToCloudinary(fileToUpload);

  if (url) {
    await saveToFirestore(url, title, description);
  } else {
    alert("❌ Video upload failed.");
  }
};
