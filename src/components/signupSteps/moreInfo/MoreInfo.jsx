import { useEffect, useCallback } from 'react';
import { Button, Typography, Select, Checkbox, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useGetColorsQuery } from '@/apis/upgradeApi';

import { StyledForm, StyledCard } from '../userData/UserData.style';
import { SignupStep } from '@/pages/signup/Signup.model';

export const MoreInfo = ({ form }) => {
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
    try {
      await form.validateFields(['color', 'terms']);
      navigate(SignupStep.CONFIRMATION);
    } catch (error) {
      notification.error({
        message: 'Your signup failed',
        description:
          error?.message ||
          'Please select your favorite color and accept the terms.',
        duration: 3,
        placement: 'top',
      });
    }
  }, [form, navigate]);

  const handleBack = useCallback(() => {
    navigate(SignupStep.USER_DATA);
  }, [navigate]);

  return (
    <>
      <Typography.Title level={3}>More Information</Typography.Title>
      <StyledCard>
        <StyledForm form={form} layout="vertical">
          <StyledForm.Item
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
            >
              {colors?.map((color) => (
                <Select.Option key={color} value={color}>
                  {color}
                </Select.Option>
              ))}
            </Select>
          </StyledForm.Item>
          <StyledForm.Item
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
            <Checkbox>I agree to the terms and conditions</Checkbox>
          </StyledForm.Item>
          <StyledForm.Item style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                htmlType="button"
                block
                size="large"
                onClick={handleBack}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="button"
                block
                size="large"
                onClick={handleNext}
                style={{ flex: 1 }}
                loading={isLoadingColors}
                disabled={isLoadingColors || errorColors}
              >
                Next
              </Button>
            </div>
          </StyledForm.Item>
        </StyledForm>
      </StyledCard>
    </>
  );
};
