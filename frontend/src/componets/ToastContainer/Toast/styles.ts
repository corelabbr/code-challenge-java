import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

interface ContainerProps {
    type?: 'success' | 'error' | 'info' | 'warn';
    hasDescription: boolean;
}
const toastTypeVariations = {
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `,
    success: css`
        background: #4caf50;
        color: #fff;
    `,
    error: css`
        background: #e65100;
        color: #fff;
    `,
    warn: css`
        background: #ff9800;
        color: #fff;
    `,
};

export const Container = animated(styled.div<ContainerProps>`
    width: 360px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    z-index: 30000;

    & + div {
        margin-top: 8px;
    }

    ${props => toastTypeVariations[props.type || 'info']}

    > svg {
        margin: 4px 12px 0 0;
        cursor: pointer;
    }
    div {
        flex: 1;
        p {
            margin-top: 4px;
            font-size: 14px;
            font-weight: bold;
            opacity: 0.8;
            line-height: 20px;
        }
    }
    button {
        position: absolute;
        right: 10px;
        top: 10px;
        opacity: 0.6;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
    }
    ${props =>
        !props.hasDescription &&
        css`
            align-items: center;
            svg {
                margin-top: 0;
            }
        `}
`);
