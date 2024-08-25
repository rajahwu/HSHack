import { aai } from '../../services/assembly_ai';

/**
 * Represents a transcription job
 * @constructor
 * @param {string} id - Unique identifier.
 * @param {string} audioUrl - URL or Base64 of the audio file.
 * @param {boolean} speakerLabels - Flag to enable speaker labels.
 */
class Transcription {
  constructor(id, audioUrl, speakerLabels = false) {
    this.id = id;
    this.audioUrl = audioUrl;
    this.speakerLabels = speakerLabels;
  }

  /**
   * Create a transcription job
   * @param {string} audioUrl - URL or Base64 of the audio file.
   * @param {boolean} speakerLabels - Flag to enable speaker labels.
   * @returns {Promise<Transcription>}
   */
  static async create(audioUrl, speakerLabels = false) {
    try {
      const data = { audio: audioUrl, speaker_labels: speakerLabels };
      const transcript = await aai.transcripts.transcribe(data);
      return new Transcription(transcript.id, audioUrl, speakerLabels);
    } catch (error) {
      console.error("Error creating transcription: ", error.message);
      throw new Error('Failed to create transcription');
    }
  }

  /**
   * Check the status of the transcription job
   * @param {string} id - The transcription job ID.
   * @returns {Promise<string>}
   */
  static async getStatus(id) {
    try {
      const transcript = await aai.transcripts.get(id);
      return transcript.status;
    } catch (error) {
      console.error("Error fetching transcription status: ", error.message);
      throw new Error('Failed to get transcription status');
    }
  }

  /**
   * Get the completed transcription text
   * @param {string} id - The transcription job ID.
   * @returns {Promise<object>}
   */
  static async getTranscription(id) {
    try {
      const transcript = await aai.transcripts.get(id);
      if (transcript.status === 'completed') {
        return transcript;
      } else {
        throw new Error('Transcription not completed');
      }
    } catch (error) {
      console.error("Error fetching transcription: ", error.message);
      throw new Error('Failed to get transcription');
    }
  }
}

export { Transcription };
