import styled from "styled-components";
import { Tabs } from "antd";

export const StyledTabs = styled(Tabs)`
  &.styled-tabs {
    border-top: 1px solid #d9d9d9;
    .ant-tabs-nav {
      margin: 0 !important;

      &:before {
        border-bottom: none !important;
      }
    }
  }
`;
