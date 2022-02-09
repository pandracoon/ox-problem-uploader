import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html{
        font-family: -apple-system;
        max-width: 100vw;
        min-height: 100vh;
        background-color: #fff;
    }
    body, html{
        padding: 0;
        margin: 0;
    }
    
    @font-face {
        font-family: 'Noto Sans KR';
        font-weight: 300;
        src: url('./fonts/NotoSansKR-Light.otf') format('woff2'),
          url('./fonts/NotoSansKR-Light.otf') format('woff'),
          url('./fonts/NotoSansKR-Light.otf') format('truetype');
    }
      
    @font-face {
        font-family: 'Noto Sans KR';
        font-weight: 400;
        src: url('./fonts/NotoSansKR-Regular.otf') format('woff2'),
          url('./fonts/NotoSansKR-Regular.otf') format('woff'),
          url('./fonts/NotoSansKR-Regular.otf') format('truetype');
    }
    
    @font-face {
        font-family: 'Noto Sans KR';
        font-weight: 500;
        src: url('./fonts/NotoSansKR-Medium.otf') format('woff2');
    }
    
    @font-face {
        font-family: 'Noto Sans KR';
        font-weight: 700;
        src: url('./fonts/NotoSansKR-Bold.otf') format('woff2'),
          url('./fonts/NotoSansKR-Bold.otf') format('woff'),
          url('./fonts/NotoSansKR-Bold.otf') format('truetype');
    }
      
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }
`
export default GlobalStyle;