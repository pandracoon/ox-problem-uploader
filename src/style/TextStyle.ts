import { css, FlattenSimpleInterpolation } from "styled-components"

const H1 = css`
  font-family: 'Noto Sans KR';
  font-weight: bold;
  font-size: 24px;
  color: #060607;
`

const H2 = css`
font-family: 'Noto Sans KR';
  font-size: 22px;
  font-weight: bold;
  color: #060607;
`

const P1 = css`
font-family: 'Noto Sans KR';
  font-size: 16px;
  color: #060607;
`

 const P2 = css`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #060607;
`

 const D1 = css`
  font-family: 'Noto Sans KR';
  font-size: 12px;
  color: #748089;
`
 const D2 = css`
  font-family: 'Noto Sans KR';
  font-size: 11px;
  color: #748089;
`

export type facetype = "H1" | "H2" | "P1" | "P2" | "D1" | "D2";
type ITypeFace = {
    [key in facetype]: FlattenSimpleInterpolation
}
export const FaceTypes:ITypeFace = {H1,H2,P1,P2,D1,D2}