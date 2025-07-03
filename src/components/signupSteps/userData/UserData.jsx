import React from 'react';
import { Input, Button, Typography } from 'antd';

import { StyledForm, StyledCard } from './UserData.style';
import { useNavigate } from 'react-router-dom';

import { SignupStep } from '@/pages/signup/Signup.model';

export const UserData = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography.Title level={3}>Sign Up</Typography.Title>
      <StyledCard>
        <StyledForm layout="vertical">
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
              onClick={() => navigate(SignupStep.MORE_INFO)}
            >
              Next
            </Button>
          </StyledForm.Item>
        </StyledForm>
      </StyledCard>
    </>
  );
};
