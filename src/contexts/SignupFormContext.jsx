import { createContext, useContext } from 'react';

const SignupFormContext = createContext();

export const useSignupFormContext = () => {
  const context = useContext(SignupFormContext);
  if (!context) {
    throw new Error(
      'useSignupFormContext must be used within a SignupFormProvider'
    );
  }
  return context;
};

export { SignupFormContext };
