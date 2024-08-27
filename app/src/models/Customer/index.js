import axios from 'axios';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../services/firebase'; // Assuming you have your Firebase initialized in this file

/**
 * Represents a customer
 * @constructor
 * @param {string} id - Unique identifier.
 * @param {string} name - Customer name.
 * @param {string} photoURL - Customer photo url.
 * @param {string} email - Customer email.
 * @param {string} phoneNumber - Customer phone number.
 * @param {string} [textNumber] - (optional) Customer text number.
 * @param {string} [assignedTo] - (optional) Assigned user.
 */
class Customer {
  constructor({ id, name, photoURL, email, phoneNumber, textNumber = '', assignedTo = null }) {
    this.id = id;
    this.name = name;
    this.photoURL = photoURL;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.textNumber = textNumber;
    this.assignedTo = assignedTo;
  }

  /**
   * Create a new customer record
   * @param {Object} customerData - Customer data object.
   * @param {string} customerData.id - Customer ID.
   * @param {string} customerData.name - Customer name.
   * @param {string} customerData.email - Customer email.
   * @param {string} customerData.photoURL - Customer photo URL.
   * @param {string} customerData.phoneNumber - Customer phone number.
   * @param {string} [customerData.textNumber] - (optional) Customer text number.
   * @param {string} [customerData.assignedTo] - (optional) Assigned user.
   * @returns {Customer}
   */
  static create({ id, name, email, photoURL, phoneNumber, textNumber = '', assignedTo = null }) {
    return new Customer({ id, name, email, photoURL, phoneNumber, textNumber, assignedTo });
  }

  /**
   * Auto-generates a new customer record using random data.
   * @returns {Promise<Customer>}
   */
  static async autoCreate() {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const data = response.data.results[0];
      const timestamp = new Date();

      const customerRef = collection(db, 'customers');
      const docRef = await addDoc(customerRef, {
        name: `${data.name.first} ${data.name.last}`,
        photoURL: data.picture.large,
        email: data.email,
        phoneNumber: data.phone,
        textNumber: data.cell,
        timestamp,
      });

      const customer = this.create({
        id: docRef.id,
        name: `${data.name.first} ${data.name.last}`,
        photoURL: data.picture.large,
        email: data.email,
        phoneNumber: data.phone,
        textNumber: data.cell,
      });

      console.log('Document written with ID: ', docRef.id);
      return customer;
    } catch (error) {
      console.error('Error creating customer: ', error);
      throw new Error('Error creating customer');
    }
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

  /**
   * Assign a user to the customer and update in Firestore
   * @param {string} userId - User to assign.
   */
  async assignUser(userId) {
    this.assignedTo = userId;
    const customerRef = doc(db, 'customers', this.id);
    try {
      await updateDoc(customerRef, {
        assignedTo: userId
      });
      console.log('User assigned successfully');
    } catch (error) {
      console.error('Error assigning user: ', error);
      throw new Error('Error assigning user');
    }
  }

  /**
   * Retrieve all customers from Firestore
   * @returns {Promise<Customer[]>} - A promise that resolves to an array of Customer instances.
   */
  static async getAllCustomers() {
    const customerRef = collection(db, 'customers');
    const customerQuerySnapshot = await getDocs(customerRef);
    const customers = customerQuerySnapshot.docs.map(doc => {
      const data = doc.data();
      return new Customer({
        id: doc.id,
        name: data.name,
        photoURL: data.photoURL,
        email: data.email,
        phoneNumber: data.phoneNumber,
        textNumber: data.textNumber,
        assignedTo: data.assignedTo,
      });
    });
    return customers;
  }

  /**
   * Retrieve all customers assigned to a specific user ID
   * @param {string} userId - The ID of the user to filter customers by.
   * @returns {Promise<Customer[]>} - A promise that resolves to an array of Customer instances assigned to the user.
   */
  static async getCustomersAssignedTo(userId) {
    const customerRef = collection(db, 'customers');
    const q = query(customerRef, where("assignedTo", "==", userId));
    const customerQuerySnapshot = await getDocs(q);
    const customers = customerQuerySnapshot.docs.map(doc => {
      const data = doc.data();
      return new Customer({
        id: doc.id,
        name: data.name,
        photoURL: data.photoURL,
        email: data.email,
        phoneNumber: data.phoneNumber,
        textNumber: data.textNumber,
        assignedTo: data.assignedTo,
      });
    });
    return customers;
  }

}

export { Customer };
