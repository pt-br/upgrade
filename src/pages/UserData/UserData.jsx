import { useCallback } from 'react';
import { Input, Button, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useSignupFormContext } from '@/contexts';
import { SignupStep } from '@/constants';
import {
  StyledForm,
  StyledFormItem,
  StyledCard,
} from '@/components/PageWrapper/PageWrapper.style';

import { testIds } from './UserData.model';

export const UserData = () => {
  const navigate = useNavigate();

  const { form, handleFieldChange, validateAndProceed } =
    useSignupFormContext();

  const handleNext = useCallback(async () => {
    const result = await validateAndProceed(['firstName', 'email', 'password']);

    if (result.success) {
      navigate(SignupStep.MORE_INFO);
    } else {
      notification.error({
        key: 'error-user-data',
        message: 'Your signup failed',
        description:
          result.error?.message || 'Please fill in your data correctly.',
        duration: 3,
        placement: 'top',
      });
    }
  }, [validateAndProceed, navigate]);

  return (
    <>
      <Typography.Title level={3}>Sign Up</Typography.Title>
      <StyledCard>
        <StyledForm
          form={form}
          layout="vertical"
          onValuesChange={handleFieldChange}
          onFinish={handleNext}
        >
          <StyledFormItem
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input
              placeholder="First Name"
              size="large"
              test-id={testIds.firstNameInput}
            />
          </StyledFormItem>
          <StyledFormItem
            label="E-mail"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input
              placeholder="E-mail"
              size="large"
              type="email"
              test-id={testIds.emailInput}
            />
          </StyledFormItem>
          <StyledFormItem
            label="Password"
            name="password"
            rules={[
              {
                min: 8,
                required: true,
                message: 'Password must be at least 8 characters long',
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              test-id={testIds.passwordInput}
            />
          </StyledFormItem>
          <StyledFormItem noMargin>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleNext}
              block
              size="large"
              test-id={testIds.submitButton}
            >
              Next
            </Button>
          </StyledFormItem>
        </StyledForm>
      </StyledCard>
    </>
  );
};
