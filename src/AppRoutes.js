import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from ".";
import { privateRoutes, publicRoutes } from "./routes";
import { useAuthState } from "react-firebase-hooks/auth";
// import { LOGIN_PATH, CHAT_PATH } from "./consts";
export default function AppRoutes() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  console.log("routes ", user);
  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      {/* <Redirect to={CHAT_PATH} /> */}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      {/* <Redirect to={LOGIN_PATH} /> */}
    </Routes>
  );
}
