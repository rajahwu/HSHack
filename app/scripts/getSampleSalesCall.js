const { AssemblyAI } = require('assemblyai');
const fs = require('fs');
const path = require('path');

// Initialize the AssemblyAI client with your API key
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_API_KEY, // Replace with your actual API key
});

// URL of the audio file to transcribe
// const audioUrl = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';
const audioUrl = path.resolve(__dirname, '../src/data/sample-sales-call.mp3');

// Output file path
const outputFilePath = path.resolve(__dirname, './transcription-output.txt');

// Parameters for the transcription, including speaker diarization
const params = {
  audio: audioUrl,
  speaker_labels: true,
};

const run = async () => {
    try {
        // Transcribe the audio
        const transcript = await client.transcripts.transcribe(params);

        // Prepare the output string
        let output = `Transcription:\n${transcript.text}\n\nUtterances:\n`;

        // Loop through the utterances and append each to the output string
        transcript.utterances.forEach(utterance => {
            output += `Speaker ${utterance.speaker}: ${utterance.text}\n`;
        });

        // Write the output to a file
        await fs.promises.writeFile(outputFilePath, output, 'utf-8');
        console.log('Transcription saved to', outputFilePath);
    } catch (error) {
        console.error('Error transcribing audio:', error);
    }
};

// Run the transcription
run();
