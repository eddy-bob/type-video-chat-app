import useAuthStore from './modules/auth.store';
import useFriendRequestStore from './modules/friendRequest.store';
import useGroupStore from './modules/group.store';
import useGroupChat from './modules/groupChat.store';
import usePrivateChat from './modules/privateChat.store';
import useFriend from './modules/friend.store';
import user from './modules/user.store';
import useRecentPrivateChatStore from './modules/recent-private-chat';

// import all store modules here and equally export them ( to avoid importing files individually in components)
export {
  useAuthStore,
  useFriendRequestStore,
  useGroupStore,
  useGroupChat,
  usePrivateChat,
  useFriend,
  user,
  useRecentPrivateChatStore
};
