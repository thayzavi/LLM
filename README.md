# Assistente virtual de uma loja

Este projeto é um backend que usa um modelo de linguagem (LLM) para responder perguntas sobre um atendende virtual sobre tecnologoa.

## Funcionalidade

- Envia perguntas para um modelo LLM.
- Recebe respostas em linguagem natural e didática.

## Tecnologias

- Node.js
- Express
- API: Hugging Face

## Como rodar
```
1. Clone o repositório
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` com sua chave de API do  Hugging Face
4. Inicie com `node index.js`
```

## Exemplo de uso
```
POST `/atendimento`
json
{
  "pergunta": "Quais tipos de PC vocês tem?"
}
```