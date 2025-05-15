import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import AutoComplitStore from 'store/AutoComplitStore';
import { useDebounce } from 'hooks/useDebounce';
import Control from 'shared/Control';
import Loading from 'shared/Loading';
import styles from './styles.module.css';

type AutoComplitProps = {
  max: number;
};

const AutoComplit = observer((props: AutoComplitProps) => {
  const { max } = props;
  const [countriesStore] = useState(() => new AutoComplitStore());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadCountries = useCallback(
    (value: string, maxItems: number) => {
      countriesStore.load(value, maxItems);
    },
    [countriesStore]
  );

  const debouncedLoad = useDebounce(loadCountries, 300);

  useEffect(() => {
    debouncedLoad(countriesStore.value, max);
  }, [countriesStore.value, debouncedLoad, max]);

  useEffect(() => {
    const hasHints = countriesStore.hints.length > 0;
    const hasValue = Boolean(countriesStore.value);
    const isExactMatch =
      hasHints &&
      countriesStore.hints.some(
        (hint) =>
          hint.fullName.toLowerCase() === countriesStore.value.toLowerCase()
      );
    if (hasHints && hasValue && !isExactMatch) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [countriesStore.hints, countriesStore.value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleFocus = useCallback(() => {
    if (countriesStore.value) {
      debouncedLoad(countriesStore.value, max);
    }
  }, [countriesStore.value, debouncedLoad, max]);

  const handleChange = useCallback(
    (value: string) => {
      countriesStore.change(value);
      if (!value) {
        setIsOpen(false);
        countriesStore.clearHints();
      }
    },
    [countriesStore]
  );

  const handleChooseCountry = useCallback(
    (fullName: string) => {
      countriesStore.change(fullName);
      countriesStore.clearHints();
      setIsOpen(false);
    },
    [countriesStore]
  );

  const controlProps = useMemo(
    () => ({
      value: countriesStore.value,
      label: 'AutoComplit Country',
      role: 'combobox',
      'aria-label': 'Search countries',
      'aria-describedby': 'search-description',
      'aria-expanded': isOpen,
      'aria-controls': 'search-listbox',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value),
      onFocus: handleFocus,
      onBlur: () => {
        setTimeout(() => {
          if (!containerRef.current?.contains(document.activeElement)) {
            setIsOpen(false);
          }
        }, 300);
      },
    }),
    [countriesStore.value, isOpen, handleFocus, handleChange]
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <Control {...controlProps} />

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {countriesStore.isLoading ? (
            <li className={styles.loading}>
              <Loading />
            </li>
          ) : (
            countriesStore.hints.map((item) => (
              <li
                role="option"
                aria-selected={item.fullName === countriesStore.value}
                onClick={() => handleChooseCountry(item.fullName)}
                className={styles.country}
                key={item.name}
              >
                <img src={item.flag} alt={item.name} loading="lazy" />
                <span>{`${item.name}, ${item.fullName}`}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
});

export default AutoComplit;
