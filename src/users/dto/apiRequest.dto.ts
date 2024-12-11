export interface ApiRequest extends Request {
  user: {
    id: string;
    email?: string;
  };
}
