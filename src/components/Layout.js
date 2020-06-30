import styled from 'styled-components'

export const Centered = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ direction = 'row' }) => `flex-direction: ${direction};`}
  ${({ horizontal = true }) => horizontal && 'width: 100%;'}
  ${({ vertical = true }) => vertical && 'height: 100%;'}
`
