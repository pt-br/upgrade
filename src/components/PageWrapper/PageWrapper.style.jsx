import styled from 'styled-components';
import { Form, Card } from 'antd';

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const Logo = styled.img`
  width: 180px;
  margin-bottom: 16px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledFormItem = styled(Form.Item).withConfig({
  shouldForwardProp: (prop) => prop !== 'noMargin',
})`
  ${({ noMargin }) => noMargin && 'margin-bottom: 0;'}
`;

export const StyledCard = styled(Card)`
  min-width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const CTAWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'marginTop',
})`
  display: flex;
  gap: 8px;

  ${({ marginTop }) => marginTop && 'margin-top: 24px;'}
`;
