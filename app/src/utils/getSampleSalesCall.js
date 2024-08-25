// import { AssemblyAI } from 'assemblyai';
// import fs from 'fs';
// import path from 'path';

// const client = new AssemblyAI({
//     apiKey: process.env.ASSEMBLY_AI_API_KEY, // Set your API key in the environment variables
// });

// const filePath = path.resolve(__dirname, '../data/sample-sales-call.mp3'); // Adjust path as needed

// const run = async () => {
//     // Read the audio file as a buffer
//     const audioBuffer = fs.readFileSync(filePath);

//     // Convert the audio buffer to a base64-encoded string
//     const audioBase64 = audioBuffer.toString('base64');

//     const data = {
//         audio: audioBase64,
//         speaker_labels: true
//     };

//     try {
//         const transcript = await client.transcripts.transcribe(data);
//         console.log('Transcription:', transcript.text);

//         for (let utterance of transcript.utterances) {
//             console.log(`Speaker ${utterance.speaker}: ${utterance.text}`)
//         }

//     } catch (error) {
//         console.error('Error transcribing audio:', error);
//     }
// };

// run();
