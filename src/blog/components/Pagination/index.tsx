import React, {useCallback} from 'react';

import {rgba} from 'polished';
import {FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight} from 'react-icons/fi';

import {centerAlignedChildren, CssProp, systemCss} from '@shared';
import {PageInfo} from '@src/blog/hooks';

const ICON_NODE_INFOS = {
  left: {
    first: <FiChevronsLeft />,
    prev: <FiChevronLeft />,
  },
  right: {
    next: <FiChevronRight />,
    last: <FiChevronsRight />,
  },
};

export interface PaginationProps {
  pageInfo: PageInfo;
  pageNums: number[];
  handlePageButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** 페이지네이션 버튼들 (without **List) */
const Pagination: React.FC<PaginationProps> = ({
  pageInfo,
  pageNums,
  handlePageButtonClick,
  ...props
}) => {
  const createItemNode = useCallback(
    (id: string, children: React.ReactNode, isIcon: boolean = false) => {
      const createInactiveButtonCss = () => {
        if (isIcon) {
          if (
            (['first', 'prev'].includes(id) && pageInfo.current === 1) ||
            (['next', 'last'].includes(id) && pageInfo.current === pageInfo.totalPage)
          ) {
            return disabledButtonCss;
          }
        }
        if (+id === pageInfo.current) {
          return currentdButtonCss;
        }
        return undefined;
      };

      const inactiveButtonCss = createInactiveButtonCss();
      return (
        <li key={id}>
          <button
            css={[buttonCss, inactiveButtonCss]}
            id={id}
            onClick={inactiveButtonCss ? undefined : handlePageButtonClick}
          >
            {children}
          </button>
        </li>
      );
    },
    [handlePageButtonClick, pageInfo],
  );

  return (
    <ul css={listCss} {...props}>
      {Object.entries(ICON_NODE_INFOS.left).map(([id, iconNode]) =>
        createItemNode(id, iconNode, true),
      )}
      {pageNums.map((num) => createItemNode(`${num}`, num))}
      {Object.entries(ICON_NODE_INFOS.right).map(([id, iconNode]) =>
        createItemNode(id, iconNode, true),
      )}
    </ul>
  );
};

export default Pagination;

const listCss: CssProp = systemCss({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  '& > * + *': {
    ml: '0.25rem',
  },
});

const buttonCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      border: `1px solid ${theme.colors.gray300}`,
      borderRadius: '0.125rem',
      minWidth: '2rem',
      height: '2rem',
      color: theme.colors.gray400,
      fontSize: theme.fontSizes.p14,

      '&:hover': {
        color: theme.colors.blue400,
        border: `1px solid ${theme.colors.blue300}`,
      },
    }),
];

const currentdButtonCss: CssProp = (theme) =>
  systemCss({
    '&, &:hover': {
      color: theme.colors.blue500,
      border: `1px solid ${theme.colors.blue400}`,
    },
  });

const disabledButtonCss: CssProp = (theme) =>
  systemCss({
    '&, &:hover': {
      cursor: 'not-allowed',
      color: rgba(theme.colors.gray400, 0.5),
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: rgba(theme.colors.gray300, 0.5),
    },
  });
