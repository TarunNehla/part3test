require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())





app.get('/',(request,response) => {
    response.send('<h1>Hello world </h1>')
})

app.get('/api/notes', (request,response) => {
    Note.find({}).then(notes=>{
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request,response) =>{
  const id = request.params.id
  const note = notes.find(n => n.id ===id)
  if(note){
    response.json(note)
  }
  else{
    response.status(404).end()
  }

})



app.delete('/api/notes/:id', (request,response) => {
  const id = request.params.id
  notes = notes.filter(n => n.id!==id)
  response.status(204).end() //204 means no more opertions left to be done 
})

app.post('/api/notes', (request,response) => {
  const maxId = notes.length>0 ? Math.max(...notes.map(n => Number(n.id))) : 0 
  
  const body = request.body
  if(!body.content){
    return response.status(400).json({ error: 'Content missing' });
  }

  const note = {
    id : String(maxId+1),
    content : body.content,
    important : body.important || false,
  }
  notes = notes.concat(note)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is runnig on port ${PORT}`)
})