export const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return "*".repeat(name.length) + "@" + domain;
  }

  const first = name.slice(0, 1);
  const last = name.slice(-1);
  const masked = "*".repeat(name.length - 2);

  return `${first}${masked}${last}@${domain}`;
};