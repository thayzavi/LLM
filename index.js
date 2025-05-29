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
                model: "mistralai/mistral-7b-instruct:free",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente de suporte técnico. Ajuda o usuário a resolver problemas com tecnologia de forma clara e prática. Seja paciente e explique os passos."
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
   
    

        