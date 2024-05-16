import styled from 'styled-components';

export const Container = styled.div`
& + & {
  margin-top: 16px;
}

small{
  color: ${({ theme }) => theme.colors.danger.main};
  font-size: 12px;
  display: block;
  padding: 8px;
}

.form-term{
  position: relative;
.loader{
  position: absolute;
  top: 18px;
  right: 16px;
}
}
`;
