import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  ButtonText,
  CommonButton,
  Container,
  Input,
  Title,
} from '../components/style';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const onLogin = async () => {
    const authInstance = getAuth();

    try {
      await signInWithEmailAndPassword(authInstance, email.trim(), pw.trim());
      navigation.replace('PostList');
    } catch (e: any) {
      console.log(e.message);
      Alert.alert(e.message);
    }
  };

  return (
    <Container style={{ justifyContent: 'center' }}>
      <Title>로그인</Title>

      <Input placeholder="이메일" value={email} onChangeText={setEmail} />
      <Input
        style={{ color: '#000' }}
        placeholder="비밀번호"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
      />

      <CommonButton primary onPress={onLogin}>
        <ButtonText>로그인</ButtonText>
      </CommonButton>

      <CommonButton onPress={() => navigation.navigate('SignUp')}>
        <ButtonText>회원가입</ButtonText>
      </CommonButton>
    </Container>
  );
};

export default SignInScreen;
