'use strict';

const db = require('./conn');

class ExecutiveModel {
    constructor(id, name, slug, first_year_active) {
        this.id = id;
        this.name= name;
        this.slug = slug;
        this.first_year_active = first_year_active;
    }
    static async getAllExecutiveData() {
        try {
            const response = await db.any(
                `SELECT * FROM ceos
                ORDER BY first_year_active;`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error)
            return error;
        }
    }    

    static async getBySlug(slug) {
        try {
            const response = await db.one(
                `SELECT * FROM ceos
                WHERE slug = '${slug}';`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error)
            return error;
        }
    }

    async addEntry() {
        try {
            const response = await db.result(
                `INSERT INTO ceos
                    (name, slug, first_year_active)
                VALUES 
                    ('${this.name}', '${this.slug}', ${this.first_year_active});`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    async deleteEntry() {
        try {
            const response = await db.result(
                `DELETE FROM ceos
                WHERE id = $1;`, [this.id]
            )
            console.log(response);
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = ExecutiveModel;