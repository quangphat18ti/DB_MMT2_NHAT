const fs = require('fs');
const path = require('path')

const exportDBtoJSON = async (model, sortCondition, quantity = null) => {
    console.log(`export ${model.collection.collectionName}`);
    let data = await model.find({}).sort(sortCondition);
    quantity = quantity ? quantity : data.length;

    data = data.slice(0, quantity);
    let result = JSON.stringify(data);
    return result;
}

module.exports = exportDBtoJSON;
