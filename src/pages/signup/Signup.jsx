import { useLocation } from 'react-router-dom';
import { Form } from 'antd';

import upgradeLogo from '@/assets/upgradeLogo.svg';

import { UserData } from '@/components/signupSteps/userData';
import { MoreInfo } from '@/components/signupSteps/moreInfo';
import { Confirmation } from '@/components/signupSteps/confirmation';
import { Success } from '@/components/signupSteps/success';
import { Error } from '@/components/signupSteps/error';

import { SignupStep } from './Signup.model';
import { SignupContainer, Logo } from './Signup.style';

export const Signup = () => {
  const { pathname } = useLocation();
  const [form] = Form.useForm();

  return (
    <SignupContainer>
      <Logo src={upgradeLogo} alt="upgrade logo" />
      {pathname === SignupStep.USER_DATA && <UserData form={form} />}
      {pathname === SignupStep.MORE_INFO && <MoreInfo form={form} />}
      {pathname === SignupStep.CONFIRMATION && <Confirmation form={form} />}
      {pathname === SignupStep.SUCCESS && <Success form={form} />}
      {pathname === SignupStep.ERROR && <Error form={form} />}
    </SignupContainer>
  );
};
