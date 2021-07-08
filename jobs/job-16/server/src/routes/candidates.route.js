const axios = require('axios');
const express = require('express');

class CandidatesRoute {

    constructor() {

        this.router = express.Router();

        const baseAPI = 'https://hs-recruiting-test-resume-data.s3.amazonaws.com/allcands-full-api_hub_b1f6-acde48001122.json';
        const headers = {
            'content-type': 'application/json'
        };
        const serverAPI = axios.create({
            headers: headers
        });

        this.router.get('/getCandidates', async (request, response) => {
            try {
                const data = await serverAPI.get(baseAPI);
                const candidates = [];
                for (let i = 0; i < data.data.length; i++) {
                    const can = data.data[i];
                    const title = can.contact_info.name.formatted_name;
                    const jobs = [];
                    for (let y = 0; y < can.experience.length; y++) {
                        const ex = can.experience[y];
                        const job_title = ex.title;
                        const start = ex.start_date;
                        const end = ex.end_date;
                        jobs.push({ job_title: job_title, start: start, end: end });
                    }
                    candidates.push({ title: title, jobs: jobs });
                }
                return response.status(200).send(candidates);
            }
            catch (error) {
                response.status(500);
            }
        });
    }
}

const candidatesRoute = new CandidatesRoute();
module.exports = candidatesRoute;