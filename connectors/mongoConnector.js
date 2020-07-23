const mongoose = require('mongoose')

/* -------------------mongoConnect----------------------
Responsible for create a mongo connection based on its
credentials
------------------------------------------------------*/


// async function mongoConnect() {
//     try {
//         try {
//             mongoose.connect(process.env.uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
//             console.log("connected"));    
//             }catch (error) { 
//             console.log("could not connect");    
//             }

//     } catch (error) {
//         throw (error)
//     }
// }

// module.exports = {
//     mongoConnect: mongoConnect
// }


/* -------------------mongoConnect----------------------
Responsible for create a mongo connection based on its
credentials
------------------------------------------------------*/
async function mongoConnect() {
    try {
        mongoose.connect(process.env.uri, {
                                    
            useNewUrlParser: true,
            
            useUnifiedTopology: true,
        }).catch(err => {
            throw new Error(err)
        })

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', console.log.bind(console, 'Mongo ready'))

    } catch (error) {
        throw (error)
    }
}

module.exports = {
    mongoConnect: mongoConnect
}

