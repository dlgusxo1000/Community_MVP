import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import {
  CommonText,
  Container,
  Header,
  ItemAuthor,
  ItemTitle,
  LogoutButton,
  Title,
} from '../components/style';
import { subscribePosts } from '../components/Services/PostServices';
import { authInstance } from '../components/firebase';
import { signOut } from '@react-native-firebase/auth';

const PostListScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribePosts(setPosts);
    return unsubscribe;
  }, []);

  const onLogout = async () => {
    await signOut(authInstance);
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <Container>
      <Header style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>게시글 목록</Title>
        <LogoutButton onPress={onLogout}>
          <Text>로그아웃</Text>
        </LogoutButton>
      </Header>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingVertical: 25,
              borderBottomWidth: 1,
              borderBottomColor: '#d8d8d8',
            }}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
          >
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: '100%',
                  height: 160,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
              />
            )}
            <ItemTitle>{item.title}</ItemTitle>
            <ItemAuthor>{item.authorName}</ItemAuthor>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('PostWrite')}
        style={{
          width: 65,
          height: 65,
          backgroundColor: '#123456',
          alignSelf: 'flex-end',
          borderRadius: 65,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CommonText color={'#fff'}>작성</CommonText>
      </TouchableOpacity>
    </Container>
  );
};

export default PostListScreen;
