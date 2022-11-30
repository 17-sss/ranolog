import {rgba} from 'polished';
import {FiSearch} from 'react-icons/fi';

import {CssProp, systemCss} from '@src/shared';

export interface SearchBarProps {
  placeholder?: string;
  registerInput: (element?: HTMLInputElement | null) => void;
  onInputKeyUp: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
}

/** 검색바, 제목을 기준으로만 검색. */
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '검색어를 입력해주세요.',
  registerInput,
  onInputKeyUp,
  ...props
}) => {
  return (
    <div css={containerCss} {...props}>
      <input
        css={inputCss}
        type="text"
        placeholder={placeholder}
        onKeyUp={onInputKeyUp}
        ref={registerInput}
      />
      <FiSearch css={searchIconCss} />
    </div>
  );
};

export default SearchBar;

const containerCss: CssProp = (theme) =>
  systemCss({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    px: '1rem',

    borderRadius: '0.25rem',
    border: `1px solid ${theme.colors.gray300}`,
  });

const inputCss: CssProp = (theme) =>
  systemCss({
    width: '100%',
    height: '100%',
    color: theme.colors.gray600,
    '&::placeholder': {
      color: rgba(theme.colors.gray600, 0.5),
    },
  });

const searchIconCss: CssProp = (theme) =>
  systemCss({
    color: rgba(theme.colors.gray400, 0.7),
    fontSize: theme.fontSizes.p20,
    minWidth: '1.25rem',
  });
