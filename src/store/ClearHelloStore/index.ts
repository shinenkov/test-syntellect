import { action, makeObservable, override } from 'mobx';
import BaseInputStore from 'store/BaseInputStore';

class ClearHelloStore extends BaseInputStore {
  constructor() {
    super();
    makeObservable(this, {
      value: override,
      change: override,
      clear: action,
      hello: action,
    });
  }

  clear = () => (this.value = '');
  hello = () => (this.value = 'Hello world');
}

export default ClearHelloStore;
