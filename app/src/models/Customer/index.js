import axios from 'axios';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from '../../services/firebase';

/**
 * Represents a customer.
 * @class
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

  static create({ id, name, email, photoURL, phoneNumber, textNumber = '', assignedTo = null }) {
    return new Customer({ id, name, email, photoURL, phoneNumber, textNumber, assignedTo });
  }

  static async autoCreate({ assignedTo = null } = {}) {
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
        assignedTo,
        timestamp,
      });

      return new Customer({
        id: docRef.id,
        name: `${data.name.first} ${data.name.last}`,
        photoURL: data.picture.large,
        email: data.email,
        phoneNumber: data.phone,
        textNumber: data.cell,
        assignedTo,
      });
    } catch (error) {
      console.error('Error creating customer: ', error);
      throw new Error('Error creating customer');
    }
  }

  updateDetails({ name, email, photoURL, phoneNumber, textNumber = '' }) {
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
    this.phoneNumber = phoneNumber;
    this.textNumber = textNumber;
  }

  async assignUser(userId) {
    try {
      const customerRef = doc(db, 'customers', this.id);
      await updateDoc(customerRef, {
        assignedTo: userId
      });
      this.assignedTo = userId;
    } catch (error) {
      console.error('Error assigning user: ', error);
      throw new Error('Error assigning user');
    }
  }

  static async getCustomersAssignedTo(userId) {
    try {
      const q = query(collection(db, 'customers'), where('assignedTo', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => new Customer({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching assigned customers: ', error);
      throw new Error('Error fetching assigned customers');
    }
  }

  /**
   * Finds a customer by ID.
   * @param {string} customerId - The ID of the customer.
   * @returns {Promise<Customer|null>} A promise that resolves to the Customer instance or null if not found.
   */
  static async findById(customerId) {
    try {
      const customerDoc = await getDoc(doc(db, 'customers', customerId));
      if (customerDoc.exists()) {
        return new Customer({ id: customerDoc.id, ...customerDoc.data() });
      }
      return null;
    } catch (error) {
      console.error('Error finding customer by ID: ', error);
      throw new Error('Error finding customer by ID');
    }
  }

  /**
   * Finds a customer by email.
   * @param {string} email - The email of the customer.
   * @returns {Promise<Customer|null>} A promise that resolves to the Customer instance or null if not found.
   */
  static async findByEmail(email) {
    try {
      const q = query(collection(db, 'customers'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        return new Customer({ id: querySnapshot.docs[0].id, ...docData });
      }
      return null;
    } catch (error) {
      console.error('Error finding customer by email: ', error);
      throw new Error('Error finding customer by email');
    }
  }

  /**
   * Retrieves all customers.
   * @returns {Promise<Customer[]>} A promise that resolves to an array of Customer instances.
   */
  static async findAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      return querySnapshot.docs.map(doc => new Customer({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error retrieving all customers: ', error);
      throw new Error('Error retrieving all customers');
    }
  }
}

export default Customer;
