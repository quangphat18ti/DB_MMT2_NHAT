const exportDBtoJSON = async (model, condition, sortCondition, quantity, field) => {
    console.log(`export ${model.collection.collectionName}`);
    console.log("condition: ", condition);

    let data = await model.find(condition, field)
        .maxTime(100000)
        .limit(quantity)
        .sort(sortCondition);

    let result = JSON.stringify(data);
    return result;
}

module.exports = exportDBtoJSON;
