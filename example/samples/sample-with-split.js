/* eslint-disable */

const DataModel = window.DataModel;
let dm;

d3.json('./data/cars.json', (data) => {
    const jsonData = data,
        schema = [{
            name: 'Name',
            type: 'dimension'
        }, {
            name: 'Miles_per_Gallon',
            type: 'measure',
            unit : 'cm',
            scale: '1000',
            numberformat: '12-3-3'
        }, {
            name: 'Cylinders',
            type: 'dimension'
        }, {
            name: 'Displacement',
            type: 'measure'
        }, {
            name: 'Horsepower',
            type: 'measure'
        }, {
            name: 'Weight_in_lbs',
            type: 'measure',
        }, {
            name: 'Acceleration',
            type: 'measure'
        }, {
            name: 'Year',
            type: 'dimension',
            subtype: 'temporal',
            format: '%Y-%m-%d'
            
        }, {
            name: 'Origin',
            type: 'dimension'
        }];
    window.datamodel = new DataModel(jsonData, schema);

    const splitDms = datamodel.splitByRow(['Year']);
    console.log(splitDms);


    const splitDmsMultipleDimensions = datamodel.splitByRow(['Year', 'Cylinders']);
    console.log(splitDmsMultipleDimensions);

    const dmWithCondition =   datamodel.splitByRow(['Origin', 'Cylinders'], (fields)=>fields.Cylinders.value !== '6');
    console.log(dmWithCondition);

    const dmWithConditionInverse =   datamodel.splitByRow(['Origin', 'Cylinders'], (fields)=>fields.Cylinders.value !== '6', {mode: undefined});
    console.log(dmWithConditionInverse);
    const dmWithConditionInverse2 =   datamodel.select( (fields)=>fields.Cylinders.value !== '6', {mode: undefined});
    console.log(dmWithConditionInverse2);

    const projectDm = datamodel.splitByColumn([['Acceleration'], ['Horsepower']], ['Origin']);
    console.log(projectDm);


    const compose = window.DataModel.Operators.compose;
    const splitByRow = window.DataModel.Operators.splitByRow;

});
