const collections = require('../Config/collection');
const db = require('../Config/Connection');

module.exports={
addCandidate:(candidateData)=>
{

    return new Promise((resolve,reject)=>
    {
        db.get().collection(collections.CANDIDATE_COLLECTION).insertOne(candidateData).then((res)=>
        {
            resolve(res)
        })
    })
}

}