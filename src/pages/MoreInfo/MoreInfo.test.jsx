import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { notification } from 'antd';

import { SignupStep } from '@/constants';
import { SignupFormProvider } from '@/providers/SignupFormProvider';
import { useGetColorsQuery } from '@/apis/upgradeApi';

import { MoreInfo } from './MoreInfo';
import { testIds } from './MoreInfo.model';
import { mockColors } from './MoreInfo.mock';

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <SignupFormProvider>{children}</SignupFormProvider>
  </BrowserRouter>
);

describe('MoreInfo page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.localStorageMock.getItem.mockReturnValue(null);
    notification.error.mockClear();
    notification.info.mockClear();
  });

  const renderMoreInfo = () => {
    return render(
      <TestWrapper>
        <MoreInfo />
      </TestWrapper>
    );
  };

  describe('Loading state', () => {
    it('should show loading state when fetching colors', () => {
      useGetColorsQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: undefined,
        refetch: jest.fn(),
      });

      renderMoreInfo();

      expect(notification.info).toHaveBeenCalledWith({
        key: 'loading-colors',
        message: 'Loading colors',
        placement: 'top',
        icon: expect.any(Object),
        duration: 0,
        closeIcon: false,
      });
    });

    it('should show error notification when colors fetch fails', () => {
      const mockRefetch = jest.fn();
      useGetColorsQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch colors' },
        refetch: mockRefetch,
      });

      renderMoreInfo();

      expect(notification.error).toHaveBeenCalledWith({
        key: 'error-colors',
        message: 'Failed to load colors',
        description: expect.any(Object),
        placement: 'top',
        duration: 0,
        closeIcon: false,
      });
    });

    it('should render color options when colors are loaded', () => {
      useGetColorsQuery.mockReturnValue({
        data: mockColors,
        isLoading: false,
        error: undefined,
        refetch: jest.fn(),
      });

      renderMoreInfo();

      const colorSelect = screen.getByTestId(testIds.colorSelect);
      expect(colorSelect).toBeInTheDocument();
      expect(colorSelect).not.toBeDisabled();
    });

    it('should disable form when loading colors', () => {
      useGetColorsQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: undefined,
        refetch: jest.fn(),
      });

      renderMoreInfo();

      const colorSelect = screen.getByTestId(testIds.colorSelect);
      const nextButton = screen.getByTestId(testIds.nextButton);

      expect(colorSelect).toHaveClass('ant-select-disabled');
      expect(nextButton).toBeDisabled();
    });

    it('should disable form when colors fetch fails', () => {
      useGetColorsQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch colors' },
        refetch: jest.fn(),
      });

      renderMoreInfo();

      const colorSelect = screen.getByTestId(testIds.colorSelect);
      const nextButton = screen.getByTestId(testIds.nextButton);

      expect(colorSelect).toHaveClass('ant-select-disabled');
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Form validations', () => {
    beforeEach(() => {
      useGetColorsQuery.mockReturnValue({
        data: mockColors,
        isLoading: false,
        error: undefined,
        refetch: jest.fn(),
      });
    });

    it('should not submit form when color is not selected', async () => {
      renderMoreInfo();

      const termsCheckbox = screen.getByTestId(testIds.termsCheckbox);
      const nextButton = screen.getByTestId(testIds.nextButton);

      await userEvent.click(termsCheckbox);
      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please select your favorite color')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
    });

    it('should not submit form when terms are not accepted', async () => {
      renderMoreInfo();

      const nextButton = screen.getByTestId(testIds.nextButton);

      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText('You must accept the terms')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
    });

    it('should not submit form when both color and terms are missing', async () => {
      renderMoreInfo();

      const nextButton = screen.getByTestId(testIds.nextButton);
      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please select your favorite color')
        ).toBeInTheDocument();
        expect(
          screen.getByText('You must accept the terms')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
    });

    it('should show error notification when validation fails', async () => {
      renderMoreInfo();

      const nextButton = screen.getByTestId(testIds.nextButton);
      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(notification.error).toHaveBeenCalledWith({
          key: 'error-more-info',
          message: 'Your signup failed',
          description:
            'Please select your favorite color and accept the terms.',
          duration: 3,
          placement: 'top',
        });
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Form submission', () => {
    beforeEach(() => {
      useGetColorsQuery.mockReturnValue({
        data: mockColors,
        isLoading: false,
        error: undefined,
        refetch: jest.fn(),
      });
    });

    it('should navigate back to user data when back button is clicked', async () => {
      renderMoreInfo();

      const backButton = screen.getByTestId(testIds.backButton);
      await userEvent.click(backButton);

      expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.USER_DATA);
    });

    it('should submit form and navigate to confirmation when all fields are valid', async () => {
      renderMoreInfo();

      const colorSelect = screen.getByTestId(testIds.colorSelect);
      const termsCheckbox = screen.getByTestId(testIds.termsCheckbox);

      await userEvent.click(termsCheckbox);

      const selector = colorSelect.querySelector('.ant-select-selector');
      fireEvent.mouseDown(selector);

      await waitFor(() => {
        expect(
          document.querySelector('.ant-select-dropdown')
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getAllByTitle('red')[0]);

      const nextButton = screen.getByTestId(testIds.nextButton);
      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(global.mockNavigate).toHaveBeenCalledWith(
          SignupStep.CONFIRMATION
        );
      });
    });
  });
});
