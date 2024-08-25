import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import axios from 'axios'; // Ensure axios is imported
import { createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage"; // Import Firebase Storage methods
import { auth, db, storage } from "../../services/firebase"; // Import the storage service

/**
 * Represents a user
 * @constructor
 * @param {string} id - Unique identifier.
 * @param {string} displayName - User display name.
 * @param {string} email - User email.
 * @param {string} photoURL - User photo URL.
 */
class User {
  constructor(id, email, displayName, avatar) {
    this.id = id;
    this.displayName = displayName || this.generateUsername(); // Use generateUsername method
    this.photoURL = avatar;
    this.email = email;
  }

  // Create a new user document in Firestore after successful auth registration
  static async create(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate a random displayName and avatar
      const displayName = await this.generateUsername(); // Await the username generation
      const avatarSvg = User.createProfileImage(displayName);

      // Upload avatar to Firebase Storage
      const avatarUrl = await User.uploadAvatar(user.uid, avatarSvg);

      // Optionally update the Firebase Auth profile
      await updateProfile(user, { displayName, photoURL: avatarUrl });

      // Save the user document in Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        displayName,
        email: user.email,
        photoURL: avatarUrl,
      });

      return new User(user.uid, user.email, displayName, avatarUrl);
    } catch (error) {
      console.error("Error creating user: ", error.message);
      throw new Error('Failed to create user');
    }
  }

  // Static method for creating a profile image
  static createProfileImage(seed) {
    const svg = createAvatar(bottts, { seed }).toDataUri(); // Use toDataUriSync to get a base64 data URL
    return svg;
  }

  // Generate a random username using an external API
  static async generateUsername() {
    try {
      const response = await axios.get('https://usernameapiv1.vercel.app/api/random-usernames');
      return response.data.usernames[0]; // Return the first username from the response
    } catch (error) {
      console.error("Error generating username: ", error.message);
      throw new Error('Failed to generate username');
    }
  }

  // Upload avatar image to Firebase Storage
  static async uploadAvatar(userId, avatarSvg) {
    try {
      const storageRef = ref(storage, `avatars/${userId}.svg`);
      await uploadString(storageRef, avatarSvg, 'data_url');
      const avatarUrl = await getDownloadURL(storageRef);
      return avatarUrl;
    } catch (error) {
      console.error("Error uploading avatar: ", error.message);
      throw new Error('Failed to upload avatar');
    }
  }

  // Update user data (both in Firestore and potentially in Auth)
  async update(displayName, email) {
    try {
      const newAvatar = User.createProfileImage(displayName);

      // Upload new avatar to Firebase Storage
      const avatarUrl = await User.uploadAvatar(this.id, newAvatar);

      const docRef = doc(db, "users", this.id);
      await updateDoc(docRef, {
        displayName,
        email,
        photoURL: avatarUrl,
      });

      // Optionally update displayName in Firebase Auth
      const user = auth.currentUser;
      if (user && user.uid === this.id) {
        await updateProfile(user, { displayName, photoURL: avatarUrl });
      }

      this.displayName = displayName;
      this.email = email;
      this.photoURL = avatarUrl;
    } catch (error) {
      console.error("Error updating user: ", error.message);
      throw new Error('Failed to update user');
    }
  }

  // Delete user by ID (both in Firestore and Auth)
  static async deleteById(id) {
    try {
      // Delete from Firestore
      const docRef = doc(db, "users", id);
      await deleteDoc(docRef);

      // Delete from Firebase Auth
      const user = auth.currentUser;
      if (user && user.uid === id) {
        await deleteUser(user);
      }

      // Optionally delete avatar from Firebase Storage
      const storageRef = ref(storage, `avatars/${id}.svg`);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting user: ", error.message);
      throw new Error('Failed to delete user');
    }
  }
  static async getByUsername(username) {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where('displayName', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`User with username ${username} not found`);
      }

      // Assuming usernames are unique, there should be only one matching document
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return new User(doc.id, data.email, data.displayName, data.photoURL);
    } catch (error) {
      console.error("Error getting user by username: ", error.message);
      throw new Error('Failed to get user by username');
    }
  }

  static async getById(id) {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`User with username ${id} not found`);
      }

      // Assuming usernames are unique, there should be only one matching document
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return new User(doc.id, data.email, data.displayName, data.photoURL);
    } catch (error) {
      console.error("Error getting user by username: ", error.message);
      throw new Error('Failed to get user by username');
    }
  }

}

export { User };
