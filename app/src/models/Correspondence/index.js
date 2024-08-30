import { TranscriberModel as genai } from "../../services/gemini";
import { doc, getDoc, setDoc, addDoc, collection, getDocs } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from "../../services/firebase";
import { SalesContact } from '../SalesContact';

/**
 * Represents an AI-generated correspondence for a sales contact.
 * @class
 */
class Correspondence {
  /**
   * Creates a new Correspondence instance.
   * @param {Object} params - The parameters for creating a Correspondence.
   * @param {string} params.id - Unique identifier.
   * @param {string} params.salesContactId - ID of the associated sales contact.
   * @param {Object} params.content - Generated content including script, summary, score, and outcome.
   * @param {string} [params.fallbackId] - ID for fallback content.
   */
  constructor({ id, salesContactId, content, fallbackId }) {
    this.id = id;
    this.salesContactId = salesContactId;
    this.content = content;
    this.fallbackId = fallbackId; // Store the fallback ID, if provided
  }

  /**
   * Creates a correspondence for a sales contact using Gemini API.
   * @param {SalesContact} salesContact - The sales contact object.
   * @returns {Promise<Correspondence>} The created Correspondence instance.
   * @throws {Error} Throws an error if creation fails.
   */
  static async createFromSalesContact(salesContact) {
    try {
      // Throw error for testing
      throw Error('correspondence testing');

      const prompt = createGeminiPrompt(salesContact);
      const response = await genai.generateContent(prompt);
      const content = JSON.parse(response.text);

      return new Correspondence({ id: response.id, salesContactId: salesContact.id, content });
    } catch (error) {
      console.error("Error creating correspondence: ", error.message);

      // Fallback content based on sales contact type
      const fallbackContent = getFallbackContent(salesContact.type);

      // Create or get the fallback correspondence from Firestore
      const fallbackCorrespondence = await Correspondence.createOrGetFallbackCorrespondence({
        salesContactId: salesContact.id,
        content: fallbackContent,
      });

      return fallbackCorrespondence;
    }
  }

  /**
   * Fetches the correspondence by its ID.
   * @param {string} id - The correspondence ID.
   * @returns {Promise<Correspondence>} The fetched Correspondence instance.
   * @throws {Error} Throws an error if fetching fails.
   */
  static async getCorrespondence(id) {
    try {
      const docRef = doc(db, "correspondences", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const correspondence = new Correspondence({
          id: id,
          salesContactId: data.salesContactId,
          content: data.content,
          fallbackId: data.fallbackId,
        });
        return correspondence;
      } else {
        throw new Error("Correspondence not found.");
      }
    } catch (error) {
      console.error("Error fetching correspondence: ", error.message);
      throw new Error("Failed to get correspondence");
    }
  }

  /**
 * Fetches all correspondences from the Firestore collection.
 * @returns {Promise<Correspondence[]>} An array of Correspondence instances.
 * @throws {Error} Throws an error if fetching fails.
 */
static async getAllCorrespondences() {
  try {
    const querySnapshot = await getDocs(collection(db, "correspondences"));
    const correspondences = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const correspondence = new Correspondence({
        id: doc.id,
        salesContactId: data.salesContactId,
        content: data.content,
        fallbackId: data.fallbackId,
      });
      correspondences.push(correspondence);
    });

    return correspondences;
  } catch (error) {
    console.error("Error fetching correspondences: ", error.message);
    throw new Error("Failed to fetch all correspondences");
  }
}

    /**
   * Checks for an existing fallback correspondence or creates one if not found.
   * @param {Object} params - The parameters for the fallback Correspondence.
   * @returns {Promise<Correspondence>} The fetched or created Correspondence instance.
   */
  static async createOrGetFallbackCorrespondence({ salesContactId, content }) {
    try {
      // Attempt to find an existing correspondence
      const fallbackId = `fallback-${salesContactId}`;
      const salesContact = await SalesContact.fieldById(salesContactId)
      const existingCorrespondence = await this.getCorrespondence(salesContact.correspondenceId);
      if (existingCorrespondence) {
        return existingCorrespondence;
      }
    } catch (error) {
      console.log("Fallback correspondence not found, creating new one.");
    }

    // Create a new fallback correspondence if it does not exist
    const docRef = await addDoc(collection(db, "correspondences"), {
      salesContactId,
      content,
      fallbackId: `fallback-${salesContactId}`, // Save the fallback ID under a separate field
    });

    // Fetch the created document's ID
    const fallbackId = docRef.id;
    return new Correspondence({ id: fallbackId, salesContactId, content });
  }
}

