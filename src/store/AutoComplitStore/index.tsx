import {
  action,
  makeObservable,
  observable,
  override,
  runInAction,
} from 'mobx';
import { CountryInfo, getCountryByName } from 'shared/api/apiService';
import BaseInputStore from 'store/BaseInputStore';

class AutoComplitStore extends BaseInputStore {
  hints: CountryInfo[] = [];
  error: string | null = null;
  isLoading = false;

  constructor() {
    super();
    makeObservable(this, {
      value: override,
      change: override,
      hints: observable,
      load: action,
      clearHints: action,
    });
  }

  clearHints = () => (this.hints = []);

  async load(value: string, max: number) {
    try {
      this.isLoading = true;
      const result = await getCountryByName(value);
      runInAction(() => {
        this.hints = result.slice(0, max);
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = (err as Error).message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default AutoComplitStore;
