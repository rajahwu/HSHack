import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../services/firebase";

/**
 * Represents a sales contact.
 * @class
 */
class SalesContact {
 
/**
   * Creates a new SalesContact instance.
   * @param {Object} params - The parameters for creating a SalesContact.
   * @param {string} params.id - Unique identifier.
   * @param {Date} params.date - The date of the sales contact.
   * @param {number} params.duration - The duration of the sales contact in seconds.
   * @param {Object} params.participants - The participants involved in the sales contact.
   * @param {string} [params.correspondenceId] - The correspondence ID between the caller and customer.
   * @param {string} [params.transcriptionId] - (optional) The transcription ID associated with the sales contact.
   * @param {string} [params.status='pending'] - (optional) The status of the sales contact.
   * @param {string} [params.type='call'] - (optional) The type of the sales contact.
   */
constructor({ id, date, duration, participants, correspondenceId = null, transcriptionId = null, status = 'pending', type = 'call' }) {
  this.id = id;
  this.date = date;
  this.type = type;
  this.duration = duration || SalesContact.generateRandomValue(type);
  this.participants = participants;
  this.correspondenceId = correspondenceId;
  this.transcriptionId = transcriptionId;
  this.status = status;
}

    /**
   * Generates a random value based on the contact type.
   * @param {string} type - The type of sales contact ('call', 'email', or 'text').
   * @returns {number} The generated random value.
   */
  static generateRandomValue(type) {
    switch (type) {
      case 'call':
        // Duration between 1 second and 90 seconds (1.5 minutes)
        return Math.floor(Math.random() * 90) + 1;
      case 'email':
        // Chain length between 1 and 6
        return Math.floor(Math.random() * 6) + 1;
      case 'text':
        // Number of messages between 1 and 20
        return Math.floor(Math.random() * 20) + 1;
      default:
        return 0; // Default value for unknown types
    }
  }

  /**
   * Generates a random duration between 1 and 10 minutes (in seconds).
   * @returns {number} The generated duration in seconds.
   */
  static generateRandomDuration() {
    return Math.floor(Math.random() * 600) + 60;
  }

  /**
   * Creates a new SalesContact and stores it in Firestore.
   * @param {Object} params - The parameters for creating a SalesContact.
   * @param {Date} params.date - The date of the sales contact.
   * @param {number} params.duration - The duration of the sales contact in seconds.
   * @param {Object} params.participants - The participants involved in the sales contact.
   * @param {string} params.correspondenceId = (optional) The correspondence betweent the caller and customer.
   * @param {string} [params.transcriptionId] - (optional) The transcription ID associated with the sales contact.
   * @param {string} [params.status='pending'] - (optional) The status of the sales contact.
   * @returns {Promise<SalesContact>} The created SalesContact instance.
   */
  static async create({ date, duration, participants, correspondenceId = null, transcriptionId = null, status = 'pending', type }) {
    const id = doc(collection(db, "salesContacts")).id;
    const salesContact = new SalesContact({ id, date, duration, participants, correspondenceId, transcriptionId, status, type });

    await setDoc(doc(db, "salesContacts", id), {
      id,
      date,
      type,
      duration: salesContact.duration,
      participants,
      correspondenceId,
      transcriptionId,
      status,
    });

    return salesContact;
  }

  /**
   * Links a transcription to the sales contact and updates Firestore.
   * @param {string} transcriptionId - The transcription ID to link.
   * @returns {Promise<void>}
   */
  async linkTranscription(transcriptionId) {
    this.transcriptionId = transcriptionId;
    await setDoc(doc(db, "salesContacts", this.id), { transcriptionId }, { merge: true });
  }

  /**
   * Updates the status of the sales contact and updates Firestore.
   * @param {string} newStatus - The new status of the sales contact.
   * @returns {Promise<void>}
   */

    /**
   * Links a correspondence to the sales contact and updates Firestore.
   * @param {string} correspondenceId - The correspondence ID to link.
   * @returns {Promise<void>}
   */
  async linkCorrespondence(correspondenceId) {
    try {
      const salesContactRef = doc(db, "salesContacts", this.id);
      await setDoc(salesContactRef, { correspondenceId: correspondenceId }, { merge: true });
      this.correspondenceId = correspondenceId; 
      console.log(`Correspondence ID ${correspondenceId} linked to SalesContact ${this.id}`);
    } catch (error) {
      console.error("Failed to link correspondence:", error);
      throw error;
    }
  }

  /**
   * Updates the status of the sales contact and updates Firestore.
   * @param {string} newStatus - The new status of the sales contact.
   * @returns {Promise<void>}
   */

  async updateStatus(newStatus) {
    this.status = newStatus;
    await setDoc(doc(db, "salesContacts", this.id), { status: newStatus }, { merge: true });
  }

  /**
   * Finds sales contacts by customer ID.
   * @param {string} customerId - The ID of the customer.
   * @returns {Promise<SalesContact[]>} A promise that resolves to an array of SalesContact instances.
   */
  static async findByCustomer(customerId) {
    const q = query(collection(db, "salesContacts"), where("participants.customer", "==", customerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => new SalesContact(doc.data()));
  }

  /**
   * Finds sales contacts by caller ID.
   * @param {string} callerId - The ID of the caller.
   * @returns {Promise<SalesContact[]>} A promise that resolves to an array of SalesContact instances.
   */
  static async findByCaller(callerId) {
    const q = query(collection(db, "salesContacts"), where("participants.caller", "==", callerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => new SalesContact(doc.data()));
  }

  /**
   * Finds a sales contact by its unique ID.
   * @param {string} id - The unique ID of the sales contact.
   * @returns {Promise<SalesContact|null>} A promise that resolves to the SalesContact instance or null if not found.
   */
  static async findById(id) {
    const salesContactDoc = await getDoc(doc(db, "salesContacts", id));
    if (salesContactDoc.exists()) {
      // Ensure all fields, including correspondenceId, are correctly assigned
      return new SalesContact(salesContactDoc.data());
    } else {
      return null; // or throw an error if preferred
    }
  }
}

export { SalesContact };