/**
 * Generates the Gemini API prompt based on the sales contact details.
 * @param {SalesContact} salesContact - The sales contact object.
 * @returns {string} The generated prompt for the Gemini API.
 */
function createGeminiPrompt(salesContact) {
  const { type, duration, participants } = salesContact;
  const maxDuration = 90; // 1.5 minutes in seconds

  // Calculate approximate lengths based on type
  const length = Math.min(duration, maxDuration);
  let prompt = '';

  switch (type) {
    case 'call':
      const callLines = Math.min(Math.floor(length / 60), 10); // Lines based on duration
      const callScript = generateCallScript(callLines);
      prompt = `Generate a sales call transcript with the following details:
        ID: ${salesContact.id}
        Date: ${salesContact.date.toISOString()}  // Convert date to ISO string
        Duration: ${duration} seconds
        Participants: Caller: ${participants.caller}, Customer: ${participants.customer}

        Use the following format for the response:
        {
          "script": {
            "caller": ${JSON.stringify(callScript.caller)},
            "customer": ${JSON.stringify(callScript.customer)}
          },
          "summary": "Provide a summary based on the script.",
          "score": "Provide a score (0-100).",
          "outcome": "Choose from predefined outcomes: ['success', 'failure']."
        }`;
      break;

    case 'email':
      const emailChainLength = Math.min(Math.floor(length / 10), 6); // Chain length based on duration
      const emailChain = generateEmailChain(emailChainLength);
      prompt = `Generate an email chain with the following details:
        ID: ${salesContact.id}
        Date: ${salesContact.date.toISOString()}  // Convert date to ISO string
        Duration: ${duration} seconds
        Participants: Caller: ${participants.caller}, Customer: ${participants.customer}

        Use the following format for the response:
        {
          "chain": ${JSON.stringify(emailChain)},
          "summary": "Provide a summary based on the chain.",
          "score": "Provide a score (0-100).",
          "outcome": "Choose from predefined outcomes: ['success', 'failure']."
        }`;
      break;

    case 'text':
      const textChainLength = Math.min(Math.floor(length / 5), 20); // Message chain length based on duration
      const textChain = generateTextChain(textChainLength);
      prompt = `Generate a text message chain with the following details:
        ID: ${salesContact.id}
        Date: ${salesContact.date.toISOString()}  // Convert date to ISO string
        Duration: ${duration} seconds
        Participants: Caller: ${participants.caller}, Customer: ${participants.customer}

        Use the following format for the response:
        {
          "chain": ${JSON.stringify(textChain)},
          "summary": "Provide a summary based on the chain.",
          "score": "Provide a score (0-100).",
          "outcome": "Choose from predefined outcomes: ['success', 'failure']."
        }`;
      break;

    default:
      throw new Error('Unsupported contact type');
  }

  return prompt;
}

/**
 * Generates fallback content based on the type of sales contact.
 * @param {string} type - The type of sales contact (e.g., 'call', 'email', 'text').
 * @returns {Object} The fallback content for the given type.
 */
function getFallbackContent(type) {
  switch (type) {
    case 'call':
      return {
        script: {
          caller: [
            "Hey, how are you?",
            "Do you want our super awesome product?",
          ],
          customer: [
            "Good, thanks!",
            "No, thank you.",
          ],
        },
        summary: "The caller initiated a sales call, inquiring about the customer's interest in their product. The customer politely declined.",
        score: 10,
        outcome: "failure",
      };

    case 'email':
      return {
        chain: [
          { sender: "Caller", content: "Hello, would you be interested in our product?" },
          { sender: "Customer", content: "Thank you, but not at this time." }
        ],
        summary: "The email exchange was brief, with the customer declining the offer.",
        score: 40,
        outcome: "failure",
      };

    case 'text':
      return {
        chain: [
          { sender: "Caller", message: "Hi, are you available for a quick chat?" },
          { sender: "Customer", message: "Sorry, I'm busy right now." },
        ],
        summary: "A short text conversation where the customer was not available.",
        score: 60,
        outcome: "failure",
      };

    default:
      throw new Error('Unsupported type for fallback');
  }
}

export default Correspondence;
