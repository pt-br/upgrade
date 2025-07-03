import { useCallback } from 'react';
import { Input, Button, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { SignupStep } from '@/pages/signup/Signup.model';

import { StyledForm, StyledCard } from './UserData.style';

export const UserData = ({ form }) => {
  const navigate = useNavigate();

  const handleNext = useCallback(async () => {
    try {
      await form.validateFields(['firstName', 'email', 'password']);
      navigate(SignupStep.MORE_INFO);
    } catch (error) {
      notification.error({
        message: 'Your signup failed',
        description: error?.message || 'Please fill in your data correctly.',
        duration: 3,
        placement: 'top',
      });
    }
  }, [form, navigate]);

  return (
    <>
      <Typography.Title level={3}>Sign Up</Typography.Title>
      <StyledCard>
        <StyledForm form={form} layout="vertical">
          <StyledForm.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input placeholder="First Name" size="large" />
          </StyledForm.Item>
          <StyledForm.Item
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
            <Input placeholder="E-mail" size="large" type="email" />
          </StyledForm.Item>
          <StyledForm.Item
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
            <Input.Password placeholder="Password" size="large" />
          </StyledForm.Item>
          <StyledForm.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="button"
              block
              size="large"
              onClick={handleNext}
            >
              Next
            </Button>
          </StyledForm.Item>
        </StyledForm>
      </StyledCard>
    </>
  );
};
