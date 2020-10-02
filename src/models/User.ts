export interface User {
  ID: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  EmailUpdates: boolean;
  AdvancedView: boolean;
  [key: string] : boolean | string;
}
