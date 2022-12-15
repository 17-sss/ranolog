import Link from 'next/link';

import {CssProp, systemCss} from '@src/shared';

export interface ContentsIdData {
  id: string;
  text: string;
  nodeName: string;
  href: string;
  children: ContentsIdData[];
}

export interface ContentsIdListProps {
  contentsIds: ContentsIdData[];
}

const ContentsIdList: React.FC<ContentsIdListProps> = ({contentsIds, ...props}) => {
  return (
    <ul css={containerCss} {...props}>
      {contentsIds.map((data) => {
        return (
          <li key={data.id}>
            <Link href={data.href} passHref legacyBehavior>
              <a>{data.text}</a>
            </Link>
            {data.children.length > 0 && <ContentsIdList contentsIds={data.children} />}
          </li>
        );
      })}
    </ul>
  );
};

export default ContentsIdList;

const containerCss: CssProp = (theme) =>
  systemCss({
    ml: '0.75rem',
    color: theme.colors.gray500,
    '& > li + li': {
      mt: '0.2rem',
    },
  });
