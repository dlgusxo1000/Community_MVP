import React, { useState } from 'react';
import {
  ButtonText,
  CommonButton,
  Container,
  Input,
  Preview,
  TextArea,
  Title,
} from '../components/style';
import { launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  getStorage,
  ref,
  getDownloadURL,
} from '@react-native-firebase/storage';
import { authInstance } from '../components/firebase';
import { createPost } from '../components/Services/PostServices';

const PostWriteScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null | undefined>(null);

  const user = authInstance.currentUser;

  async function requestPermission() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
    }
  }

  const selectImage = async () => {
    await requestPermission();
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result?.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const storage = getStorage();
    const filename = `posts/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    const uploadTask = storageRef.putFile(uri);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        reject,
        async () => {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        },
      );
    });
  };
  const onSubmit = async () => {
    if (!user) return;
    const uploadedImage = imageUri ? await uploadImage(imageUri) : null;
    await createPost(user.uid, title, content, uploadedImage, user.displayName);
    navigation.goBack();
  };
  return (
    <Container>
      <Title>글 작성</Title>

      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />

      <TextArea
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <CommonButton onPress={selectImage}>
        <ButtonText>이미지 선택</ButtonText>
      </CommonButton>

      {imageUri && (
        <Preview style={{ marginTop: 20 }} source={{ uri: imageUri }} />
      )}

      <CommonButton primary onPress={onSubmit}>
        <ButtonText>등록</ButtonText>
      </CommonButton>
    </Container>
  );
};

export default PostWriteScreen;
