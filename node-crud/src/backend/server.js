const express = require('express')
const app = express()
// Allow express to accept JSON
app.use(express.json())

// create start server
app.listen(8000, () => {
    console.log("server is up")
})

// array for data
var contacts = [
    {
        id:"1",
        name:"Anirudh"
    }
]

// API to get data
app.get('/contact', (req, res) => {
    res.send({
        success:true,
        message:'data fetched successfully',
        data:contacts
    })
})

//API to add data
app.post('/contact', (req, res) => {
    var name = req.body.name
    if(name) {
        contacts.push({
        id:(contacts.length + 1).toString(),
        name:name
        })
        res.send({
            success:true,
            message:'data added successfully'
        })
    }
    else {
        res.send({
            success:false,
            message:"validation error",
            errors:{
                field:"name",
                message:"cannot be null"
            }
        })
    }
})

// Delete a contact
app.delete('/contact/:id', (req, res) => {
    var id = req.params.id
    var newContact = contacts.filter(l => l.id != id)
    contacts = newContact

    res.send({
        success:true,
        message:"data deleted successfully",
    })
})

// Updating data
app.put('/contact/:id', (req, res) => {
    var id = req.params.id
    var name = req.body.name

    if(name) {
        // Get index of the object
        var index = contacts.findIndex(el => el.id == id)

        contacts[index] = {
            // Spread operator to change only name
            ...contacts[index], 
            name:name
        }

        res.send({
            success:true,
            message:"data updated successfully",
        })
    }
    else {
        res.send({
            success:false,
            message:"validation error",
            errors:{
                field:"name",
                message:"cannot be null"
            }
        })
    }
})