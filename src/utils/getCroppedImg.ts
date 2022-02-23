import { IPhoto } from 'interfaces/photo.interface';

interface CroppedImg {
    url: string
    width: number
    height: number
}
export function getCroppedImg({url, width, height, crop}:IPhoto):Promise<CroppedImg> {
    const X = width * crop.x / 100,
        Y = height * crop.y / 100,
        WIDTH = width * crop.width / 100,
        HEIGHT = height * crop.height / 100;

    const image = new Image()
    image.src = url;
    const canvas = document.createElement("canvas"); // document 상에 canvas 태그 생성
    // 캔버스 영역을 크롭한 이미지 크기 만큼 조절
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
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
                X, // 크롭한 이미지 x 좌표
                Y, // 크롭한 이미지 y 좌표
                WIDTH, // 크롭한 이미지 가로 길이
                HEIGHT, // 크롭한 이미지 세로 길이
                // 캔버스 영역
                0, // 캔버스에서 이미지 시작 x 좌표
                0, // 캔버스에서 이미지 시작 y 좌표
                WIDTH, // 캔버스에서 이미지 가로 길이
                HEIGHT //  캔버스에서 이미지 세로 길이
              );
            resolve({
                url: canvas.toDataURL(),
                width: WIDTH,
                height: HEIGHT
            });
        }
    });
}