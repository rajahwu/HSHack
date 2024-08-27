/**
 * Represents a customer
 * @constructor
 * @param {string} id - Unique identifier.
 * @param {string} name - Customer name.
 * @param {string} photoURL - Customer photo url.
 * @param {string} email - Customer email.
 * @param {string} phoneNumber - Customer phone number.
 * @param {string} [textNumber] - (optional) Customer text number.
 */
class Customer {
    constructor({ id, name, photoURL, email, phoneNumber, textNumber = '' }) {
      this.id = id;
      this.name = name;
      this.photoURL = photoURL;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.textNumber = textNumber;
    }
  
    /**
     * Create a new customer record
     * @param {string} name - Customer name.
     * @param {string} email - Customer email.
     * @param {string} photoURL - Customer photo URL.
     * @param {string} phoneNumber - Customer phone number.
     * @param {string} [textNumber] - (optional) Customer text number.
     * @returns {Customer}
     */
    static create(id, name, email, photoURL, phoneNumber, textNumber = '') {
      return new Customer(id, name, email, photoURL, phoneNumber, textNumber);
    }
  
    /**
     * Update customer details
     * @param {string} name - New customer name.
     * @param {string} email - New customer email.
     * @param {string} photoURL - New customer photo URL.
     * @param {string} phoneNumber - New customer phone number.
     * @param {string} [textNumber] - (optional) New customer text number.
     */
    updateDetails(name, email, photoURL, phoneNumber, textNumber = '') {
      this.name = name;
      this.email = email;
      this.photoURL = photoURL;
      this.phoneNumber = phoneNumber;
      this.textNumber = textNumber;
    }
  }
  
  export { Customer };
  