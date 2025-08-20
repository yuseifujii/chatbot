export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string
        'publishable-key': string
        [key: string]: any
      }
    }
  }
}


