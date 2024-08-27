/**
 * Represents a customer
 * @constructor
 * @param {string} id - Unique identifier.
 * @param {string} name - Customer name.
 * @param {string} email - Customer email.
 * @param {string} phoneNumber - Customer phone number.
 * @param {string} [address] - Optional address of the customer.
 * @param {string} [notes] - Optional notes about the customer.
 */
class Customer {
    constructor(id, name, email, phoneNumber, address = '', notes = '') {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.notes = notes;
    }
  
    /**
     * Create a new customer record
     * @param {string} name - Customer name.
     * @param {string} email - Customer email.
     * @param {string} phoneNumber - Customer phone number.
     * @param {string} [address] - Optional address of the customer.
     * @param {string} [notes] - Optional notes about the customer.
     * @returns {Customer}
     */
    static create(id, name, email, phoneNumber, address = '', notes = '') {
      return new Customer(id, name, email, phoneNumber, address, notes);
    }
  
    /**
     * Update customer details
     * @param {string} name - New customer name.
     * @param {string} email - New customer email.
     * @param {string} phoneNumber - New customer phone number.
     * @param {string} [address] - New address of the customer.
     * @param {string} [notes] - New notes about the customer.
     */
    updateDetails(name, email, phoneNumber, address = '', notes = '') {
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.notes = notes;
    }
  }
  
  export { Customer };
  