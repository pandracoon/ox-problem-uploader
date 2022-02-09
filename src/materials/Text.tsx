import { ComponentPropsWithRef } from "react";
import styled from "styled-components";
import { facetype, FaceTypes } from "style/TextStyle";

export interface TextProps extends ComponentPropsWithRef<"span"> {
    content: string | number
    type?: facetype

    size?: number;
    bold?: boolean;
    light?: boolean;
    color?: string;

    //default: left
    align?: "left" | "right" | "center"
    disabled?: boolean;
    fullWidth?: boolean;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginHorizontal?: number;
    marginVertical?: number;

    underlined?: boolean
    elipsis?: boolean
}


const TextComponent = styled.span<Omit<TextProps, "content">>`
    ${({type, color, theme}) => {
        let res = '';
        if(type)
            res += FaceTypes[type];
        if(color)
            res += `color: ${color};`
        if(!type && !color)
            res += `color: ${theme.text};`
        return res;
    }}

    text-align: ${({align}) => align || "left"};
    ${({bold}) => bold && "font-weight: bold;"}
    ${({size}) => size && `font-size: ${size}px;`}

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
    ${({underlined}) => underlined && `text-decoration: underline;`}
    ${({elipsis}) => elipsis ? `
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    ` : 'white-space: pre-wrap;'}
    
    letter-spacing: 0.01em;
`

export function Text({content, ...props}:TextProps){ 
    return (
        <TextComponent {...props}>
            {content}
        </TextComponent>
    )
};
