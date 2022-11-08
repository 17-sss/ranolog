export type StyledSystemValues = Array<string | number | null | undefined>;
/**
 * Styled System의 반응형 배열 값내에서 null, undefined가 아닌 최근의 값을 찾아 반환
 * - standardIdx가 있다면 이 값이 감소하며 null, undefined가 아닌 최근의 값을 찾아 반환
 */
export const findPrevStyledValue = (styledValues: StyledSystemValues, standardIdx?: number) => {
  let result = null;
  const cloneValues =
    typeof standardIdx !== 'undefined' ? styledValues.slice(0, standardIdx + 1) : [...styledValues];
  while (cloneValues.length !== 0) {
    const popValue = cloneValues.pop();
    if (popValue === null || popValue === undefined) {
      continue;
    }
    result = popValue;
    break;
  }
  return result;
};
