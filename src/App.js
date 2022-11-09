import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/Navbar";
import Loader from "./components/Loader";
import { useContext, createContext, useState } from "react";
import { Context } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import { changeMode, Mode } from "./components/classes/factory";
export const Profile = createContext(null);
function App({ firestore }) {
  const { auth } = useContext(Context);
  const [user, loading, errors] = useAuthState(auth);
  const [profilePage, setProfilePage] = useState(false);
  const [userListPage, setUserListPage] = useState(true);

  // day_night
  const [themeState, setThemeState] = useState(true);
  const factory = new changeMode();
  const day_night = factory.change(themeState);
  const changeTheme = () => {
    if (themeState === true) {
      setThemeState(false);
    } else {
      setThemeState(true);
    }
  };

  if (loading) return <Loader />;
  return (
    <Profile.Provider
      value={{
        day_night,
        profilePage,
        setProfilePage,
        userListPage,
        setUserListPage,
        changeTheme,
        themeState,
        setThemeState,
      }}
    >
      <BrowserRouter>
        <NavBar firestore={firestore} />
        <AppRoutes />
      </BrowserRouter>
    </Profile.Provider>
  );
}

export default App;
