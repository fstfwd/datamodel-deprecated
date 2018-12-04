/* global describe, it, beforeEach */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import PartialField from '../partial-field';
import { DimensionSubtype } from '../../enums';
import TemporalParser from '../parsers/temporal-parser';
import Temporal from './index';

describe('Temporal', () => {
    const schema = {
        name: 'Date',
        type: 'dimension',
        subtype: DimensionSubtype.TEMPORAL,
        format: '%Y-%m-%d',
        description: 'The is a test field',
        displayName: 'date'
    };
    const data = ['2017-03-01', '2017-03-02', '2017-03-03', '2018-01-06', '2019-11-07', '2017-03-01'];
    let temParser;
    let partField;
    let rowDiffset;
    let tempField;

    beforeEach(() => {
        temParser = new TemporalParser(schema);
        partField = new PartialField(schema.name, data, schema, temParser);
        rowDiffset = '0-2,5';
        tempField = new Temporal(partField, rowDiffset);
    });

    describe('#calculateDataDomain', () => {
        it('should return the field domain', () => {
            const expected = [
                new Date(2017, 3 - 1, 1).getTime(),
                new Date(2017, 3 - 1, 2).getTime(),
                new Date(2017, 3 - 1, 3).getTime()
            ];
            expect(tempField.calculateDataDomain()).to.eql(expected);
        });

        it('should ignore null data values', () => {
            const data1 = ['2017-03-01', '2017-03-02', '2017-03-03', '2018-01-06', '2019-11-07', null, '2017-03-02'];
            temParser = new TemporalParser(schema);
            partField = new PartialField(schema.name, data1, schema, temParser);
            rowDiffset = '1-2,4-5';
            tempField = new Temporal(partField, rowDiffset);

            const expected = [
                new Date(2017, 3 - 1, 2).getTime(),
                new Date(2017, 3 - 1, 3).getTime(),
                new Date(2019, 11 - 1, 7).getTime(),
            ];
            expect(tempField.calculateDataDomain()).to.eql(expected);
        });
    });

    describe('#minimumConsecutiveDifference', () => {
        it('should return the minimum diff', () => {
            const expected = 86400000;
            expect(tempField.minimumConsecutiveDifference()).to.equal(expected);
        });

        it('should return null if there is only one data item', () => {
            temParser = new TemporalParser(schema);
            partField = new PartialField(schema.name, data, schema, temParser);
            rowDiffset = '2';
            tempField = new Temporal(partField, rowDiffset);
            expect(tempField.minimumConsecutiveDifference()).to.be.null;
        });
    });

    describe('#format', () => {
        it('should return the field datetime format', () => {
            expect(tempField.format()).to.equal(schema.format);
        });
    });

    describe('#formattedData', () => {
        it('should return the formatted data', () => {
            const data1 = ['2017-03-01', '2017-03-02', '2017-03-03', '2018-01-06', '2019-11-07', null, '2017-03-02'];
            temParser = new TemporalParser(schema);
            partField = new PartialField(schema.name, data1, schema, temParser);
            rowDiffset = '1-2,4-5';
            tempField = new Temporal(partField, rowDiffset);

            const expected = ['2017-03-02', '2017-03-03', '2019-11-07', null];
            expect(tempField.formattedData()).to.eql(expected);
        });
    });
});
