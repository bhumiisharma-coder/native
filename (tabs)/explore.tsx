
// import React, { useState } from 'react';
// import { handleVideoUpload } from '../videoupload/uploadvideo';

// const UploadForm: React.FC = () => {
//   const [video, setVideo] = useState<File | null>(null);
//   const [title, setTitle] = useState('');
//   const [desc, setDesc] = useState('');

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!video || !title.trim()) {
//       alert("Please select a video and enter a title.");
//       return;
//     }

//     await handleVideoUpload(video, title, desc);

//     // Optional: Reset form after upload
//     setVideo(null);
//     setTitle('');
//     setDesc('');
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setVideo(e.target.files[0]);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <h2>📤 Upload Video</h2>

//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//       />
//       <br />

//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <br />

//       <textarea
//         placeholder="Description"
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)}
//       />
//       <br />

//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadForm;



// import React, { useState } from 'react';
// import { Platform, View, TextInput, Button, Text } from 'react-native';
// import { handleVideoUpload } from '../videoupload/uploadvideo';  // your existing function
// import { pickVideo } from '../utils/pickVideo';

// const UploadForm = () => {
//   const [video, setVideo] = useState(null); // can be File (web) or Asset (mobile)
//   const [title, setTitle] = useState('');
//   const [desc, setDesc] = useState('');

//   const handleFileChange = async (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setVideo(e.target.files[0]);
//     }
//   };

//   const handleMobilePick = async () => {
//     const file = await pickVideo();
//     if (file) {
//       setVideo(file); // file.uri will be used
//     }
//   };

//   const handleSubmit = async () => {
//     if (!video || !title.trim()) {
//       alert("Please select a video and enter a title.");
//       return;
//     }

//     await handleVideoUpload(video, title, desc);
//     setVideo(null);
//     setTitle('');
//     setDesc('');
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>📤 Upload Video</Text>

//       {Platform.OS === 'web' ? (
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//       ) : (
//         <Button title="Pick Video from Gallery" onPress={handleMobilePick} />
//       )}

//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//         style={{ borderBottomWidth: 1, marginVertical: 10 }}
//       />
//       <TextInput
//         placeholder="Description"
//         value={desc}
//         onChangeText={setDesc}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//       />

//       <Button title="Upload" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default UploadForm;










// import React, { useState } from 'react';
// import { Platform, View, TextInput, Button, Text } from 'react-native';
// import { handleVideoUpload } from '../../videoupload/uploadvideo'; // your existing function
// import { pickVideo } from '../../utils/pickVideo';

// // For web, the input event type
// type FileInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

// // The video can be a File (web) or an Asset-like object (mobile)
// type VideoFile = File | { uri: string } | null;

// const UploadForm: React.FC = () => {
//   const [video, setVideo] = useState<VideoFile>(null);
//   const [title, setTitle] = useState<string>('');
//   const [desc, setDesc] = useState<string>('');

//   // Handle file input change event for web
//   const handleFileChange = (e: FileInputChangeEvent) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setVideo(e.target.files[0]);
//     }
//   };

//   // Pick video from mobile gallery
//   const handleMobilePick = async () => {
//     const file = await pickVideo();
//     if (file) {
//       setVideo(file);
//     }
//   };

//   // Submit handler
//   const handleSubmit = async () => {
//     if (!video || !title.trim()) {
//       alert('Please select a video and enter a title.');
//       return;
//     }

//     await handleVideoUpload(video, title, desc);

//     // Reset form
//     setVideo(null);
//     setTitle('');
//     setDesc('');
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>📤 Upload Video</Text>

//       {Platform.OS === 'web' ? (
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//       ) : (
//         <Button title="Pick Video from Gallery" onPress={handleMobilePick} />
//       )}

//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//         style={{ borderBottomWidth: 1, marginVertical: 10 }}
//       />
//       <TextInput
//         placeholder="Description"
//         value={desc}
//         onChangeText={setDesc}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//       />

//       <Button title="Upload" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default UploadForm;


// import React, { useState } from 'react';
// import { Platform, View, TextInput, Button, Text } from 'react-native';
// import { handleVideoUpload } from '../../videoupload/uploadvideo';
// import { pickVideo } from '../../utils/pickVideo';

// type FileInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
// type VideoFile = File | { uri: string } | null;

// export default function UploadForm() {
//   const [video, setVideo] = useState<VideoFile>(null);
//   const [title, setTitle] = useState<string>('');
//   const [desc, setDesc] = useState<string>('');

//   function handleFileChange(e: FileInputChangeEvent) {
//     if (e.target.files && e.target.files.length > 0) {
//       setVideo(e.target.files[0]);
//     }
//   }

//   async function handleMobilePick() {
//     const file = await pickVideo();
//     if (file) {
//       setVideo(file);
//     }
//   }

//   async function handleSubmit() {
//     if (!video || !title.trim()) {
//       alert('Please select a video and enter a title.');
//       return;
//     }

//     await handleVideoUpload(video, title, desc);

//     setVideo(null);
//     setTitle('');
//     setDesc('');
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>📤 Upload Video</Text>

//       {Platform.OS === 'web' ? (
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//       ) : (
//         <Button title="Pick Video from Gallery" onPress={handleMobilePick} />
//       )}

//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//         style={{ borderBottomWidth: 1, marginVertical: 10 }}
//       />
//       <TextInput
//         placeholder="Description"
//         value={desc}
//         onChangeText={setDesc}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//       />

//       <Button title="Upload" onPress={handleSubmit} />
//     </View>
//   );
// }



// explore.tsx
import React, { useState } from 'react';
import { Platform, View, TextInput, Button, Text } from 'react-native';
import { handleVideoUpload } from '../../videoupload/uploadvideo';
import { pickVideo } from '../../utils/pickVideo';

type FileInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type VideoFile = File | { uri: string } | null;

export default function Explore() { // <-- changed from UploadForm to Explore
  const [video, setVideo] = useState<VideoFile>(null);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  function handleFileChange(e: FileInputChangeEvent) {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  }

  async function handleMobilePick() {
    const file = await pickVideo();
    if (file) {
      setVideo(file);
    }
  }

  async function handleSubmit() {
    if (!video || !title.trim()) {
      alert('Please select a video and enter a title.');
      return;
    }

    await handleVideoUpload(video, title, desc);

    setVideo(null);
    setTitle('');
    setDesc('');
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>📤 Upload Video</Text>

      {Platform.OS === 'web' ? (
        <input type="file" accept="video/*" onChange={handleFileChange} />
      ) : (
        <Button title="Pick Video from Gallery" onPress={handleMobilePick} />
      )}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Upload" onPress={handleSubmit} />
    </View>
  );
}
