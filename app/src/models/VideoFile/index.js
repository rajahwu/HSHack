/**
 * Represents a video recording
 * @constructor
 * @param {string} id - Unique identifier for the video recording.
 * @param {string} salesCallId - ID of the associated sales call.
 * @param {string} videoUrl - URL of the video recording.
 * @param {string} [format='mp4'] - Format of the video recording.
 * @param {number} [size] - Size of the video recording in bytes.
 */
class VideoFile {
    constructor(id, salesCallId, videoUrl, format = 'mp4', size = null) {
      this.id = id;
      this.salesCallId = salesCallId;
      this.videoUrl = videoUrl;
      this.format = format;
      this.size = size;
    }
  
    // Method to update the video details
    updateDetails(videoUrl, format, size) {
      this.videoUrl = videoUrl;
      this.format = format;
      this.size = size;
    }
  
    // Method to associate this video with a sales call
    associateWithSalesCall(salesCallId) {
      this.salesCallId = salesCallId;
    }
  }
  
  export { VideoFile };
  