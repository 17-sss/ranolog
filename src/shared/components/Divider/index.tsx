import {CssProp, systemCss} from '../../system';
import {theme} from '../../theme';

export interface DividerProps {
  color?: keyof typeof theme.colors | 'transparent';
  width?: string;
  height?: string;
  dashed?: boolean;
  vertical?: boolean;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  color = 'gray300',
  width = '1px',
  height,
  dashed,
  vertical = false,
  children,
  ...props
}) => {
  return (
    <div
      css={[
        containerCss({color, width, height, dashed}),
        vertical && verticalContainerCss({color, width}),
      ]}
      {...props}
    >
      {children && <div css={contentCss}>{children}</div>}
    </div>
  );
};

export default Divider;

type DividerStyleProps = Pick<DividerProps, 'height' | 'dashed'> &
  Required<Pick<DividerProps, 'color' | 'width'>>;

const containerCss: (styleProps: DividerStyleProps) => CssProp = ({
  color,
  dashed,
  width,
  height,
}) => [
  (theme) => {
    const colors = {...theme.colors, transparent: 'transparent'};
    return systemCss({
      display: 'flex',
      alignItems: 'center',
      '&:after, &:before': {
        flex: '1 1 auto',
        content: "''",
        display: 'block',
        minWidth: '2rem',
        borderTop: `${width} ${dashed ? 'dashed' : 'solid'}`,
        borderColor: colors[color],
      },
    });
  },
  height && systemCss({height: height}),
];

const verticalContainerCss: (styleProps: DividerStyleProps) => CssProp =
  ({color, width}) =>
  (theme) => {
    const colors = {...theme.colors, transparent: 'transparent'};
    return systemCss({
      flexDirection: 'column',
      '&:after, &:before': {
        borderTop: 'none',
        borderLeft: `${width} solid`,
        minWidth: 'auto',
        borderColor: colors[color],
      },
    });
  };

const contentCss: CssProp = systemCss({
  flex: '0 1 auto',
  padding: '0 1rem',
  textAlign: 'center',
});
