const fs = require('fs');
let chirps = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}

// This evaluates to see if 0.25 > Math.random(), which goes from 0 to 0.99999999
// That gives us about a 1 in 4 chance that an error should happen
const requestShouldBreak = () => {
    return 1 / 4 > Math.random();
};

let getChirps = () => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Database error - couldn't get chirps at this time")
        }else{
            resolve(Object.assign({}, chirps)); //create a copy and return it
        }
    })
}

let getChirp = id => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Database error - couldn't get chirp at this time")
        }else{
            return Object.assign({}, chirps[id]); //create a copy and return it
        }
    })
}

let createChirp = (chirp) => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Database error - couldn't create chirp at this time")
        }else{
            chirps[chirps.nextid++] = chirp;
            writeChirps();  
            resolve("Sucess! Chirp created")
        }
    })
};

let updateChirp = (id, chirp) => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Database error - couldn't edit chirp at this time")
        }else{
            chirps[id] = chirp;
            writeChirps();
            resolve("Sucess! Chirp updated")
        }
    })
}

let deleteChirp = id => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Database error - couldn't delete chirp at this time")
        }else{
            delete chirps[id];
            writeChirps();
            resolve("Sucess! Chirp deleted!")
        }
    })
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}