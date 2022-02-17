import vision from '@google-cloud/vision'

export async function gccTextDetection() {
    // Imports the Google Cloud client library
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const result = await client.textDetection('img/example.png');
    console.log(result)
}