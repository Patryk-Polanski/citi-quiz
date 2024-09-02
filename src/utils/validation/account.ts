export const checkIfEmpty = (value: string | undefined) => {
  if (!value) return true;
  return false;
};

export const checkIfNotIdentical = (
  firstValue: string | undefined,
  secondValue: string | undefined,
) => {
  if (firstValue !== secondValue) return true;
  return false;
};
