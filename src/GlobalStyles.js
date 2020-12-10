import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    
    :root{
        --primaryBg: #3d474d;
        --primaryFont: #518387;
    }
    
    * {
        box-sizing: border-box;
        margin: 0;
    }
    
    body {
        background: var(--primaryBg);
        color: var(--primaryFont);
    }
`;
