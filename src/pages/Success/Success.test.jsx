import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { SignupStep } from '@/constants';
import { SignupFormProvider } from '@/providers/SignupFormProvider';

import { Success } from './Success';
import { testIds } from './Success.model';

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <SignupFormProvider>{children}</SignupFormProvider>
  </BrowserRouter>
);

describe('Success page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.localStorageMock.getItem.mockReturnValue(null);
  });

  const renderSuccess = () => {
    return render(
      <TestWrapper>
        <Success />
      </TestWrapper>
    );
  };

  it('should navigate to user data page when restart button is clicked', async () => {
    renderSuccess();

    const restartButton = screen.getByTestId(testIds.restartButton);
    await userEvent.click(restartButton);

    await waitFor(() => {
      expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.USER_DATA);
    });
  });
});
