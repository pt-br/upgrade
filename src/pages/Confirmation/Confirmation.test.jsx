import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { notification } from 'antd';

import { SignupStep } from '@/constants';
import { SignupFormProvider } from '@/providers/SignupFormProvider';
import { useSubmitFormMutation } from '@/apis/upgradeApi';
import { mockFormData } from '@/pages/UserData/UserData.mock';

import { Confirmation } from './Confirmation';
import { testIds } from './Confirmation.model';

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <SignupFormProvider>{children}</SignupFormProvider>
  </BrowserRouter>
);

describe('Confirmation page', () => {
  const mockSubmitFormMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    notification.error.mockClear();

    global.localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'signup_form_data') {
        return JSON.stringify(mockFormData);
      }
      return null;
    });

    useSubmitFormMutation.mockReturnValue([
      mockSubmitFormMutation,
      { isLoading: false },
    ]);
  });

  const renderConfirmation = () => {
    return render(
      <TestWrapper>
        <Confirmation />
      </TestWrapper>
    );
  };

  describe('Loading state', () => {
    it('should disable buttons and show loading state when submitting', () => {
      useSubmitFormMutation.mockReturnValue([
        mockSubmitFormMutation,
        { isLoading: true },
      ]);

      renderConfirmation();

      const backButton = screen.getByTestId(testIds.backButton);
      const submitButton = screen.getByTestId(testIds.submitButton);

      expect(backButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(submitButton.querySelector('.ant-spin')).toBeInTheDocument();
    });

    it('should show spin component in submit button when loading', () => {
      useSubmitFormMutation.mockReturnValue([
        mockSubmitFormMutation,
        { isLoading: true },
      ]);

      renderConfirmation();

      const submitButton = screen.getByTestId(testIds.submitButton);
      expect(submitButton.querySelector('.ant-spin')).toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    it('should show error notification and navigate to error page when submission fails', async () => {
      const mockError = { message: 'Submission failed' };
      mockSubmitFormMutation.mockReturnValue({
        unwrap: jest.fn().mockRejectedValue(mockError),
      });

      renderConfirmation();

      const submitButton = screen.getByTestId(testIds.submitButton);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(notification.error).toHaveBeenCalledWith({
          key: 'error-confirmation',
          message: 'Your signup failed',
          description: 'Submission failed',
          duration: 3,
          placement: 'top',
        });
      });

      await waitFor(() => {
        expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.ERROR);
      });
    });

    it('should show error notification with generic message when error has no message', async () => {
      mockSubmitFormMutation.mockReturnValue({
        unwrap: jest.fn().mockRejectedValue({}),
      });

      renderConfirmation();

      const submitButton = screen.getByTestId(testIds.submitButton);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(notification.error).toHaveBeenCalledWith({
          key: 'error-confirmation',
          message: 'Your signup failed',
          description: undefined,
          duration: 3,
          placement: 'top',
        });
      });

      await waitFor(() => {
        expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.ERROR);
      });
    });

    it('should submit form successfully and navigate to success page', async () => {
      mockSubmitFormMutation.mockReturnValue({
        unwrap: jest.fn().mockResolvedValue({}),
      });

      renderConfirmation();

      const submitButton = screen.getByTestId(testIds.submitButton);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmitFormMutation).toHaveBeenCalledWith({
          name: mockFormData.firstName,
          email: mockFormData.email,
          password: mockFormData.password,
          color: mockFormData.color,
          terms: mockFormData.terms,
        });
      });

      await waitFor(() => {
        expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.SUCCESS);
      });
    });

    it('should navigate back to more info when back button is clicked', async () => {
      renderConfirmation();

      const backButton = screen.getByTestId(testIds.backButton);
      await userEvent.click(backButton);

      expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.MORE_INFO);
    });
  });
});
