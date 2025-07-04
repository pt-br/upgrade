import { useCallback } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useSignupFormContext } from '@/contexts';
import { SignupStep } from '@/constants';
import { StyledCard } from '@/components/PageWrapper/PageWrapper.style';

export const Error = () => {
  const navigate = useNavigate();

  const { form } = useSignupFormContext();

  const handleRestart = useCallback(() => {
    form.resetFields();
    navigate(SignupStep.USER_DATA);
  }, [form, navigate]);

  return (
    <StyledCard>
      <Result
        status="error"
        title="Your signup failed"
        subTitle="Uh oh, something went wrong. Please try again later."
        extra={[
          <Button
            type="primary"
            key="restart"
            size="large"
            onClick={handleRestart}
          >
            Restart
          </Button>,
        ]}
      />
    </StyledCard>
  );
};
