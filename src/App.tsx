import { useState, useEffect } from 'react';

import { Router } from './Routes';
import { useAuth } from './hooks/useAuth';
import { LoaderPage } from './components/LoaderPage';
import { ChallengesProvider } from './contexts/ChallengesContext';

export function App() {
  const { user, authLoading } = useAuth();

  const [level, setLevel] = useState<number | undefined>(1);
  const [currentExperience, setCurrentExperience] = useState<number | undefined>(0);
  const [challengesCompleted, setChallengesCompleted] = useState<number | undefined>(0);

  useEffect(() => {
    if (user) {
      setLevel(user?.level);
      setCurrentExperience(user?.currentExperience);
      setChallengesCompleted(user?.challengesCompleted);
    } else {
      setLevel(1);
      setCurrentExperience(0);
      setChallengesCompleted(0);
    }
  }, [user]);

  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      {
        authLoading ? <LoaderPage /> : <Router isLogged={user === undefined || null ? false : true} />
      }
    </ChallengesProvider>
  )
}
