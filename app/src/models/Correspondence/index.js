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
  const { type, duration } = salesContact;
  const maxDuration = 90; // 1.5 minutes in seconds

  // Calculate approximate lengths based on type
  const length = Math.min(duration, maxDuration);
  let prompt = '';

  switch (type) {
    case 'call':
      const callLines = Math.min(Math.floor(length / 60), 10); // Lines based on duration
      const callScript = generateCallScript(callLines);
      prompt = `
        Generate a sales call transcript with the following details:
        ID: ${salesContact.id}
        Date: ${salesContact.date}
        Duration: ${duration} seconds
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
      break;

    case 'email':
      const emailChainLength = Math.min(Math.floor(length / 10), 6); // Chain length based on duration
      const emailChain = generateEmailChain(emailChainLength);
      prompt = `
        Generate an email chain with the following details:
        ID: ${salesContact.id}
        Date: ${salesContact.date}
        Duration: ${duration} seconds
        Participants: ${salesContact.participants.join(', ')}

        Use the following format for the response:
        {
          "chain": ${JSON.stringify(emailChain)},
          "summary": "Provide a summary based on the chain.",
          "score": "Provide a score (0-100).",
          "outcome": "Choose from predefined outcomes: ['success', 'failure']."
        }
      `;
      break;

    case 'text':
      const textChainLength = Math.min(Math.floor(length / 5), 20); // Message chain length based on duration
      const textChain = generateTextChain(textChainLength);
      prompt = `
        Generate a text message chain with the following details:
        ID: ${salesContact.id}
        Date: ${salesContact.date}
        Duration: ${duration} seconds
        Participants: ${salesContact.participants.join(', ')}

        Use the following format for the response:
        {
          "chain": ${JSON.stringify(textChain)},
          "summary": "Provide a summary based on the chain.",
          "score": "Provide a score (0-100).",
          "outcome": "Choose from predefined outcomes: ['success', 'failure']."
        }
      `;
      break;

    default:
      throw new Error('Unsupported contact type');
  }

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

/**
 * Generates a simplified email chain.
 * @param {number} length - Number of emails in the chain.
 * @returns {Array<string>} The generated email chain.
 */
function generateEmailChain(length) {
  const emailTemplates = [
    "Subject: Check out our new product!\n\nHi there, check out our new product that we think you’ll love!",
    "Subject: Don’t miss out on our sale!\n\nWe have an amazing sale going on. Don’t miss out!",
    "Subject: Last chance to get 20% off!\n\nThis is your last chance to get 20% off on our products.",
    "Subject: Thank you for your purchase!\n\nThank you for purchasing from us. We hope you enjoy your product.",
    "Subject: How was your experience?\n\nWe’d love to hear about your experience with our product."
  ];

  return emailTemplates.slice(0, length);
}

/**
 * Generates a simplified text message chain.
 * @param {number} length - Number of messages in the chain.
 * @returns {Array<string>} The generated text message chain.
 */
function generateTextChain(length) {
  const textMessages = [
    "Hi! Just checking in.",
    "Are you interested in our product?",
    "We have a special offer for you!",
    "Don’t miss out on this opportunity!",
    "Let me know if you have any questions.",
    "Looking forward to hearing from you.",
    "Thank you for your time!",
    "Have a great day!",
    "Talk to you soon!",
    "Best regards!"
  ];

  return textMessages.slice(0, length);
}


export { Correspondence };
