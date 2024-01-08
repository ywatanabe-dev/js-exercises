export const convertLFtoCRLF = (input: string) =>
  input.replace(/(?<!\r)\n/g, "\r\n");

export const convertCRLFtoLF = (input: string) => input.replace(/\r\n/g, "\n");
