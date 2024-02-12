const express = require('express')
const chirpStore = require('../chirpstore')
const router = express.Router()


router.get("/:id?", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(id){
            const chirp = await chirpStore.GetChirp(id)
            res.json(chirp)
        }else{
        const chirps = await chirpStore.GetChirps()
        delete chirps.nextid
        const updatedChirps = await Object.keys(chirps).map(id =>{
            const chirp = chirps[id]
            return{...chirp, id}
        })
        res.json(updatedChirps)}

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})

router.post("/", async (req, res) => {
    try {
        const { text, username } = req.body
        const createChirp = await chirpStore.CreateChirp({ text, username })
        res.json(createChirp)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})

router.put("/:id?", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { text, username } = req.body
        const editChirp = await chirpStore.UpdateChirp(id, { text, username })
        res.json(editChirp)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})

router.delete("/:id?", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const deleteChirp = await chirpStore.DeleteChirp(id)
        res.json(deleteChirp)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})

module.exports = router
