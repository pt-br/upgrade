import upgradeLogo from '@/assets/upgradeLogo.svg';

import { SignupFormProvider } from '@/providers';

import { SignupContainer, Logo } from './PageWrapper.style';

export const PageWrapper = ({ children }) => {
  return (
    <SignupFormProvider>
      <SignupContainer>
        <Logo src={upgradeLogo} alt="upgrade logo" />
        {children}
      </SignupContainer>
    </SignupFormProvider>
  );
};
