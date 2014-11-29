require! 'moment'

module.exports = {
    tomorrow: -> moment().add(1, 'day').startOf('day')
}

