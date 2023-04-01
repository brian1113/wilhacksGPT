import * as dotenv from 'dotenv'
dotenv.config()
import { ChatGPTUnofficialProxyAPI } from 'chatgpt'


import express from 'express'
const app = express()
const port = 1234

const api = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPENAI_ACCESS_TOKEN,
    apiReverseProxyUrl: "https://api.pawan.krd/backend-api/conversation",
    
  })

app.get('/:prompt', async (req, res) => {
    res.send(await promptGen(req.params.prompt+
        "\nBased on the list above, generate a numbered list of amazon products that are eco-friendly alternatives without explanations"
        + "If no alternatives are found, don't say anything"));
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function promptGen(prompt) {
    const res = await api.sendMessage(prompt, {
        onProgress: (partialResponse) => console.log(partialResponse.text)
    })
    return addFormatting(res.text);
}

async function addFormatting(gptResponse){
  if(gptResponse.indexOf('1.') == -1)
    return "No alternatives found";
  else
    return gptResponse.substring(gptResponse.indexOf('1.'));
}

// async function addFormatting(gptResponse){
//   if(gptResponse.indexOf('1.') == -1)
//     return "No recommendations found.";
//   else
//     gptResponse = gptResponse.substring(gptResponse.indexOf('1.'));

//   let counter = 2;
//   let foundIndex = -1;
//   while((foundIndex = gptResponse.indexOf(counter+'.')) != -1){
//     gptResponse = gptReponse.substring(0,foundIndex)+'\n'+gptReponse.substring(foundIndex);
//   }
//   return gptResponse;
// }

// async function main() {
    
//     const res = await api.sendMessage('can you print out "hi test', {
//         onProgress: (partialResponse) => console.log(partialResponse.text)
//     })
//     console.log(res.text)
// }

console.log("test")
// main();
