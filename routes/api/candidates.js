const express = require('express');
const router = express.Router();
const Candidate = require('../../models/Candidate');

const { check, validationResult } = require('express-validator');

//route POST api/candidates/search
router.post('/search',async(req,res) => {

    const { title, location, availability } = req.body;
    try {

        const matchingCandidates = await Candidate.find({
            title: title,
            location: location,
            availability: availability
        }).toArray();

        if(matchingCandidates.isEmpty()){
            return res.status(400).json({msg:'No candidates found'});            
        }

        res.json(matchingCandidates);
    }catch(err){
        console.error(err.message);
    }
});

// route POST api/candidates/add
// @access public

router.post('/add',[
    check('firstname','name is required'),
    check('lastname', 'last name is required'),
    check('title','title is required'),
    check('location','location is required'),
    check('availability','availability is required')
],
async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array()})
    }

    const { firstname, lastname, title, location, availability } = req.body;

    try {
        //const candidate = await Candidate.findById(req.user.id).select('-password');

        const newCandidate = new Candidate({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            title: req.body.title,
            location: req.body.location,
            availability: req.body.availability
        });

        let nCandidate;
        const candidate = await Candidate.find();

        if(candidate){
            nCandidate = await Candidate.findOneAndUpdate(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                },
                {$set: newCandidate},
                { new: true }

            );
        }

        nCandidate = new Candidate(newCandidate);
        await nCandidate.save();

        res.json(nCandidate);

    }catch(error){
        res.status(500).json({msg: "issue adding candidate"});
    }



});

module.exports = router;

