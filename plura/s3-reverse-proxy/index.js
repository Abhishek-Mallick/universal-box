const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const PORT = 8000;

const BASE_PATH = 'https://plura.s3.ap-south-1.amazonaws.com/__output'

const proxy = httpProxy.createProxy()

// user requests at a1.localhost:8000
app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    /*
        Example obj link -> https://plura.s3.ap-south-1.amazonaws.com/__output/p6/index.html
        const part till __output can be the bucket name
    */
    const resolvesTo = `${BASE_PATH}/${subdomain}`
    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })
})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if(url === '/' ) // that is no file path is specified
        proxyReq.path += 'index.html'
})

app.listen(PORT, () => console.log(`Reverse Proxy Running .. ${PORT}`))