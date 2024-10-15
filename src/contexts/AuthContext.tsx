import { toast } from 'react-toastify';
import { ref, child, get, update } from 'firebase/database';
import { createContext, useEffect, useState, ReactNode } from 'react';
import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { checkDevice } from '../utils/checkDevice';
import { auth, database, facebookProvider, githubProvider, googleProvider } from '../services/firebase';

export type User = {
  id: string;
  name: string;
  avatar: string;
  level?: number;
  currentExperience?: number;
  challengesCompleted?: number;
}

type Challenges = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

type AuthContextType = {
  user: User | undefined;
  authLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = async () => auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid  } = user;
  
        if(!displayName || !photoURL) {
          toast.error('Missing information from Google Account.');
          throw new Error('Missing information from Google Account.');
        }

        const dbRef = ref(database);
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const { level, currentExperience, challengesCompleted } = snapshot.val() as Challenges;
            setAuthLoading(false);
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL,
              level,
              currentExperience,
              challengesCompleted
            });

            const updates = {} as {[key: string]: User};
            updates[`users/${uid}`] = {
              avatar: photoURL,
              name: displayName,
              id: uid,
              level: level ? level : 1,
              currentExperience: currentExperience !== undefined ? currentExperience : 0,
              challengesCompleted: challengesCompleted !== undefined ? challengesCompleted : 0
            };
            update(ref(database), updates);
          } else {
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL,
              level: 1,
              currentExperience: 0,
              challengesCompleted: 0
            });
            setAuthLoading(false);
            console.log("No data available");

            const updates = {} as {[key: string]: User};
            updates[`users/${uid}`] = {
              avatar: photoURL,
              name: displayName,
              id: uid,
              level: 1,
              currentExperience: 0,
              challengesCompleted: 0
            };
            update(ref(database), updates);
          }
        }).catch((error) => {
          toast.error(error);
          console.error(error);
        });
      } else {
        setAuthLoading(false);
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    let result;
    if (checkDevice()) {
      result = await signInWithRedirect(auth, googleProvider); // Device mobile sign in with redirect
    } else {
      result = await signInWithPopup(auth, googleProvider);
    }

    if(result.user) {
      const { displayName, photoURL, uid  } = result.user;

      if(!displayName || !photoURL) {
        toast.error('Missing information from Google Account.');
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  async function signInWithFacebook() {
    let result;
    if (checkDevice()) {
      result = await signInWithRedirect(auth, facebookProvider); // Device mobile sign in with redirect
    } else {
      result = await signInWithPopup(auth, facebookProvider);
    }

    if(result.user) {
      const { displayName, photoURL, uid  } = result.user;

      if(!displayName || !photoURL) {
        toast.error('Missing information from Facebook Account.');
        throw new Error('Missing information from Facebook Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  async function signInWithGithub() {
    let result;
    if (checkDevice()) {
      result = await signInWithRedirect(auth, githubProvider); // Device mobile sign in with redirect
    } else {
      result = await signInWithPopup(auth, githubProvider);
    }

    if(result.user) {
      const { displayName, photoURL, uid  } = result.user;

      if(!displayName || !photoURL) {
        toast.error('Missing information from Github Account.');
        throw new Error('Missing information from Github Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  async function signInWithEmail(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);

    setUser({
      id: result.user?.uid,
      name: result.user?.displayName || '',
      avatar: result.user?.photoURL || ''
    });
  }

  async function signUpWithEmail(email: string, name: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const random = Math.floor(Math.random() * 6);

    const updates = {} as {[key: string]: User};
    updates[`users/${result.user.uid}`] = {
      avatar: `src/assets/avataaars${random}`,
      name,
      id: result.user.uid,
      level: 1,
      currentExperience: 0,
      challengesCompleted: 0
    };
    update(ref(database), updates);

    setUser({
      id: result.user?.uid,
      name: result.user?.displayName || '',
      avatar: result.user?.photoURL || ''
    });
  }

  async function logout() {
    try {
      await signOut(auth);
      toast.success('User logged out successfully!');
      window.location.reload();
    } catch (err) {
      toast.error('Ocorreu um erro tentando fazer logout. ' + err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithEmail, signUpWithEmail, logout, authLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
