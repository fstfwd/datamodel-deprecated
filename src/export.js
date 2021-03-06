import DataModel from './datamodel';
import {
  compose,
  bin,
  select,
  project,
  groupby as groupBy,
  calculateVariable,
  sort,
  crossProduct,
  difference,
  naturalJoin,
  leftOuterJoin,
  rightOuterJoin,
  fullOuterJoin,
  union,
  rowDiffsetIterator
} from './operator';
import * as Stats from './stats';
import * as enums from './enums';
import { DataConverter } from './converter';
import { DateTimeFormatter } from './utils';
import { DataFormat, FilteringMode, DM_DERIVATIVES } from './constants';
import InvalidAwareTypes from './invalid-aware-types';
import pkg from '../package.json';
import * as FieldsUtility from './fields';

const Operators = {
    compose,
    bin,
    select,
    project,
    groupBy,
    calculateVariable,
    sort,
    crossProduct,
    difference,
    naturalJoin,
    leftOuterJoin,
    rightOuterJoin,
    fullOuterJoin,
    union,
    rowDiffsetIterator
};

const version = pkg.version;
Object.assign(DataModel, {
    Operators,
    Stats,
    DM_DERIVATIVES,
    DateTimeFormatter,
    DataFormat,
    FilteringMode,
    InvalidAwareTypes,
    version,
    DataConverter,
    FieldsUtility
}, enums);

export default DataModel;
