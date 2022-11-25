import {CssProp, systemCss} from '../../system';
import {theme} from '../../theme';

export interface DividerProps {
  color?: keyof typeof theme.colors;
  width?: string;
  dashed?: boolean;
  vertical?: boolean;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  color = 'gray300',
  width = '1px',
  dashed,
  vertical = false,
  children,
  ...props
}) => {
  return (
    <div
      css={[containerCss({color, width, dashed}), vertical && verticalContainerCss({color, width})]}
      {...props}
    >
      {children && <div css={contentCss}>{children}</div>}
    </div>
  );
};

export default Divider;

type DividerStyleProps = Pick<DividerProps, 'dashed'> &
  Required<Pick<DividerProps, 'color' | 'width'>>;

const containerCss: (styleProps: DividerStyleProps) => CssProp =
  ({color, dashed, width}) =>
  (theme) =>
    systemCss({
      display: 'flex',
      alignItems: 'center',
      '&:after, &:before': {
        flex: '1 1 auto',
        content: "''",
        display: 'block',
        minWidth: '2rem',
        borderTop: `${width} ${dashed ? 'dashed' : 'solid'}`,
        borderColor: theme.colors[color],
      },
    });

const verticalContainerCss: (styleProps: DividerStyleProps) => CssProp =
  ({color, width}) =>
  () =>
    systemCss({
      flexDirection: 'column',
      '&:after, &:before': {
        borderTop: 'none',
        borderLeft: `${width} solid`,
        minWidth: 'auto',
        borderColor: theme.colors[color],
      },
    });

const contentCss: CssProp = systemCss({
  flex: '0 1 auto',
  padding: '0 1rem',
  textAlign: 'center',
});
