import { useLocation } from 'react-router-dom';

import upgradeLogo from '@/assets/upgradeLogo.svg';

import { SignupFormProvider } from '@/providers';

import { UserData } from '@/components/signupSteps/userData';
import { MoreInfo } from '@/components/signupSteps/moreInfo';
import { Confirmation } from '@/components/signupSteps/confirmation';
import { Success } from '@/components/signupSteps/success';
import { Error } from '@/components/signupSteps/error';

import { SignupStep } from './Signup.model';
import { SignupContainer, Logo } from './Signup.style';

export const Signup = () => {
  const { pathname } = useLocation();

  return (
    <SignupFormProvider>
      <SignupContainer>
        <Logo src={upgradeLogo} alt="upgrade logo" />
        {pathname === SignupStep.USER_DATA && <UserData />}
        {pathname === SignupStep.MORE_INFO && <MoreInfo />}
        {pathname === SignupStep.CONFIRMATION && <Confirmation />}
        {pathname === SignupStep.SUCCESS && <Success />}
        {pathname === SignupStep.ERROR && <Error />}
      </SignupContainer>
    </SignupFormProvider>
  );
};
