const collections = require('../Config/collection');
const db = require('../Config/Connection');

module.exports={
addCandidate:(candidateData)=>
{

    return new Promise(async(resolve,reject)=>
    {
        let emailCheck = await db.get().collection(collections.CANDIDATE_COLLECTION).findOne({email:candidateData.email})
        console.log(emailCheck);
        if(emailCheck === null)
        {
            db.get().collection(collections.CANDIDATE_COLLECTION).insertOne(candidateData).then((res)=>
        {
            resolve(res)
        })
        }
        else
        {
            reject('Email already exist')
        }
        
    })
}

}