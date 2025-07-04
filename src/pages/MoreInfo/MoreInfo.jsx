import { useEffect, useCallback, useMemo } from 'react';
import { Button, Typography, Select, Checkbox, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useSignupFormContext } from '@/contexts';
import { SignupStep } from '@/constants';
import { useGetColorsQuery } from '@/apis/upgradeApi';
import {
  StyledForm,
  StyledFormItem,
  StyledCard,
  CTAWrapper,
} from '@/components/PageWrapper/PageWrapper.style';

import { testIds } from './MoreInfo.model';

export const MoreInfo = () => {
  const { form, handleFieldChange, validateAndProceed } =
    useSignupFormContext();

  const navigate = useNavigate();

  const {
    data: colors,
    isLoading: isLoadingColors,
    error: errorColors,
    refetch: refetchColors,
  } = useGetColorsQuery();

  useEffect(() => {
    if (errorColors) {
      notification.error({
        key: 'error-colors',
        message: 'Failed to load colors',
        description: (
          <a
            onClick={() => refetchColors()}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: '#4b9d2d',
            }}
          >
            Retry
          </a>
        ),
        placement: 'top',
        duration: 0,
        closeIcon: false,
      });
    }
  }, [errorColors, refetchColors]);

  useEffect(() => {
    if (isLoadingColors) {
      notification.info({
        key: 'loading-colors',
        message: 'Loading colors',
        placement: 'top',
        icon: <LoadingOutlined />,
        duration: 0,
        closeIcon: false,
      });
    } else {
      notification.destroy();
    }
  }, [isLoadingColors]);

  const handleNext = useCallback(async () => {
    const result = await validateAndProceed(['color', 'terms']);

    if (result.success) {
      navigate(SignupStep.CONFIRMATION);
    } else {
      notification.error({
        key: 'error-more-info',
        message: 'Your signup failed',
        description:
          result.error?.message ||
          'Please select your favorite color and accept the terms.',
        duration: 3,
        placement: 'top',
      });
    }
  }, [validateAndProceed, navigate]);

  const handleBack = useCallback(() => {
    navigate(SignupStep.USER_DATA);
  }, [navigate]);

  const colorOptions = useMemo(() => {
    return colors?.map((color) => (
      <Select.Option key={color} value={color}>
        {color}
      </Select.Option>
    ));
  }, [colors]);

  return (
    <>
      <Typography.Title level={3}>Additional Info</Typography.Title>
      <StyledCard>
        <StyledForm
          form={form}
          layout="vertical"
          onValuesChange={handleFieldChange}
        >
          <StyledFormItem
            name="color"
            rules={[
              { required: true, message: 'Please select your favorite color' },
            ]}
          >
            <Select
              placeholder="Select your favorite color"
              size="large"
              loading={isLoadingColors}
              disabled={isLoadingColors || errorColors}
              test-id={testIds.colorSelect}
            >
              {colorOptions}
            </Select>
          </StyledFormItem>
          <StyledFormItem
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('You must accept the terms')),
              },
            ]}
          >
            <Checkbox test-id={testIds.termsCheckbox}>I agree to the terms and conditions</Checkbox>
          </StyledFormItem>
          <StyledFormItem noMargin>
            <CTAWrapper>
              <Button htmlType="button" block size="large" onClick={handleBack} test-id={testIds.backButton}>
                Back
              </Button>
              <Button
                type="primary"
                htmlType="button"
                block
                size="large"
                onClick={handleNext}
                loading={isLoadingColors}
                disabled={isLoadingColors || errorColors}
                test-id={testIds.nextButton}
              >
                Next
              </Button>
            </CTAWrapper>
          </StyledFormItem>
        </StyledForm>
      </StyledCard>
    </>
  );
};
