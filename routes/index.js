'use strict';

const express = require('express');
const ExecutivesModel = require('../models/ExecutivesModel');
const router = express.Router();
const slugify = require('slugify');

router.get('/:slug?', async (req, res) => {
    if (!!req.params.slug) {
        const {slug} = req.params;
        const theCeo = await ExecutivesModel.getBySlug(slug);
        res.json(theCeo).status(200)
       
    } else {
        const ceoData = await ExecutivesModel.getAllExecutiveData();
        res.json(ceoData).status(200)
    }
    
})

router.post('/', async (req, res) => {
    const {ceo_name, ceo_year} = req.body;
    const ceo_slug = slugify(ceo_name, {
        replacement: '_',
        lower: true,
        strict: true
    });
    const newExecutive = new ExecutivesModel(null, ceo_name, ceo_slug, ceo_year);
    const response = await newExecutive.addEntry();

    res.redirect('/');
})

router.post('/delete', async (req, res) => {
    const {id, ceo_name, ceo_slug, ceo_year} = req.body;
    const executiveToDelete = new ExecutivesModel(id, ceo_name, ceo_slug, ceo_year);
    const response = await executiveToDelete.deleteEntry();

    res.redirect('/');
})

module.exports = router;
