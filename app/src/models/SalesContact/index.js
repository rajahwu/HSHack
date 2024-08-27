import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../services/firebase"; // Assuming you have a firebase.js file with your Firestore instance

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
class SalesContact {
  constructor({ id, date, duration, participants, transcriptionId = null, status = 'pending', type = 'call' }) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.duration = duration;
    this.participants = participants;
    this.transcriptionId = transcriptionId;
    this.status = status;
  }

  /**
   * Create a new sales call record
   * @param {string} date - Date of the sales call.
   * @param {string} type - Type of the sales call (e.g., 'call', 'email', 'text').
   * @param {number} duration - Duration of the sales call in seconds.
   * @param {string[]} participants - List of participant names or IDs.
   * @param {string} [transcriptionId] - Optional ID for the associated transcription.
   * @param {string} [status='pending'] - Status of the sales call.
   * @returns {SalesCall}
   */
  static async create({ id, date, duration, participants, transcriptionId = null, status = 'pending' }) {
    const id = doc(collection(db, "salesContacts")).id; // Generate a new document ID
    const salesContact = new SalesContact({ id, date, type, duration, participants, transcriptionId, status });

    await setDoc(doc(db, "salesContacts", id), {
      id,
      date,
      type,
      duration,
      caller: participants.caller,
      customer: participants.customer,
      transcriptionId,
      status: this.transcriptionId ? 'completed' : status,
    });

    return salesContact;
  }

  /**
   * Find sales contacts by customer
   * @param {string} customerId - ID of the customer.
   * @returns {Promise<SalesContact[]>} - Array of SalesContact objects.
   */
  static async findByCustomer(customerId) {
    const q = query(
      collection(db, "salesContacts"),
      where("customer", "==", customerId)
    );
    const querySnapshot = await getDocs(q);
    const salesContacts = [];
    querySnapshot.forEach((doc) => {
      salesContacts.push(new SalesContact(doc.data()));
    });
    return salesContacts;
  }

  /**
   * Find sales contacts by caller
   * @param {string} callerId - ID of the caller.
   * @returns {Promise<SalesContact[]>} - Array of SalesContact objects.
   */
  static async findByCaller(callerId) {
    const q = query(
      collection(db, "salesContacts"),
      where("caller", "==", callerId)
    );
    const querySnapshot = await getDocs(q);
    const salesContacts = [];
    querySnapshot.forEach((doc) => {
      salesContacts.push(new SalesContact(doc.data()));
    });
    return salesContacts;
  }

  /**
   * Find sales contacts by type
   * @param {string} type - Type of the sales contact (e.g., 'call', 'email', 'text').
   * @returns {Promise<SalesContact[]>} - Array of SalesContact objects.
   */
  static async findByType(type) {
    const q = query(
      collection(db, "salesContacts"),
      where("type", "==", type)
    );
    const querySnapshot = await getDocs(q);
    const salesContacts = [];
    querySnapshot.forEach((doc) => {
      salesContacts.push(new SalesContact(doc.data()));
    });
    return salesContacts;
  }

  /**
   * Link a transcription to the sales call and update the status
   * @param {string} transcriptionId - ID of the transcription.
   * @returns {Promise<void>}
   */
  async linkTranscription(transcriptionId) {
    this.transcriptionId = transcriptionId;
    this.status = 'completed'; // Automatically set status to 'completed' when transcription is linked

    await updateDoc(doc(db, "salesContacts", this.id), {
      transcriptionId: this.transcriptionId,
      status: this.status,
    });
  }

  /**
   * Update the status of the sales call in the database
   * @param {string} newStatus - New status of the sales call.
   * @returns {Promise<void>}
   */
  async updateStatus(newStatus) {
    this.status = newStatus;

    await updateDoc(doc(db, "salesContacts", this.id), {
      status: this.status,
    });
  }

}

export { SalesContact };
