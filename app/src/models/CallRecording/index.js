/**
 * Represents a call recording
 * @constructor
 * @param {string} id - Unique identifier for the call recording.
 * @param {string} salesCallId - ID of the associated sales call.
 * @param {string} audioUrl - URL of the call recording.
 * @param {string} [format='mp3'] - Format of the call recording.
 * @param {number} [size] - Size of the call recording in bytes.
 */
class CallRecording {
    constructor(id, salesCallId, audioUrl, format = 'mp3', size = null) {
      this.id = id;
      this.salesCallId = salesCallId;
      this.audioUrl = audioUrl;
      this.format = format;
      this.size = size;
    }
  
    // Method to update the recording details
    updateDetails(audioUrl, format, size) {
      this.audioUrl = audioUrl;
      this.format = format;
      this.size = size;
    }
  
    // Method to associate this recording with a sales call
    associateWithSalesCall(salesCallId) {
      this.salesCallId = salesCallId;
    }
  }
  
  export { CallRecording };
  