import { TranscriberModel as genai } from "../../services/gemini";

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
      const prompt = createGeminiPrompt(salesContact);
      const response = await genai.generate_content(prompt);
      const content = JSON.parse(response.text);

      return new Correspondence({ id: response.id, salesContactId: salesContact.id, content });
    } catch (error) {
      console.error("Error creating correspondence: ", error.message);
      throw new Error('Failed to create correspondence');
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
      const response = await genai.getCorrespondence(id);
      return new Correspondence({ id: response.id, salesContactId: response.salesContactId, content: JSON.parse(response.correspondenceText) });
    } catch (error) {
      console.error("Error fetching correspondence: ", error.message);
      throw new Error('Failed to get correspondence');
    }
  }
}

/**
 * Generates the Gemini API prompt based on the sales contact details.
 * @param {SalesContact} salesContact - The sales contact object.
 * @returns {string} The generated prompt for the Gemini API.
 */
function createGeminiPrompt(salesContact) {
  const dialogLines = Math.min(Math.floor(salesContact.duration / 60), 10); // Max 10 lines based on duration
  const callScript = generateCallScript(dialogLines);

  const prompt = `
    Generate a sales call transcript with the following details:
    ID: ${salesContact.id}
    Date: ${salesContact.date}
    Duration: ${salesContact.duration} seconds
    Participants: ${salesContact.participants.join(', ')}

    Use the following format for the response:
    {
      "script": {
        "caller": ${JSON.stringify(callScript.caller)},
        "customer": ${JSON.stringify(callScript.customer)}
      },
      "summary": "Provide a summary based on the script.",
      "score": "Provide a score (0-100).",
      "outcome": "Choose from predefined outcomes: ['success', 'failure']."
    }
  `;

  return prompt;
}

/**
 * Generates a simplified sales call script.
 * @param {number} lines - Number of lines in the script.
 * @returns {Object} The generated script with caller and customer dialogs.
 */
function generateCallScript(lines) {
  const callerLines = [
    "Hey, how are you?",
    "Do you want our super awesome product?",
    "Here are its awesome features: great one, awesome two, and amazing three.",
    "Are you interested in learning more?",
    "It’s a great deal, don’t miss out!",
  ];

  const customerLines = [
    "Good, thanks!",
    "No, thank you.",
    "That sounds interesting.",
    "Can you tell me more?",
    "I’m not sure, I’ll think about it.",
  ];

  return {
    caller: callerLines.slice(0, Math.ceil(lines / 2)),
    customer: customerLines.slice(0, Math.floor(lines / 2)),
  };
}

export { Correspondence };
