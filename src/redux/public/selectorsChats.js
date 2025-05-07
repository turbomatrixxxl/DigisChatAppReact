import { createSelector } from "reselect";

const selectChatsState = (state) => state.chats;

export const selectActiveChats = createSelector(
  [selectChatsState],
  (chatsState) => chatsState.activeChats
);

export const selectChats = createSelector(
  [selectChatsState],
  (chatsState) => chatsState.chats
);

export const selectLoading = createSelector(
  [selectChatsState],
  (chatsState) => chatsState.loading
);

export const selectError = createSelector(
  [selectChatsState],
  (chatsState) => chatsState.error
);

export const selectVisitedChatIds = createSelector(
  [selectChatsState],
  (chatsState) => chatsState.visitedChatIds
);

const chatByIdSelectorCache = {};

export const selectChatById = (chatId) => {
  if (!chatByIdSelectorCache[chatId]) {
    chatByIdSelectorCache[chatId] = createSelector(
      [selectChats],
      (chats) => chats.find((chat) => chat.id === chatId) || null
    );
  }
  return chatByIdSelectorCache[chatId];
};
