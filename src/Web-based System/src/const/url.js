const host = window.location.host
const mapHost = {
    'localhost': 'xxxx'
}
const REQ_URL = mapHost[host]
export {
    REQ_URL
}