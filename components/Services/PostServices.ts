import {
  collection,
  FirebaseFirestoreTypes,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { db } from '../firebase';
import storage from '@react-native-firebase/storage';

export type Comment = {
  id: string;
  uid: string;
  text: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
  authorName: string;
};

export type Post = {
  id: string;
  uid: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
  authorName: string;
};

export const addComment = async (
  postId: string,
  uid: string,
  text: string,
  authorName: string,
) => {
  await db.collection('posts').doc(postId).collection('comments').add({
    uid,
    text,
    createdAt: serverTimestamp(),
    authorName,
  });
};

export const deletePost = async (postId: string, imageUrl?: string | null) => {
  // Firestore 문서 삭제
  await db.collection('posts').doc(postId).delete();

  // 이미지가 있다면 Storage도 삭제
  if (imageUrl) {
    const ref = storage().refFromURL(imageUrl);
    await ref.delete();
  }
};

export const subscribeComments = (
  postId: string,
  callback: (comments: Comment[]) => void,
) => {
  return db
    .collection('posts')
    .doc(postId)
    .collection('comments')
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      const list: Comment[] = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Comment[];
      callback(list);
    });
};

export const subscribePosts = (callback: (posts: Post[]) => void) => {
  return db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const list: Post[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      callback(list);
    });
};

export const createPost = async (
  uid: string,
  title: string,
  content: string,
  imageUrl?: string | null,
  authorName?: string | null,
) => {
  await db.collection('posts').add({
    uid,
    title,
    content,
    imageUrl: imageUrl ?? null,
    createdAt: serverTimestamp(),
    authorName,
  });
};
