import {Fragment, useMemo} from 'react';

import {CssProp, CustomLink, ResumeDocument, systemCss, Typography} from '@src/shared';

export interface ResumeInfoProps
  extends Pick<ResumeDocument, 'name' | 'job' | 'subject' | 'email' | 'introduce'> {}

const ResumeInfo: React.FC<ResumeInfoProps> = ({
  name,
  job,
  subject,
  email,
  introduce,
  ...props
}) => {
  const introduceTextNodes = useMemo(() => {
    if (!introduce) {
      return;
    }
    if (typeof introduce === 'string') {
      return [<span key={0}>{introduce}</span>];
    }
    const totalLength = introduce.length;
    return introduce.map((text, idx) => (
      <Fragment key={idx}>
        <span>{text}</span>
        {totalLength - 1 > idx && <br />}
      </Fragment>
    ));
  }, [introduce]);

  return (
    <div css={containerCss} {...props}>
      <div>
        <Typography variant="h1">{name}</Typography>
        <Typography variant="p" color="gray">
          {job}
        </Typography>
        {email && (
          <CustomLink href={`mailto:${email}`}>
            <Typography color="gray" fontSize="p14">
              {email}
            </Typography>
          </CustomLink>
        )}
      </div>
      {introduceTextNodes && (
        <Typography variant="p" color="gray500" fontSize="p14">
          {introduceTextNodes}
        </Typography>
      )}
    </div>
  );
};

export default ResumeInfo;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '1rem',
  },
});
