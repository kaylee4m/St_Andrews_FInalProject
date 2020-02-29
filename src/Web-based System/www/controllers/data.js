//Controller layer
const path = require('path'); //Path
const fs = require('fs'); //file
const DataModel = require('../models/data')

const orgMap = {
    "The University of St Andrews": "University",
    "School of Art History": "School",
    "School of Biology": "School",
    "School of Chemistry": "School",
    "School of Classics": "School",
    "School of Computer Science": "School",
    "School of Divinity": "School",
    "School of Economics and Finance": "School",
    "School of English": "School",
    "School of Geography and Geosciences": "School",
    "School of History": "School",
    "School of International Relations": "School",
    "School of Management": "School",
    "School of Mathematics and Statistics": "School",
    "School of Medicine": "School",
    "School of Modern Languages": "School",
    "School of Physics and Astronomy": "School",
    "School of Philosophical, Anthropological and Film Studies": "School",
    "School of Psychology and Neuroscience": "School",
    "Applied Mathematics": "Department",
    "Film Studies": "Department",
    "French": "Department",
    "German": "Department",
    "Italian": "Department",
    "Philosophy": "Department",
    "Pure Mathematics": "Department",
    "Russian": "Department",
    "Social Anthropology": "Department",
    "Spanish": "Department",
    "Statistics": "Department",
    "Centre for Amerindian, Latin American and Caribbean Studies": "Centres and Institutes",
    "Centre for Cosmopolitan Studies": "Centres and Institutes",
    "Biomedical Sciences Research Complex": "Centres and Institutes",
    "Centre for Dynamic Macroeconomic Analysis": "Centres and Institutes",
    "Institute for Environmental History": "Centres and Institutes",
    "Centre for Politics of Screen Cultures": "Centres and Institutes",
    "Centre for Housing Research": "Centres and Institutes",
    "Centre for Interdisciplinary Research in Computational Algebra": "Centres and Institutes",
    "Centre for Peace and Conflict Studies": "Centres and Institutes",
    "Centre for Ethics, Philosophy and Public Affairs": "Centres and Institutes",
    "Arché Philosophical Research Centre for Logic, Language, Metaphysics and Epistemology": "Centres and Institutes",
    "Centre for Research into Ecological & Environmental Modelling": "Centres and Institutes",
    "Centre for Research into Industry,  Enterprise, Finance and the Firm": "Centres and Institutes",
    "Centre for Russian, Soviet, Central and Eastern European Studies": "Centres and Institutes",
    "Centre for Social Learning & Cognitive Evolution": "Centres and Institutes",
    "Centre for the Study of Ancient Systems of Knowledge": "Centres and Institutes",
    "Centre for the Study of Religion and Politics": "Centres and Institutes",
    "The Handa Centre for the Study of Terrorism and Political Violence": "Centres and Institutes",
    "Centre for Evolution, Genes and Genomics": "Centres and Institutes",
    "Institute for Iranian Studies": "Centres and Institutes",
    "Linguistics Institute of St Andrews": "Centres and Institutes",
    "Institute for Theology, Imagination & the Arts": "Centres and Institutes",
    "Institute of Behavioural and Neural Sciences": "Centres and Institutes",
    "Institute of European Cultural Identity Studies": "Centres and Institutes",
    "Institute of Middle East, Central Asia and Caucasus Studies": "Centres and Institutes",
    "Longitudinal Studies Centre - Scotland": "Centres and Institutes",
    "Museums, Galleries and Collections Institute": "Centres and Institutes",
    "Sea Mammal Research Unit": "Centres and Institutes",
    "Organic Semiconductor Centre": "Centres and Institutes",
    "Photonics Innovation Centre": "Centres and Institutes",
    "Social Dimensions of Health Institute": "Centres and Institutes",
    "Centre for French History and Culture": "Centres and Institutes",
    "Reformation Studies Institute": "Centres and Institutes",
    "St Andrews Sustainability Institute": "Centres and Institutes",
    "St Andrews Institute of Mediaeval Studies": "Centres and Institutes",
    "Centre for Global Constitutionalism": "Centres and Institutes",
    "Institute of Scottish Historical Research": "Centres and Institutes",
    "Institute for Capitalising on Creativity": "Centres and Institutes",
    "Centre of Magnetic Resonance": "Centres and Institutes",
    "Centre for Pacific Studies": "Centres and Institutes",
    "Scottish Oceans Institute": "Centres and Institutes",
    "St Andrews Institute for Transnational & Spatial History": "Centres and Institutes",
    "Centre for Population Change": "Centres and Institutes",
    "Institute for Bible, Theology & Hermeneutics": "Centres and Institutes",
    "Centre for Social and Environmental Accounting Research": "Centres and Institutes",
    "Centre for Higher Education Research": "Centres and Institutes",
    "Institute for Contemporary and Comparative Literature": "Centres and Institutes",
    "Fish Behaviour and Biodiversity Research Group": "Research Group",
    "‘Living Links to Human Evolution’ Research Centre": "Research Group",
    "Centre for Responsible Banking and Finance": "Centres and Institutes",
    "Centre for Mediaeval and Early Modern Law and Literature": "Centres and Institutes",
    "Earth and Environmental Sciences": "Department",
    "Geography & Sustainable Development": "Department",
    "Arabic and Persian": "Department",
    "Centre for Biological Diversity": "Centres and Institutes",
    "Microphotonics and Photonic Crystals Group": "Research Group",
    "Centre for Geoinformatics": "Centres and Institutes",
    "Child and Adolescent Health Research Unit": "Research Group",
    "Sediment Ecology Research Group": "Research Group",
    "Marine Alliance for Science & Technology Scotland": "Research Pool",
    "Gillespie Group": "Research Group",
    "Sound Tags Group": "Research Group",
    "Bioacoustics group": "Research Group",
    "St Andrews Institute of Intellectual History": "Centres and Institutes",
    "Centre for Archaeology, Technology and Cultural Heritage": "Centres and Institutes",
    "Research Unit for Research Utilisation": "Centres and Institutes",
    "EaSTCHEM": "Research Pool",
    "East of Scotland Bioscience Doctoral Training Partnership": "Research Group",
    "Condensed Matter Physics": "Research Group",
    "Centre for the Literatures of the Roman Empire": "Centres and Institutes",
    "Global Health Implementation Group": "Research Group",
    "Institute for Data-Intensive Research": "Centres and Institutes",
    "Public Health Group": "Research Group",
    "WHO Collaborating Centre for International Child & Adolescent Health Policy": "Centres and Institutes",
    "SMRU Consulting": "Research Group",
    "Infection Group": "Research Group",
    "Institute for the Study of War and Strategy": "Centres and Institutes",
    "Arctic Research Centre": "Centres and Institutes",
    "Centre for Late Antique Studies": "Centres and Institutes",
    "Health Psychology": "Research Group",
    "St Andrews Isotope Geochemistry": "Research Group",
    "Centre for Landscape Studies": "Centres and Institutes",
    "Institute of Legal and Constitutional Research": "Centres and Institutes",
    "Centre for Poetic Innovation": "Centres and Institutes",
    "Centre for the Study of Philanthropy & Public Good": "Centres and Institutes",
    "St Andrews Centre for Exoplanet Science": "Centres and Institutes",
    "Centre for Anatolian and East Mediterranean Studies": "Centres and Institutes",
    "Centre for Minorities Research (CMR)": "Centres and Institutes",
    "School of Earth & Environmental Sciences": "School",
    "School of Geography & Sustainable Development": "School",
    "Pelagic Ecology Research Group": "Research Group",
    "Centre for Art and Politics": "Centres and Institutes",
    "Population and Behavioural Science Division": "Research Group",
    "Cellular Medicine Division": "Research Group",
    "Infection and Global Health Division": "Research Group",
    "Education Division": "Research Group",
    "English Language Teaching": "Research Group",
    "Centre for Contemporary Art": "Centres and Institutes",
    "Bell-Edwards Geographic Data Institute": "Centres and Institutes",
    "Centre for Research into Equality, Diversity & Inclusion": "Centres and Institutes",
    "Institute of Global Cinema and Creative Cultures": "Centres and Institutes",
    "Centre for the Public Understanding of Greek and Roman Drama": "Centres and Institutes",
    "Institute for Gender Studies": "Centres and Institutes",
    "Centre for Biophotonics": "Centres and Institutes",
    "Centre for the Study of Medieval Manuscripts and Technology": "Centres and Institutes",
    "St Andrews GAP Centre": "Research Group",
    "Centre for Designer Quantum Materials": "Centres and Institutes",
    "The Logos Institute for Analytic and Exegetical Theology": "Centres and Institutes",
    "Sir James Mackenzie Institute for Early Diagnosis": "Centres and Institutes",
    "Coastal Resources Management Group": "Research Group",
    "Cross Cultural Circa Nineteenth Century Research Centre": "Centres and Institutes"
}


