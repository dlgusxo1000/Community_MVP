import { getApp, initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

try {
  getApp();
} catch {
  initializeApp();
}

export const authInstance = auth();
export const db = firestore();
export const storageInstance = storage();
