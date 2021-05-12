import styled from 'styled-components';

export const ProjectContainer = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

export const ProjectMain = styled.div`
  margin-top: 16px;
  padding: 0 16px;
`;

export const ProjectListContainer = styled.div`
  > div {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  font-size: 0;
  @media screen and (min-width: 2401px) {
    .project-item-box {
      width: calc(12.5% - 16px);
      &:nth-child(8n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 2200px) and (min-width: 1921px) {
    .project-item-box {
      width: calc(20% - 8px);
      &:nth-child(5n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 1920px) and (min-width: 1631px) {
    .project-item-box {
      width: calc(20% - 8px);
      &:nth-child(5n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 1630px) {
    .project-item-box {
      width: calc(25% - 8px);
      &:nth-child(4n + 0) {
        margin-right: 0;
      }
    }
  }
`;
