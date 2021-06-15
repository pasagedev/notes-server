const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(express.json())
app.use(requestLogger)
app.use(morgan('dev'))
app.use(cors())


let notes = [
    {
        id: 1, content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2, content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3, content: "GET and POST are the most important methods of HTTP protocol",
        ate: "2019-05-30T19:20:14.298Z",
        important: true
    }]


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes/', (request, response) => {
    const note = request.body
    console.log(note)

    response.json(note)
})

const unknownEndpoint = (request, response) => {
    console.log(request)
    response.status(404).send(
        { 
            error: 'unknown endpoint',
            method: request.method,
            path: request.path,
            body: request.body,
 })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})