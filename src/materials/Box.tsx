import styled, { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export interface BoxProps {
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
    alignItems?: "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | "first" | "last" 
    justifyContent?: "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" | 
        "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" 
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginHorizontal?: number;
    marginVertical?: number;

    padding?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;

    flex?: number
    css?: FlattenInterpolation<ThemeProps<DefaultTheme>> | FlattenInterpolation<ThemeProps<DefaultTheme>>[];
}

export const Box = styled.div<BoxProps>`
    display: flex;
    flex-direction: ${({flexDirection}) => flexDirection || 'row'};
    ${({alignItems}) => alignItems && (`align-items: ${alignItems};`)}
    ${({justifyContent}) => justifyContent && (`justify-content: ${justifyContent};`)}

    ${({margin}) => margin && `margin: ${margin}px;`}
    ${({marginTop}) => marginTop && `margin-top: ${marginTop}px;`}
    ${({marginBottom}) => marginBottom && `margin-bottom: ${marginBottom}px;`}
    ${({marginLeft}) => marginLeft && `margin-left: ${marginLeft}px;`}
    ${({marginRight}) => marginRight && `margin-right: ${marginRight}px;`}
    ${({marginHorizontal}) => marginHorizontal && `
        margin-left: ${marginHorizontal}px;
        margin-right: ${marginHorizontal}px;
    `}
    ${({marginVertical}) => marginVertical && `
        margin-top: ${marginVertical}px;
        margin-bottom: ${marginVertical}px;
    `}
    
    ${({padding}) => padding && `padding: ${padding}px;`}
    ${({paddingTop}) => paddingTop && `padding-top: ${paddingTop}px;`}
    ${({paddingBottom}) => paddingBottom && `padding-bottom: ${paddingBottom}px;`}
    ${({paddingLeft}) => paddingLeft && `padding-left: ${paddingLeft}px;`}
    ${({paddingRight}) => paddingRight && `padding-right: ${paddingRight}px;`}
    ${({paddingHorizontal}) => paddingHorizontal && `
        padding-left: ${paddingHorizontal}px;
        padding-right: ${paddingHorizontal}px;
    `}
    ${({paddingVertical}) => paddingVertical && `
        padding-top: ${paddingVertical}px;
        padding-bottom: ${paddingVertical}px;
    `}

    ${({flex}) => flex && `flex: ${flex};`}
    ${({css}) => css ? css.flat() : ''}
`