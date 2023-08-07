import { createContext, useContext, useState } from "react";

interface UserContextInterface {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

type ContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextInterface>({
  userId: '',
  setUserId: () => {}
});

export const UserProvider = ({ children }: ContextProviderProps) => {
  const [userId, setUserId] = useState<string>('');
  const value = {
    userId,
    setUserId
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = (): UserContextInterface => useContext(UserContext);
