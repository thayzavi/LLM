const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const modelId = 'HuggingFaceH4/zephyr-7b-beta';

app.post('/atendimento', async (req, res) => {
     const {pergunta} = req.body;

    try {
    const resposta = await axios.post(
      `https://api-inference.huggingface.co/models/${modelId}`,
      {
        inputs: `Usuário: ${pergunta}\nAssistente:`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
        const respostaTexto = resposta.data.choices[0].message.content;
        res.json({resposta: respostaTexto });
    } catch (erro){
        console.error(erro.response?.data || erro.message);
        res.status(500).json({erro:"Erro ao consulta o modelo."});
    }
});

// iniciando servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
   
    

        