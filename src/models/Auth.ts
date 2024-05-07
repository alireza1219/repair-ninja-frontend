export type TokenCreation = {
  refresh: string;
  access: string;
};

export type TokenRenewal = {
  access: string;
};

export type OtpRequestResponse = {
  message: string;
};
