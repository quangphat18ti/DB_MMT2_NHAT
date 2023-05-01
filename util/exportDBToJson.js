const fs = require('fs');
const path = require('path')

const exportDBtoJSON = async (model, condition, sortCondition, quantity, field) => {
    console.log(`export ${model.collection.collectionName}`);
    console.log("condition: ", condition);

    let data = await model.find(condition, field)
        .limit(quantity)
        .sort(sortCondition);

    // data = data.slice(0, quantity);
    let result = JSON.stringify(data);
    return result;
}

module.exports = exportDBtoJSON;
