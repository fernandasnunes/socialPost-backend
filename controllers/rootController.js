


async function checkServer(payload) {
    try {
        
        let confirmMessage = 'Server Online!'
        return payload

    } catch (error) {
        throw(error)
    }
}

function checkServer() {
    return new Promise((resolve, reject) => {
        try {
            let confirmMessage = 'Server Online!'
            resolve(confirmMessage)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { 
    checkServer
}