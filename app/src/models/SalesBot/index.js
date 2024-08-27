/**
 * Represents a Sales Bot.
 */
class SalesBot {
    /**
     * Creates a new Sales Bot.
     * @param {string} id - The unique identifier for the bot.
     * @param {string} displayName - The display name of the bot.
     * @param {string} photoURL - The URL of the bot's photo.
     * @param {string[]} [traits=[]] - An array of traits or characteristics of the bot.
     */
    constructor(id, displayName, photoURL, traits = []) {
      /**
       * @type {string}
       * @description The unique identifier for the bot.
       */
      this.id = id;
  
      /**
       * @type {string}
       * @description The display name of the bot.
       */
      this.displayName = displayName;
  
      /**
       * @type {string}
       * @description The URL of the bot's photo.
       */
      this.photoURL = photoURL;
  
      /**
       * @type {string[]}
       * @description An array of traits or characteristics of the bot.
       */
      this.traits = traits;
    }
  
    /**
     * Adds a new trait to the bot.
     * @param {string} trait - The trait to add.
     */
    addTrait(trait) {
      this.traits.push(trait);
    }
  
    /**
     * Removes a trait from the bot.
     * @param {string} trait - The trait to remove.
     */
    removeTrait(trait) {
      this.traits = this.traits.filter(t => t !== trait);
    }
  
    /**
     * Updates the bot's display name and/or photo URL.
     * @param {Object} info - The information to update.
     * @param {string} [info.displayName] - The new display name.
     * @param {string} [info.photoURL] - The new photo URL.
     */
    updateBotInfo({ displayName, photoURL }) {
      if (displayName) this.displayName = displayName;
      if (photoURL) this.photoURL = photoURL;
    }
  
    /**
     * Gets a brief description of the bot.
     * @returns {string} A description of the bot.
     */
    getDescription() {
      return `${this.displayName} is a sales bot with the following traits: ${this.traits.join(', ')}.`;
    }
  }
  