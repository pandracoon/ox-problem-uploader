import { Crop } from 'react-image-crop'

export function getCroppedImg(src: string, crop:Crop):Promise<string> {
    const image = new Image()
    image.src = src;
    const canvas = document.createElement("canvas"); // document 상에 canvas 태그 생성
    // 캔버스 영역을 크롭한 이미지 크기 만큼 조절
    canvas.width = crop.width;
    canvas.height = crop.height;
    // getContext() 메서드를 활용하여 캔버스 렌더링 컨텍스트 함수 사용
    // 이 경우 drawImage() 메서드를 활용하여 이미지를 그린다
    const ctx = canvas.getContext("2d");

    // canvas 이미지를 base64 형식으로 인코딩된 URI 를 생성한 후 반환한다
    return new Promise((resolve, reject)=> {
        if(!ctx)
            reject("Error.")
        else {
            ctx.drawImage(
                // 원본 이미지 영역
                image, // 원본 이미지
                crop.x, // 크롭한 이미지 x 좌표
                crop.y, // 크롭한 이미지 y 좌표
                crop.width, // 크롭한 이미지 가로 길이
                crop.height, // 크롭한 이미지 세로 길이
                // 캔버스 영역
                0, // 캔버스에서 이미지 시작 x 좌표
                0, // 캔버스에서 이미지 시작 y 좌표
                crop.width, // 캔버스에서 이미지 가로 길이
                crop.height //  캔버스에서 이미지 세로 길이
              );
            resolve(canvas.toDataURL());
        }
    });
}