require('dotenv').config()

const https = require('https');
const env = process.env

const API_KEY = '&key=' + env.API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet'
const CHANNEL_ID = '&id=' + env.CHANNEL_ID
const URL = BASE_URL + CHANNEL_ID + API_KEY

https.get(URL, (res) => {
    let body = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
        body += chunk
    })
    res.on('end', (res) => {
        res = JSON.parse(body);
        const totalViewCount = res.items[0].statistics.viewCount
        const channelName = res.items[0].snippet.title
        const message = '今日までの「' + channelName + '」の総再生回数は' + totalViewCount + 'です。'
        console.log(message);
    })
}).on('error', (e) => {
    console.log(+ e.message)
});