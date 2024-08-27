/**
 * Represents a sales call
 * @constructor
 * @param {string} id - Unique identifier for the sales call.
 * @param {string} date - Date of the sales call.
 * @param {number} duration - Duration of the sales call in seconds.
 * @param {string[]} participants - List of participant names or IDs.
 * @param {string} [transcriptionId] - Optional ID for the associated transcription.
 * @param {string} [status='pending'] - Status of the sales call (e.g., 'pending', 'completed', 'in-progress').
 */
class Contact {
  constructor(id, date, duration, participants, transcriptionId = null, status = 'pending') {
    this.id = id;
    this.date = date;
    this.duration = duration;
    this.participants = participants;
    this.transcriptionId = transcriptionId;
    this.status = status;
  }

  /**
   * Create a new sales call record
   * @param {string} date - Date of the sales call.
   * @param {number} duration - Duration of the sales call in seconds.
   * @param {string[]} participants - List of participant names or IDs.
   * @param {string} [transcriptionId] - Optional ID for the associated transcription.
   * @param {string} [status='pending'] - Status of the sales call.
   * @returns {SalesCall}
   */
  static create(id, date, duration, participants, transcriptionId = null, status = 'pending') {
    return new SalesCall(id, date, duration, participants, transcriptionId, status);
  }

  /**
   * Link a transcription to the sales call
   * @param {string} transcriptionId - ID of the transcription.
   */
  linkTranscription(transcriptionId) {
    this.transcriptionId = transcriptionId;
  }

  /**
   * Update the status of the sales call
   * @param {string} newStatus - New status of the sales call.
   */
  updateStatus(newStatus) {
    this.status = newStatus;
  }

  }

export { Contact };
