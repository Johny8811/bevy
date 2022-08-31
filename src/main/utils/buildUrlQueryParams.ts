type Param = {
  param: string;
  value: string | number | boolean;
};
export type ParamsList = (Param | undefined)[];

// TODO: add test
export const buildUrlQueryParams = (paramsList: ParamsList) =>
  paramsList
    .filter((v): v is Param => !!v)
    .reduce((result, param) => {
      const isResultEmpty = result.length !== 0;
      return `${result}${isResultEmpty ? '&' : ''}${param.param}=${param.value}`;
    }, '');
