export const valueOrDash = <T>(value: T | undefined | null, cb?: (value: T) => any) => {
  if (value && cb) {
    return cb(value);
  }

  return value || '-';
};
