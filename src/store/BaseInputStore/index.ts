import { action, makeObservable, observable } from 'mobx';

class BaseInputStore {
  value = '';

  constructor() {
    makeObservable(this, {
      change: action,
      value: observable,
    });
  }

  change(text: string) {
    this.value = text;
  }
}

export default BaseInputStore;
