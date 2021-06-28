/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Contacts: undefined;
  ChatRoom: undefined;
};
export type RegParamList = {
  Phone: undefined;
  OTP: undefined;
  Profile: undefined;
  Root: undefined;
};

export type BottomTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: String ;
  name: String;
  imageUri: String;
  status: String;
};
export type Date = {
  seconds: number;
};
export type Message = {
  id: String;
  content: String;
  createdAt: Date;
  user: User;
};

export type ChatRoom = {
  id: String;
  user: User[];
  lastMessage: Message;
};
