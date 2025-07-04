import { useCallback } from 'react';
import { Button, Typography, Descriptions, Spin, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useSignupFormContext } from '@/contexts';
import { SignupStep } from '@/constants';
import { useSubmitFormMutation } from '@/apis/upgradeApi';
import {
  StyledCard,
  CTAWrapper,
} from '@/components/PageWrapper/PageWrapper.style';

export const Confirmation = () => {
  const navigate = useNavigate();

  const { formData, clearFormData } = useSignupFormContext();

  const [submitFormMutation, { isLoading }] = useSubmitFormMutation();

  const handleBack = useCallback(() => {
    navigate(SignupStep.MORE_INFO);
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    try {
      const submitData = {
        name: formData.firstName,
        email: formData.email,
        password: formData.password,
        color: formData.color,
        terms: formData.terms,
      };

      await submitFormMutation(submitData).unwrap();

      clearFormData();
      navigate(SignupStep.SUCCESS);
    } catch (error) {
      notification.error({
        key: 'error-confirmation',
        message: 'Your signup failed',
        description: error?.message,
        duration: 3,
        placement: 'top',
      });
      navigate(SignupStep.ERROR);
    }
  }, [formData, submitFormMutation, clearFormData, navigate]);

  return (
    <>
      <Typography.Title level={3}>Confirmation</Typography.Title>
      <StyledCard>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="First Name">
            {formData.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
          <Descriptions.Item label="Password">
            {'•'.repeat(8)}
          </Descriptions.Item>
          <Descriptions.Item label="Favorite Color">
            {formData.color}
          </Descriptions.Item>
          <Descriptions.Item label="Terms Accepted">
            {formData.terms ? 'Yes' : 'No'}
          </Descriptions.Item>
        </Descriptions>

        <CTAWrapper marginTop>
          <Button htmlType="button" block size="large" onClick={handleBack}>
            Back
          </Button>
          <Button
            type="primary"
            htmlType="button"
            block
            size="large"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? <Spin size="small" /> : 'Submit'}
          </Button>
        </CTAWrapper>
      </StyledCard>
    </>
  );
};
