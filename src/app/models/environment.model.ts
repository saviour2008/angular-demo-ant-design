export interface Environment {
  production: boolean;
  authHeaderWhiteList: string[];
  apiUrl: {
    appbank: string;
  };
  network: {
    timeout: number;
  };
  logLevel: {
    console: string;
    server: string;
  };
  app?: {
    dummyPhoneNumber?: string;
    icReadStub?: boolean;
  };
  encryption?: {
    pubKeyFile?: string;
  };
}
