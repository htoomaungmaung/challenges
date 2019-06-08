// @flow

export const initialState = {
  totalAmount : 0,
  currency : '',
  charities: [],
};

type charity = {
  name: string,
  totalDonation: number,
  currency: string,
  image: string,
  id: any
}

export type State = {
  totalAmount: number,
  currency : string,
  charities: Array<charity>
}