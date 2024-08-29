import { TranscriberModel as genai } from "../../services/gemini";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library to generate unique IDs

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
   */
  constructor({ id, salesContactId, content }) {
    this.id = id;
    this.salesContactId = salesContactId;
    this.content = content;
  }

  /**
   * Creates a correspondence for a sales contact using Gemini API.
   * @param {SalesContact} salesContact - The sales contact object.
   * @returns {Promise<Correspondence>} The created Correspondence instance.
   * @throws {Error} Throws an error if creation fails.
   */
  static async createFromSalesContact(salesContact) {
    try {
      throw Error('correspondence testing');
      const prompt = createGeminiPrompt(salesContact);
      const response = await genai.generateContent(prompt);
      const content = JSON.parse(response.text);

      return new Correspondence({ id: response.id, salesContactId: salesContact.id, content });
    } catch (error) {
      console.error("Error creating correspondence: ", error.message);

      // Fallback content based on sales contact type
      const fallbackContent = getFallbackContent(salesContact.type);

      // Generate a unique ID for fallback content
      const fallbackId = `fallback-${salesContact.type}-${uuidv4()}`;

      // Save the fallback correspondence to the database
      await Correspondence.createOrGetFallbackCorrespondence({
        id: fallbackId,
        salesContactId: salesContact.id,
        content: fallbackContent,
      });

      return new Correspondence({
        id: fallbackId,
        salesContactId: salesContact.id,
        content: fallbackContent,
      });
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
        return new Correspondence({
          id: data.id,
          salesContactId: data.salesContactId,
          content: data.content,
        });
      } else {
        throw new Error("Correspondence not found.");
      }
    } catch (error) {
      console.error("Error fetching correspondence: ", error.message);
      throw new Error("Failed to get correspondence");
    }
  }

  /**
   * Fetches the correspondence by its salesContact ID.
   * @param {string} salesContactId - The salesContact ID associated with the correspondence.
   * @returns {Promise<Correspondence>} The fetched Correspondence instance.
   * @throws {Error} Throws an error if fetching fails.
   */
  static async getCorrespondenceBySalesContact(salesContactId) {
    try {
      const docRef = doc(db, "correspondences", salesContactId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return new Correspondence({
          id: data.id,
          salesContactId,
          content: data.content,
        });
      } else {
        throw new Error("Correspondence not found.");
      }
    } catch (error) {
      console.error("Error fetching correspondence: ", error.message);
      throw new Error("Failed to get correspondence");
    }
  }

  /**
   * Checks for an existing fallback correspondence or creates one if not found.
   * @param {Object} params - The parameters for the fallback Correspondence.
   * @returns {Promise<Correspondence>} The fetched or created Correspondence instance.
   */
  static async createOrGetFallbackCorrespondence({ id, salesContactId, content }) {
    try {
      // Check if the fallback correspondence already exists
      const existingCorrespondence = await this.getCorrespondence(id);
      if (existingCorrespondence) {
        return existingCorrespondence;
      }
    } catch (error) {
      console.log("Fallback correspondence not found, creating new one.");
    }

    // Create a new fallback correspondence if it does not exist
    const fallbackDocRef = doc(db, "correspondences", id);
    await setDoc(fallbackDocRef, {
      id,
      salesContactId,
      content,
    });

    return new Correspondence({ id, salesContactId, content });
  }
}

/**
 * Generates the Gemini API prompt based on the sales contact details.
 * @param {SalesContact} salesContact - The sales contact object.
 * @returns {string} The generated prompt for the Gemini API.
 */
function createGeminiPrompt(salesContact) {
  // Existing prompt generation logic
  // ...
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
          "Subject: Check out our new product!\n\nHi there, check out our new product that we think you’ll love!",
          "Subject: Don’t miss out on our sale!\n\nWe have an amazing sale going on. Don’t miss out!",
        ],
        summary: "The caller sent two emails promoting a new product and a sale.",
        score: 50,
        outcome: "failure",
      };

    case 'text':
      return {
        chain: [
          "Hi! Just checking in.",
          "Are you interested in our product?",
          "We have a special offer for you!",
        ],
        summary: "The caller checked in and offered a special deal on their product.",
        score: 60,
        outcome: "failure",
      };

    default:
      throw new Error("Unsupported contact type for fallback content");
  }
}

export { Correspondence };
