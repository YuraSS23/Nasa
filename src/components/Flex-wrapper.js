import styled from "styled-components";


export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "stretch"};
  flex-wrap: ${props => props.wrap || "nowrap"};
  height: 100%;
  gap: ${props => props.gap || "0"};
  margin: ${props => props.margin || "0"};
`