import {useEffect, useCallback, useMemo, useRef, useState} from 'react';

import {rgba} from 'polished';
import {FiChevronDown} from 'react-icons/fi';

import {centerBetweenAlignChildren, absoluteOnParent, singleLineEllipsis} from '../../styles';
import {CssProp, systemCss} from '../../system';

export type ValueType = object | string | number | null;

export interface DropdownProps<TData extends ValueType> {
  value?: TData;
  options?: TData[];
  placeholder?: string;
  labelMapper: (value: TData) => React.ReactNode;
  rightAddonMapper?: (value: TData) => React.ReactNode;
  onChange?: (data: TData) => void;
}

const Dropdown = <TData extends ValueType>({
  value,
  placeholder,
  options = [],
  labelMapper,
  rightAddonMapper,
  onChange,
  ...rest
}: DropdownProps<TData>) => {
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState<TData | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);

  const displayValue = useMemo(() => {
    if (!data) {
      if (placeholder) {
        return <span css={placeholderCss}>{placeholder}</span>;
      }
      return null;
    }
    return labelMapper(data);
  }, [data, labelMapper, placeholder]);

  const isEmptyOptions = useMemo(() => {
    return options.length === 0;
  }, [options]);

  const handleToggleOpen = useCallback(() => {
    if (isEmptyOptions) {
      return;
    }
    setIsOpen((prev) => !prev);
  }, [isEmptyOptions]);

  const handleItemClick = useCallback(
    (selectedData: TData | null) => {
      setIsOpen(false);
      if (!selectedData) {
        return;
      }
      setData(selectedData);
      onChange?.(selectedData);
    },
    [onChange],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const refCurrent = dropdownButtonRef.current;
      if (!refCurrent || refCurrent.contains(e.target as Node | null)) {
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div css={containerCss} {...rest}>
      <button
        ref={dropdownButtonRef}
        css={[displayCss, isOpen && displayOpenCss, isEmptyOptions && displayNotAllowCss]}
        type="button"
        onClick={handleToggleOpen}
      >
        <div css={displayValueBoxCss}>{displayValue}</div>&nbsp;
        {isEmptyOptions || (
          <FiChevronDown css={[toggleButtonIconCss, isOpen && openToggleIconCss]} />
        )}
      </button>
      {isOpen && (
        <div css={optionWrapperCss}>
          {options.map((option, idx) => (
            <DropdownItemButton
              key={idx}
              label={labelMapper(option)}
              data={option}
              rightAddon={rightAddonMapper?.(option)}
              onClick={handleItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

// [1] Styles
const containerCss: CssProp = [
  centerBetweenAlignChildren,
  (theme) =>
    systemCss({
      display: 'inline-flex',
      position: 'relative',
      height: '3.125rem',
      color: theme.colors.gray600,
    }),
];

const displayCss: CssProp = [
  centerBetweenAlignChildren,
  (theme) =>
    systemCss({
      flexWrap: 'wrap',

      width: '100%',
      height: '100%',
      py: '0.75rem',
      px: '1rem',

      fontSize: theme.fontSizes.p16,
      backgroundColor: theme.colors.white,
      border: `1px solid ${theme.colors.gray300}`,
      borderRadius: '0.25rem',

      appearance: 'none',
    }),
];
const displayOpenCss: CssProp = (theme) =>
  systemCss({
    borderColor: rgba(theme.colors.gray400, 0.5),
  });
const displayNotAllowCss: CssProp = systemCss({cursor: 'not-allowed'});

const displayValueBoxCss: CssProp = [
  singleLineEllipsis,
  systemCss({
    flex: 1,
    textAlign: 'left',
  }),
];

const toggleButtonIconCss: CssProp = (theme) =>
  systemCss({
    fontSize: theme.fontSizes.p24,
    color: theme.colors.gray400,
    transition: 'transform 0.2s ease-in-out',
  });

const openToggleIconCss: CssProp = systemCss({
  transform: `rotate(180deg)`,
});

const optionWrapperCss: CssProp = [
  absoluteOnParent({
    top: `calc(3.125rem + 0.5rem)`,
    left: 0,
  }),
  (theme) =>
    systemCss({
      width: '100%',
      backgroundColor: theme.colors.white,
      border: `1px solid ${rgba(theme.colors.gray400, 0.5)}`,
      borderRadius: '0.25rem',
      zIndex: 1,
      maxHeight: '13.875rem',
      overflowY: 'auto',
    }),
];

const placeholderCss: CssProp = (theme) =>
  systemCss({
    color: rgba(theme.colors.gray600, 0.5),
  });

// NODES ===================================================================================

interface DropdownItemButtonProps<TData extends {} | ValueType> {
  data: TData;
  label: React.ReactNode;
  rightAddon?: React.ReactNode;
  onClick: (value: TData | null) => void;
}

const DropdownItemButton = <TData extends {} | ValueType>({
  data,
  label,
  rightAddon,
  onClick,
  ...props
}: DropdownItemButtonProps<TData>) => {
  const handleItemButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(data);
    },
    [data, onClick],
  );

  return (
    <button css={dropdownItemButtonCss} type="button" onClick={handleItemButtonClick} {...props}>
      <div css={singleLineEllipsis}>
        {label}
        {rightAddon}
      </div>
    </button>
  );
};

const dropdownItemButtonCss: CssProp = (theme) =>
  systemCss({
    width: '100%',
    py: '0.75rem',
    px: '1rem',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: theme.colors.slate100,
    },
  });
