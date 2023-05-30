import express from 'express'

// make a new express app
// in app.js (get it?)
const app = express()


app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next()
})

app.use(express.json())

app.get('/api/v1/status', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {red: 0, blue: 0}
    })
})
app.post('/api/v1/review', (req, res) => {
    const review = req.body
    // review -> { name: '...', message: '...', rating: '...' }
    // do something with the review
    console.log(review);


    // return status 201 'created' ⚠️
    res.status(200).json({nameWas: review.name})
})
app.get('/api/v1/reviews/:id', (req, res) => {
    // convert to number by using '+'
    const id = +req.params.id

    console.log(id);
    res.status(200).json({id})
})



// make your app listen to a certain port
app.listen(3000, () => console.log(`listening on http://localhost:${3000}`))