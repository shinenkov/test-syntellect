import { action, makeObservable, override } from 'mobx';
import BaseInputStore from 'store/BaseInputStore';
import { isNumber } from 'utils/isNumber';
import { isValid } from 'utils/isValid';

class AlertStore extends BaseInputStore {
  constructor() {
    super();
    makeObservable(this, {
      value: override,
      change: override,
      number: action,
      every: action,
    });
  }
  number = () => isNumber(this.value) && alert(this.value);

  every = () => isValid(this.value) && alert(this.value);
}

export default AlertStore;
