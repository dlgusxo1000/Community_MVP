import React, { useState } from 'react';
import {
  Container,
  Title,
  Input,
  CommonButton,
  ButtonText,
} from '../components/style';
import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from '@react-native-firebase/auth';

const SignUpScreen = ({ navigation }: any) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const onSignUp = async () => {
    const authInstance = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email.trim(),
        pw.trim(),
      );
      await updateProfile(userCredential.user, { displayName: nickname });
      Alert.alert('회원가입 완료!');
      navigation.replace('SignIn');
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };

  return (
    <Container style={{ justifyContent: 'center' }}>
      <Title>회원가입</Title>

      <Input placeholder="닉네임" value={nickname} onChangeText={setNickname} />
      <Input placeholder="이메일" value={email} onChangeText={setEmail} />
      <Input
        placeholder="비밀번호"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
        style={{ color: '#000' }}
      />

      <CommonButton primary onPress={onSignUp}>
        <ButtonText>가입하기</ButtonText>
      </CommonButton>
    </Container>
  );
};

export default SignUpScreen;
