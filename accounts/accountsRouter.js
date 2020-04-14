const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// CREATE POST
router.post( '/', (req, res)=>{
    const accountData= req.body;
    db.insert(accountData).into("accounts")
    .then(account =>{
        res.status(201).json(account);
    })
    .catch(err =>{
        res.status(500).json({ message:"db problem", error: err})
    })
});

// READ POSTS
router.get("/", (req, res) => {
    db.select().from('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({message: "error", err})
    })
})

router.get("/:id", (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .first()
    .then(post => {
        if(post) {
        res.status(200).json(post)
        } else {
            res.status(400).json({message: "post not found"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "error", err})
    })
})

//UPDATE POSTS

router.put("/:id", (req, res) => {
    const {id}= req.params
    const changes= req.body

    db("accounts")
    .where({id})
    .update(changes)
    .then(count => {
        if(count) {
            res.json({updated:count})
        } else {
            res.status(200).json(count)
        }
    })
    .catch(err => {
        res.status(500).json({message: "err", err})
    })
})

//DELETE POSTS

router.delete("/:id", (req, res) => {
    const {id} = req.params
    db("accounts")
    .where ({id})
    .del({id})
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(err => {
        res.status(500).json({message: "cannot delete", err});
    })
});

module.exports = router;