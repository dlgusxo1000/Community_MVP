import React, { useEffect, useState } from 'react';
import {
  Author,
  CommentAuthor,
  CommentButton,
  CommentButtonText,
  CommentInput,
  CommentItem,
  CommentText,
  Container,
  DeleteButton,
  Header,
  Image,
  RowView,
  Title,
} from '../components/style';
import styled from 'styled-components/native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { authInstance } from '../components/firebase';
import { Alert, FlatList } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import {
  addComment,
  Comment,
  deletePost,
  subscribeComments,
} from '../components/Services/PostServices';

const Content = styled.Text`
  font-size: 16px;
  color: #444;
  line-height: 22px;
`;

interface PostDetailParams {
  post: {
    id: string;
    uid: string;
    authorId: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    authorName: string;
  };
}

const PostDetailScreen = () => {
  const route = useRoute<RouteProp<Record<string, PostDetailParams>, string>>();
  const navigation = useNavigation();
  const { post } = route.params;

  const currentUser = authInstance.currentUser;
  const user = authInstance.currentUser;

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeComments(post.id, setComments);
    return unsubscribe;
  }, [post.id]);

  const onSubmitComment = async () => {
    if (!user) return;
    if (!commentText.trim()) return;

    await addComment(post.id, user.uid, commentText.trim(), post.authorName);
    setCommentText('');
  };

  return (
    <Container>
      <Header>
        <Title numberOfLines={1}>{post.title}</Title>
        {post.uid === currentUser?.uid && (
          <DeleteButton
            onPress={() => {
              Alert.alert('삭제', '정말 이 글을 삭제할까요?', [
                { text: '취소', style: 'cancel' },
                {
                  text: '삭제',
                  style: 'destructive',
                  onPress: async () => {
                    await deletePost(post.id, post.imageUrl);
                    navigation.goBack();
                  },
                },
              ]);
            }}
          >
            <Text>삭제</Text>
          </DeleteButton>
        )}
      </Header>

      {post.imageUrl && <Image source={{ uri: post.imageUrl }} />}

      <Author>
        작성자: {post.uid === currentUser?.uid ? '나' : post.authorName}
      </Author>

      <Content>{post.content}</Content>

      <RowView>
        <CommentInput
          placeholder="댓글을 입력하세요..."
          value={commentText}
          onChangeText={setCommentText}
        />

        <CommentButton onPress={onSubmitComment}>
          <CommentButtonText>등록</CommentButtonText>
        </CommentButton>
      </RowView>

      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CommentItem>
            <CommentAuthor>
              {item.uid === user?.uid ? '나' : item.authorName}
            </CommentAuthor>
            <CommentText>{item.text}</CommentText>
          </CommentItem>
        )}
      />
    </Container>
  );
};

export default PostDetailScreen;
