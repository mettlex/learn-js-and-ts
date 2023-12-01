type User = {
  email: string;
  password: string;
};

export const fakeDb = new Map<string, User>();
