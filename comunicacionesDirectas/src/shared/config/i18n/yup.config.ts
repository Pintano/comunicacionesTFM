import * as yup from 'yup';

import { i18n } from './i18n.config';

//TODO:
export const translateWithParams =
  (key: string) =>
  (params?: { label: string; path: string }): string => {
    return i18n.t(key, {
      ...params,
      label: params?.label ? i18n.t(params.label) : params?.path,
    });
  };

export const traducirConParametros =
  (key: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (params: Record<string, any> = {}): string => {
    return i18n.t(key, {
      ...params,
      label: params?.label ? i18n.t(params.label) : params?.path,
    });
  };

yup.setLocale({
  mixed: {
    default: translateWithParams('shared.validations.mixed.default'),
    required: translateWithParams('shared.validations.mixed.required'),
    oneOf: translateWithParams('shared.validations.mixed.oneOf'),
    notOneOf: translateWithParams('shared.validations.mixed.notOneOf'),
    notType: translateWithParams('shared.validations.mixed.notType'),
  },
  string: {
    length: translateWithParams('shared.validations.string.length'),
    min: translateWithParams('shared.validations.string.min'),
    max: translateWithParams('shared.validations.string.max'),
    matches: translateWithParams('shared.validations.string.matches'),
    email: translateWithParams('shared.validations.string.email'),
    url: translateWithParams('shared.validations.string.url'),
    trim: translateWithParams('shared.validations.string.trim'),
    lowercase: translateWithParams('shared.validations.string.lowercase'),
    uppercase: translateWithParams('shared.validations.string.uppercase'),
  },
  number: {
    min: translateWithParams('shared.validations.number.min'),
    max: translateWithParams('shared.validations.number.max'),
    lessThan: translateWithParams('shared.validations.number.lessThan'),
    moreThan: translateWithParams('shared.validations.number.moreThan'),
    positive: translateWithParams('shared.validations.number.positive'),
    negative: translateWithParams('shared.validations.number.negative'),
    integer: translateWithParams('shared.validations.number.integer'),
  },
  date: {
    min: translateWithParams('shared.validations.date.min'),
    max: translateWithParams('shared.validations.date.max'),
  },
  array: {
    min: translateWithParams('shared.validations.array.min'),
    max: translateWithParams('shared.validations.array.max'),
  },
});
