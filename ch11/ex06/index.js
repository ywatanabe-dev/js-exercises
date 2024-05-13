export function isEmailAddress(address) {
  const pattern =
    /^(?!\.)(?!.*\.@)(?!.*\.\.)(?!.*@\.)(?!.*\.$)[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[0-9a-z.!#$%&'*+/=?^_`.{|}~-]{1,252}$/;
  return pattern.test(address);
}
