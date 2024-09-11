import { styled } from 'styled-components'

export const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    background-color: #c6c1bc;
    margin: auto 0;
    padding: 0 12px;
    > svg {
        border-radius: 25%;
        background-color: orange;
    }
`