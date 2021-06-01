const collections = require('../Config/collection');
const db = require('../Config/Connection');

module.exports={
    addScore:(testData)=>
    {
        return new Promise(async(resolve,reject)=>
        {
            let emailCheck = await db.get().collection(collections.TEST_SCORE_COLLECTION).findOne({email:testData.email})
            let emailCandidate = await db.get().collection(collections.CANDIDATE_COLLECTION).findOne({email:testData.email})
            let total = testData.test1+testData.test2+testData.test3 ;
            if(emailCandidate !== null)
            {
                db.get().collection(collections.CANDIDATE_COLLECTION).updateOne({email:testData.email},{$set:{'total_score':total}})
            }

            console.log(testData.test1+testData.test2+testData.test3);
            if(emailCheck === null)
            {
                db.get().collection(collections.TEST_SCORE_COLLECTION).insertOne(testData).then((res)=>
            {
                resolve(res);
            })
            }
            else
            {
                reject('Score already added');
            }

            
        })
    },

    getScores : ()=>
    {
        return new Promise(async(resolve,reject)=>
        {
            let value = {
                highest:null,
                average:{

                }
            };
            try
            {
                value.highest = await db.get().collection(collections.CANDIDATE_COLLECTION).find().sort({total_score:-1}).limit(1).toArray()
            }
            catch(err)
            {
                console.log(err);
            }

            let sum = await db.get().collection(collections.TEST_SCORE_COLLECTION).aggregate(
                [
                    {
                        $group:{
                            _id:null,
                            totalTest1:{$sum:"$test1"},
                            totalTest2:{$sum:"$test2"},
                            totalTest3:{$sum:"$test3"},
                            count:{$sum:1}
                        }
                    }
                ]
            ).toArray()
            if(sum.length !== 0)
            {
                value.average={
                    test1Avg:sum[0].totalTest1/sum[0].count,
                    test2Avg:sum[0].totalTest2/sum[0].count,
                    test3Avg:sum[0].totalTest3/sum[0].count,
                }
            }
            resolve(value);
                   
         }).catch((err)=>
         {
             reject(err);
         })
    }
}