import axios from 'axios'

export async function gccTextDetection(base64: string):Promise<string> {
    return axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GCC_API_KEY}`,
      {
        requests: [{
          image: {
            content: base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
          },
          features: [
            { type: 'TEXT_DETECTION', maxResults: 5 },
          ]
        }]
      },
    ).then(res => {
      return res.data.responses[0].fullTextAnnotation.text
    }).catch(e => {
      console.log(e.response)
    })
}