export type ErrorKvResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type GetKvResponse = {
  value: string | null;
};