const getDataByPeriod = (params) => {
    const { start, end, field } = params
    if (!start) {
        throw new Error('no start year')
    } else {
        return DataModel.getDataByPeriod(start, end, field)
    }
}

class Data {
    //Submit and save data related logic
    static async save(ctx) {
        const data = ctx.request.body
        await DataModel.create(data)
        ctx.body = {
            succ: true,
        }
    }
    //Upload related logic
    static async upload(ctx) {
        const src = ctx.req.file.destination + ctx.req.file.filename
        const jsonStr = fs.readFileSync(src, 'utf-8')
        const json = JSON.parse(jsonStr)
        let data = []
        if (json.items && json.items.length) {

            json.items.forEach((v, idx) => {
                // const school = v.personAssociations[0].organisationalUnits[0].name[0].value
                // const centresAndInstitute = v.personAssociations[0].organisationalUnits[1] ? v.personAssociations[0].organisationalUnits[1].name[0].value : ''
                const periodStartDate = v.period.startDate.year || ''
                const managingOrganisationalUnit = v.managingOrganisationalUnit ? v.managingOrganisationalUnit.name[0].value : 'None'
                if (+periodStartDate > 1900) {
                    data.push({
                        activityName: v.title[0].value,
                        periodStartDate,
                        periodEndDate: v.period.endDate ? v.period.endDate.year : '',
                        managingOrganisationalUnit,
                        // organisation: [school, centresAndInstitute],
                        info: v.info.portalUrl,
                        type: v.type[0].value,
                        personAssociationsName: v.personAssociations[0].person ? v.personAssociations[0].person.name[0].value : 'None',
                        orgType: orgMap[managingOrganisationalUnit] || 'None'
                        // school,
                        // centresAndInstitute
                    })
                }
            })
        }
        console.time('InsertMany');
        // data.forEach(async v => {
        //     await DataModel.create(v)
        // })
        // await Promise.all(data.map(async v => await DataModel.create(v)))
        await DataModel.saveMany(data)
        console.timeEnd('InsertMany');
        ctx.body = {
            succ: true,
            data: data.length
        }
    }

