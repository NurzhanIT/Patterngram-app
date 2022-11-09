import { CHAT_PATH, LOGIN_PATH } from "./consts";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
export const publicRoutes = [
  {
    path: LOGIN_PATH,
    Component: <Login />,
  },
];
export const privateRoutes = [
  {
    path: CHAT_PATH,
    Component: <Chat />,
  },
];
