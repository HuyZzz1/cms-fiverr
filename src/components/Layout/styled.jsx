import styled from "styled-components";
import { Layout } from "antd";
const { Content } = Layout;

export const StyledContent = styled(Content)`
  background: #f9f9f9;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 64px);

  @media (min-width: 1550px) {
    overflow: hidden;
  }
`;
