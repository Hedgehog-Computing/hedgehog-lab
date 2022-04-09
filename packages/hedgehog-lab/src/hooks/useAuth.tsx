import {useState} from "react";
import {useRecoilValue} from "recoil";
import {authState} from "../states/RAuthStates";

export const useAuth = () => {
  const auth = useRecoilValue(authState);

  const isAuthenticated = auth.isAuthenticated

  const [isMe, setIsMe] = useState(false);


  return {isAuthenticated, isMe,};
};
