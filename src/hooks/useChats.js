import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectActiveChats,
  selectLoading,
  selectChats,
  selectChatById,
} from "../redux/public/selectorsChats";

export const useChats = () => {
  const dispatch = useDispatch();
  const activeChats = useSelector(selectActiveChats);
  const isLoading = useSelector(selectLoading);
  const errorChats = useSelector(selectError);
  const chats = useSelector(selectChats);
  const chatById = useSelector(selectChatById);

  return {
    activeChats,
    isLoading,
    errorChats,
    chats,
    chatById,
    dispatch,
  };
};
