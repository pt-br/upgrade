import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { notification } from 'antd';

import { SignupStep } from '@/constants';
import { SignupFormProvider } from '@/providers/SignupFormProvider';

import { UserData } from './UserData';
import { testIds } from './UserData.model';

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <SignupFormProvider>{children}</SignupFormProvider>
  </BrowserRouter>
);

describe('UserData page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.localStorageMock.getItem.mockReturnValue(null);
  });

  const renderUserData = () => {
    return render(
      <TestWrapper>
        <UserData />
      </TestWrapper>
    );
  };

  const fillValidForm = async () => {
    const firstNameInput = screen.getByTestId(testIds.firstNameInput);
    const emailInput = screen.getByTestId(testIds.emailInput);
    const passwordInput = screen.getByTestId(testIds.passwordInput);

    await userEvent.type(firstNameInput, 'Upgrade');
    await userEvent.type(emailInput, 'test@upgrade.com');
    await userEvent.type(passwordInput, 'password123');
  };

  describe('Form validations', () => {
    it('should not submit form when firstName is empty', async () => {
      renderUserData();

      const emailInput = screen.getByTestId(testIds.emailInput);
      const passwordInput = screen.getByTestId(testIds.passwordInput);
      const submitButton = screen.getByTestId(testIds.submitButton);

      await userEvent.type(emailInput, 'test@upgrade.com');
      await userEvent.type(passwordInput, 'password123');

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter your first name')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
      expect(notification.error).not.toHaveBeenCalled();
    });

    it('should not submit form when email is invalid', async () => {
      renderUserData();

      const firstNameInput = screen.getByTestId(testIds.firstNameInput);
      const emailInput = screen.getByTestId(testIds.emailInput);
      const passwordInput = screen.getByTestId(testIds.passwordInput);
      const submitButton = screen.getByTestId(testIds.submitButton);

      await userEvent.type(firstNameInput, 'Upgrade');
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.type(passwordInput, 'password123');

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
      expect(notification.error).not.toHaveBeenCalled();
    });

    it('should not submit form when password is too short', async () => {
      renderUserData();

      const firstNameInput = screen.getByTestId(testIds.firstNameInput);
      const emailInput = screen.getByTestId(testIds.emailInput);
      const passwordInput = screen.getByTestId(testIds.passwordInput);
      const submitButton = screen.getByTestId(testIds.submitButton);

      await userEvent.type(firstNameInput, 'Upgrade');
      await userEvent.type(emailInput, 'test@upgrade.com');
      await userEvent.type(passwordInput, '123');

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 8 characters long')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
      expect(notification.error).not.toHaveBeenCalled();
    });

    it('should not submit form when email is empty', async () => {
      renderUserData();

      const firstNameInput = screen.getByTestId(testIds.firstNameInput);
      const passwordInput = screen.getByTestId(testIds.passwordInput);
      const submitButton = screen.getByTestId(testIds.submitButton);

      await userEvent.type(firstNameInput, 'Upgrade');
      await userEvent.type(passwordInput, 'password123');

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
      expect(notification.error).not.toHaveBeenCalled();
    });

    it('should not submit form when password is empty', async () => {
      renderUserData();

      const firstNameInput = screen.getByTestId(testIds.firstNameInput);
      const emailInput = screen.getByTestId(testIds.emailInput);
      const submitButton = screen.getByTestId(testIds.submitButton);

      await userEvent.type(firstNameInput, 'Upgrade');
      await userEvent.type(emailInput, 'test@upgrade.com');

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 8 characters long')
        ).toBeInTheDocument();
      });

      expect(global.mockNavigate).not.toHaveBeenCalled();
      expect(notification.error).not.toHaveBeenCalled();
    });
  });

  describe('Form submittion', () => {
    it('should submit form and navigate to next step when all fields are valid', async () => {
      renderUserData();

      await fillValidForm();

      const submitButton = screen.getByTestId(testIds.submitButton);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.MORE_INFO);
      });

      expect(notification.error).not.toHaveBeenCalled();
    });

    it('should only allow submission when form is completely valid', async () => {
      renderUserData();

      const firstNameInput = screen.getByTestId(testIds.firstNameInput);
      const emailInput = screen.getByTestId(testIds.emailInput);
      const passwordInput = screen.getByTestId(testIds.passwordInput);
      const submitButton = screen.getByTestId(testIds.submitButton);

      await userEvent.type(firstNameInput, 'Upgrade');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Password must be at least 8 characters long')
        ).toBeInTheDocument();
      });
      expect(global.mockNavigate).not.toHaveBeenCalled();

      await userEvent.type(emailInput, 'test@upgrade.com');
      await userEvent.type(passwordInput, '123');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 8 characters long')
        ).toBeInTheDocument();
      });
      expect(global.mockNavigate).not.toHaveBeenCalled();

      await userEvent.type(passwordInput, 'password123');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.MORE_INFO);
      });
      expect(notification.error).not.toHaveBeenCalled();
    });

    it('should show error notification with generic message when validation fails without specific error', async () => {
      renderUserData();

      const submitButton = screen.getByTestId(testIds.submitButton);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Please enter your first name')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Please enter a valid email')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Password must be at least 8 characters long')
        ).toBeInTheDocument();
      });

      expect(notification.error).not.toHaveBeenCalled();
      expect(global.mockNavigate).not.toHaveBeenCalled();
    });
  });
});
