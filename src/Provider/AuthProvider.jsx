import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const axiosPublic = useAxiosPublic();
  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      console.log(userCredential);
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photoURL: result?.user?.photoURL,
        role: "Student",
      };

      // Perform POST request to create user
      axiosPublic.post("/users", userInfo);

      // Check if the request was successful
      toast.success("You've successfully logged in with your Google account.");
      setLoading(false);
    } catch (error) {
      // Handle error
      setLoading(false);
      toast.error(error.message);
    }
  };

  const githubSignIn = async () => {
    try {
      await signInWithPopup(auth, GithubProvider);
      setLoading(false);
      toast.success("You've successfully logged in with your Github account.");
    } catch (error) {
      setLoading(false);
      toast.error("Oops, something went wrong!");
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateUser = async (name, image) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    googleSignIn,
    githubSignIn,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
