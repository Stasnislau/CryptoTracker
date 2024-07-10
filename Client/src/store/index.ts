import { makeAutoObservable } from "mobx";

export interface storeInterface {
  isLoading: boolean;
}
export default class Store {
  state: storeInterface;
  constructor() {
    this.state = {
      isLoading: false,
    };
    makeAutoObservable(this);
  }
}
