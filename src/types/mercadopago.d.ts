interface MercadoPagoCardFormData {
  token: string;
  payment_method_id: string;
  issuer_id: string;
  installments: number;
  cardholderName: string;
  identificationType: string;
  identificationNumber: string;
}

interface MercadoPagoCardForm {
  getCardFormData: () => MercadoPagoCardFormData;
  unmount: () => void;
}

interface MercadoPagoInstance {
  cardForm: (config: {
    amount: string;
    iframe: boolean;
    form: {
      id: string;
      cardNumber: { id: string; placeholder: string };
      expirationDate: { id: string; placeholder: string };
      securityCode: { id: string; placeholder: string };
      cardholderName: { id: string; placeholder: string };
      identificationType: { id: string };
      identificationNumber: { id: string; placeholder: string };
      installments: { id: string };
    };
    callbacks: {
      onFormMounted?: (error?: any) => void;
      onSubmit?: (event: Event) => void;
      onFetching?: (resource: string) => void;
    };
  }) => MercadoPagoCardForm;
}

interface Window {
  MercadoPago: new (publicKey: string, options?: { locale?: string }) => MercadoPagoInstance;
}
