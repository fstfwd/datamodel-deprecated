/* global describe, it */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FieldType } from 'picasso-util';
import DiscreteMeasure from './discreteMeasure';

describe('Measure Field Subtype', () => {
    const schema = {
        name: 'Miles_per_Gallon',
        type: FieldType.MEASURE,
        subtype: 'discrete',
        unit: 'cm',
        scale: '1000',
        numberformat: '12-3-3',
        description: 'This is description',
        defAggFn: () => {}
    };

    let measure = new DiscreteMeasure('', [], schema, {});
    describe('Discrete Field', () => {
        let result = measure.parse(null);
        it('should parse null value to empty string', () => {
            expect(result).to.equal('');
        });
    });
});
