import {useState} from 'react';

import {FiSearch} from 'react-icons/fi';

import {CssProp, debounce, systemCss} from '@shared';

export interface SearchBarProps {
  onSearch: (value: string) => void;
}

/** 검색바, 제목을 기준으로만 검색. */
const SearchBar: React.FC<SearchBarProps> = ({onSearch, ...props}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputKeyUp = debounce<[e?: React.KeyboardEvent<HTMLInputElement>]>({
    func: (e) => {
      if (!e || !(e.target instanceof HTMLInputElement)) {
        return;
      }
      const value = e.target.value;
      setSearchValue(value);
      onSearch(value);
    },
  });

  return (
    <div css={containerCss} {...props}>
      <input css={inputCss} type="text" onKeyUp={handleInputKeyUp} />
      <button css={submitButtonCss} onClick={() => onSearch(searchValue)}>
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;

const containerCss: CssProp = (theme) =>
  systemCss({
    display: 'flex',
    alignItems: 'center',
    px: '1.5rem',
    py: '1rem',
    borderRadius: '50px',
    border: `2px solid ${theme.colors.gray300}`,
  });

const inputCss: CssProp = (theme) =>
  systemCss({
    width: '100%',
    color: theme.colors.gray600,
  });

const submitButtonCss: CssProp = (theme) =>
  systemCss({
    fontSize: theme.fontSizes.p20,
    color: theme.colors.gray400,
    minWidth: '1.25rem',
  });
