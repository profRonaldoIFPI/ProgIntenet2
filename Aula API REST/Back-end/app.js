const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

//converte o 'body' das requisições em json
app.use(bodyParser.json()); //já inclui o URL-encoded 

app.use(cors());
//lista que será manipulada na API
let usuarios = []

//LISTA TODA
app.get("/usuario",(req,res)=>{
    res.json(usuarios)
})

//ADICIONA ÍTEM A LISTA
app.post("/usuario",(req,res)=>{
    const usuario = req.body
    let novoId;
    if (usuarios.length > 0) {
        let utimoUsuario = usuarios[usuarios.length - 1];
        novoId = (parseInt(utimoUsuario.id) + 1).toString();
    } else {
        novoId = '1';
    }
    usuario.id = novoId;
    usuarios.push(usuario)
    res.status(201).send("Usuário criado.")
})

//BUSCA UM ÍTEM NA LISTA PELO ID
app.get("/usuario/:id",(req,res)=>{
    const id = req.params.id
    const usuario = usuarios.find(u => u.id === id)
    if (usuario){
        res.json(usuario)
    }else{
        res.status(404).send("Registro não encontrado.")
    }
})
//ATUALIZA UM ÍTEM NA LISTA PELO ID
app.put("/usuario/:id",(req,res)=>{
    const id = req.params.id
    const indice = usuarios.findIndex(u => u.id === id)
    if (indice !== -1){
        usuarios[indice] = req.body
        res.send("Registro atualizado.")
    }else{
        res.status(404).send("Registro não encontrado.")
    }
})
//DELETE UM ÍTEM NA LISTA PELO ID
app.delete("/usuario/:id", (req, res)=>{
    const id = req.params.id
//o filtro retorna todos os itens da lista com o id diferente do informado
    usuarios = usuarios.filter(u => u.id !== id)
    
//Outra forma
//splice "fatia" a lista a partir do indice até o numero de ítens informado 
    //const index = usuarios.findIndex(u => u.id === id)
    //usuarios.splice(index, 1)
    res.send("Usuário excluido.")
})

app.listen(3000, (err)=>{
    if (err){
        console.log(`Algo errado:${err}`)
    }else{
        console.log('Servidor on-line')
    }
})