    static async getAllValue(ctx) {
        const { field } = ctx.request.query
        const arr = await DataModel.distinct(field)
        ctx.body = {
            succ: true,
            data: arr
        }
    }

    static async getList(ctx) {
        const { pageSize = 20, pageNum, cond = {} } = ctx.request.body
        const conditions = {}
        for (let key in cond) {
            conditions[key] = new RegExp(cond[key], 'i')
        }
        const count = await DataModel.getCount(conditions)
        const list = await DataModel.getList(pageSize, pageNum, conditions)
        ctx.body = {
            succ: true,
            data: {
                count,
                list
            }
        }
    }



    static async mapFieldToYearsNum(ctx) {
        const { field } = ctx.request.query
        const list = await getDataByPeriod(ctx.request.query)
        const years = [...new Set(list.map(v => v.periodStartDate))].sort((a, b) => a - b)
        const seriesMap = {}
        list.forEach(v => {
            const { periodStartDate } = v
            const school = v[field]
            if (seriesMap[school]) {
                if (periodStartDate in seriesMap[school]) {
                    seriesMap[school][periodStartDate] += 1
                } else {
                    seriesMap[school][periodStartDate] = 1
                }
            } else {
                seriesMap[school] = {
                    [periodStartDate]: 1
                }
            }
            const containedYears = Object.keys(seriesMap[school])
            years.forEach(y => {
                if (!containedYears.includes(y + '')) {
                    seriesMap[school][y] = 0
                }
            })
        })
        ctx.body = {
            succ: true,
            data: seriesMap
        }
    }

    static async mapOrgTypeToNum(ctx) {
        const { field } = ctx.request.query
        const list = await getDataByPeriod(ctx.request.query)
        const map = {}
        list.forEach(v => {
            const key = v[field]
            if (key in map) {
                map[key] += 1
            } else {
                map[key] = 1
            }
        })
        ctx.body = {
            succ: true,
            data: map
        }
    }

    // static async mapOrgToYearsNum(ctx) {
    //     const {start,end} = ctx.request.query
    //     const field = 'managingOrganisationalUnit'
    //     const list = await getDataByPeriod(start, end, field )

    // }
}

module.exports = Data