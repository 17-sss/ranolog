import {CssProp, CustomLink, systemCss} from '@src/shared';

export interface TableContentItem {
  id: string;
  text: string;
  nodeName: string;
  href: string;
  children: TableContentItem[];
}

export interface TableContentsProps {
  contentItems: TableContentItem[];
}

const TableContents: React.FC<TableContentsProps> = ({contentItems, ...props}) => {
  return (
    <ul css={containerCss} {...props}>
      {contentItems.map((item) => {
        return (
          <li key={item.id}>
            <CustomLink href={item.href}>{item.text}</CustomLink>
            {item.children.length > 0 && <TableContents contentItems={item.children} />}
          </li>
        );
      })}
    </ul>
  );
};

export default TableContents;

const containerCss: CssProp = (theme) =>
  systemCss({
    ml: '0.75rem',
    color: theme.colors.gray500,
    '& > li + li': {
      mt: '0.2rem',
    },
  });
