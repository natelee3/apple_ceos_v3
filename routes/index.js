'use strict';

const express = require('express');
const ExecutivesModel = require('../models/ExecutivesModel');
const router = express.Router();
const slugify = require('slugify');

router.get('/:slug?', async (req, res) => {
    if (!!req.params.slug) {
        const {slug} = req.params;
        const theCeo = await ExecutivesModel.getBySlug(slug);
        console.log(theCeo.name)
        res.render('template', {
            locals: {
                title: 'CEO Details',
                theCeo
            },
            partials: {
                body: 'partial-ceo_details'
            }
        })
    } else {
        const ceoData = await ExecutivesModel.getAllExecutiveData();
        res.render('template', {
            locals: {
                title: 'Apple CEOs',
                data: ceoData
            },
            partials: {
                body: 'partial-index'
            }
        })
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

    res.sendStatus(200);
})

router.post('/delete', async (req, res) => {
    const {id, ceo_name, ceo_slug, ceo_year} = req.body;
    const executiveToDelete = new ExecutivesModel(id, ceo_name, ceo_slug, ceo_year);
    const response = await executiveToDelete.deleteEntry();

    res.sendStatus(200);
})

module.exports = router;
