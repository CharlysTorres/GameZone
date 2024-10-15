import { createContext, useState, ReactNode } from 'react'
import { ref, update } from 'firebase/database';

import { LevelUpModal } from '../components/LevelUpModal';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

interface NewChallengeProps {
  gameId?: number;
  questionId?: number;
  xp: number;
}

interface UpdateChallenge {
  id?: string; // user id
  name?: string; // name of user
  level: number;
  avatar?: string;
  currentExperience: number;
  challengesCompleted: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  completeChallenge: ({gameId, questionId, xp}: NewChallengeProps) => void;
  closeLevelUpModal: () => void;
  updateRank: (position: number) => void;
  rank: number;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level?: number;
  currentExperience?: number;
  challengesCompleted?: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [rank, setRank] = useState(0);

  const [ isLevelModalOpen, setIsLevelModalOpen ] = useState(false);

  const experienceToNextLevel = Math.pow(((rest?.level !== undefined && level < rest.level) ? rest?.level + 1 : level + 1) * 4, 2);

  const { user } = useAuth();

  function levelUp() {
    if (rest?.level !== undefined) {
      if (level < rest?.level) {
        setLevel(rest.level + 1);
        const updates = {} as {[key: string]: UpdateChallenge};
        updates[`users/${user?.id}`] = {
          level: rest.level + 1,
          currentExperience,
          challengesCompleted,
          id: user?.id,
          avatar: user?.avatar,
          name: user?.name,
        };
        console.log(updates);
        update(ref(database), updates);
        setIsLevelModalOpen(true);
      } else {
        setLevel(level + 1);
        const updates = {} as {[key: string]: UpdateChallenge};
        updates[`users/${user?.id}`] = {
          level,
          currentExperience,
          challengesCompleted,
          id: user?.id,
          avatar: user?.avatar,
          name: user?.name,
        };
        update(ref(database), updates);
        setIsLevelModalOpen(true);
      }
    } else {
      setLevel(level + 1);
      const updates = {} as {[key: string]: UpdateChallenge};
      updates[`users/${user?.id}`] = {
        level,
        currentExperience,
        challengesCompleted,
        id: user?.id,
        avatar: user?.avatar,
        name: user?.name,
      };
      update(ref(database), updates);
      setIsLevelModalOpen(true);
    }
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  function updateRank(position: number) {
    setRank(position);
  }

  async function completeChallenge({xp}: NewChallengeProps) {
    let finalExperience = 0;
    if (rest?.currentExperience !== undefined) {
      if (currentExperience < rest?.currentExperience) {
        finalExperience = rest?.currentExperience + xp;
      } else {
        finalExperience = currentExperience + xp;
      }
    } else {
      finalExperience = currentExperience + xp;
    }

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);

    if (rest?.challengesCompleted !== undefined) {
      if (challengesCompleted < rest?.challengesCompleted) {
        setChallengesCompleted(rest?.challengesCompleted + 1);
      } else {
        setChallengesCompleted(challengesCompleted + 1);
      }
    } else {
      setChallengesCompleted(challengesCompleted + 1);
    }


    const updates = {} as {[key: string]: UpdateChallenge};
    updates[`users/${user?.id}`] = {
      level: (rest?.level !== undefined && level < rest.level) ? rest?.level : level,
      currentExperience: finalExperience,
      challengesCompleted: (rest?.challengesCompleted !== undefined && challengesCompleted < rest.challengesCompleted) ? rest?.challengesCompleted + 1 : challengesCompleted,
      id: user?.id,
      avatar: user?.avatar,
      name: user?.name,
    };
    update(ref(database), updates);
  }

  return (
    <ChallengesContext.Provider
    value={{
      level,
      currentExperience,
      challengesCompleted,
      experienceToNextLevel,
      levelUp,
      completeChallenge,
      closeLevelUpModal,
      updateRank,
      rank,
      }}
    >
      {children}

      { isLevelModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}
