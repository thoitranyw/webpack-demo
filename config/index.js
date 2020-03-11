const path = require('path')
const convict = require('convict')

const config = convict({
    api: {
        doc: 'API origin.',
        format: 'url',
        default: 'http://127.0.0.1:8000/api'
    },
    env: {
        doc: 'ENV: production, development.',
        format: '*',
        default: 'development',
        env: 'NODE_ENV'
    },
    sentry: {
        doc: 'Sentry url service',
        format: 'url',
        default: 'http://sentry.fireapps.io'
    },
})

const confFile = path.resolve(__dirname, `${process.env.NODE_ENV}.json`)

config.loadFile(path.resolve(__dirname, confFile))
config.validate({ allowed: 'strict' })

module.exports = config