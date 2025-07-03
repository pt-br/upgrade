import styled from 'styled-components';
import { Form, Card } from 'antd';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledCard = styled(Card)`
  width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;
