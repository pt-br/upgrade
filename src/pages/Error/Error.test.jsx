import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { SignupStep } from '@/constants';
import { SignupFormProvider } from '@/providers/SignupFormProvider';

import { Error } from './Error';
import { testIds } from './Error.model';

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <SignupFormProvider>{children}</SignupFormProvider>
  </BrowserRouter>
);

describe('Error page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.localStorageMock.getItem.mockReturnValue(null);
  });

  const renderError = () => {
    return render(
      <TestWrapper>
        <Error />
      </TestWrapper>
    );
  };

  it('should navigate to user data page when restart button is clicked', async () => {
    renderError();

    const restartButton = screen.getByTestId(testIds.restartButton);
    await userEvent.click(restartButton);

    await waitFor(() => {
      expect(global.mockNavigate).toHaveBeenCalledWith(SignupStep.USER_DATA);
    });
  });
}); 