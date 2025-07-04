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
import { testIds } from './Confirmation.model';

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
          <Descriptions.Item label="First Name" test-id={testIds.firstNameField}>
            {formData.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Email" test-id={testIds.emailField}>{formData.email}</Descriptions.Item>
          <Descriptions.Item label="Password" test-id={testIds.passwordField}>
            {'•'.repeat(8)}
          </Descriptions.Item>
          <Descriptions.Item label="Favorite Color" test-id={testIds.colorField}>
            {formData.color}
          </Descriptions.Item>
          <Descriptions.Item label="Terms Accepted" test-id={testIds.termsField}>
            {formData.terms ? 'Yes' : 'No'}
          </Descriptions.Item>
        </Descriptions>

        <CTAWrapper marginTop>
          <Button
            htmlType="button"
            block
            size="large"
            onClick={handleBack}
            loading={isLoading}
            disabled={isLoading}
            test-id={testIds.backButton}
          >
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
            test-id={testIds.submitButton}
          >
            {isLoading ? <Spin size="small" /> : 'Submit'}
          </Button>
        </CTAWrapper>
      </StyledCard>
    </>
  );
};
