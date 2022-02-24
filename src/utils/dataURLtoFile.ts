export const dataURLtoFile = (dataurl: string, fileName: string) => {
 
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)
    if(!mime)
        throw Error('filename should be like "******.***"')

    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return {
        file: new File([u8arr], fileName, {type:mime[1]}),
        filename: `${fileName}.${mime[1].split('/')[1]}`
    };
}
