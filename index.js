const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/atendimento', async (req, res) => {
     const {pergunta} = req.body;

    try{
        const resposta = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions', {
                model: "google/gemma-3n-e4b-it:free",
                messages: [
                    {
                        role: "system",
                        content: "Você e um atendente virtual de uma loja. Responda dúvidas dos clientes sobre produtos, horários de funcionamento, formas de pagamento e localização de forma clara e educada "
                    },
                    {
                        role: "user",
                        content: pergunta
                    }
                ]
            },
            {
                headers:{
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
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
   
    

        