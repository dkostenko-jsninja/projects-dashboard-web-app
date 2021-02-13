export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Request = {
  method: RequestMethod;
  headers: { [key: string]: string };
  body?: string;
};

export type FormField = {
  required: boolean;
  type: string;
  inputType: string;
  name: string;
  label: string;
  placeholder: string;
  selectValues: string[];
};
