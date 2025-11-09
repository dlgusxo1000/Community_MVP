import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-bottom: 20px;
  text-align: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#9ca3af',
})`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const CommonButton = styled.TouchableOpacity<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? '#007aff' : '#aaa')};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const CommonText = styled.Text<{ color?: string }>`
  color: ${({ color }) => (color ? color : '#000')};
`;

export const TextArea = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 15px;
  height: 200px;
  text-align-vertical: top;
`;

export const Preview = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const ItemAuthor = styled.Text`
  color: #555;
  margin-top: 2px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 6px 12px;
  background: #e5e7eb;
  border-radius: 6px;
  margin-right: 12px;
`;

export const BackText = styled.Text`
  font-size: 16px;
`;

export const Author = styled.Text`
  color: #666;
  margin-bottom: 16px;
`;

export const Content = styled.Text`
  font-size: 16px;
  line-height: 22px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const CommentInput = styled.TextInput`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-right: 8px;
`;

export const CommentButton = styled.TouchableOpacity`
  padding: 10px 14px;
  background: #2ea7df;
  border-radius: 8px;
`;

export const CommentButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const CommentItem = styled.View`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const CommentAuthor = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const CommentText = styled.Text`
  font-size: 16px;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 6px 12px;
  background: #ef4444;
  border-radius: 6px;
  margin-left: auto;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 8px 12px;
  background: #ef4444;
  border-radius: 6px;
`;
