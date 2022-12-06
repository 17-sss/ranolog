import {useMemo} from 'react';

import {CssProp, Divider, MarkdownRenderer, ProjectDocument, systemCss} from '@src/shared';

import ProjectInfo, {ProjectInfoProps} from '../ProjectInfo';

export interface ProjectDetailProps {
  projectDoc: ProjectDocument;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({projectDoc, ...props}) => {
  const infoCardProps: ProjectInfoProps = useMemo(() => {
    const {category, date, subject, thumbnail, links, skills, summary} = projectDoc;
    return {category, date, subject, thumbnail, links, skills, summary};
  }, [projectDoc]);

  return (
    <div css={containerCss} {...props}>
      <ProjectInfo {...infoCardProps} />
      <Divider css={dividerCss} />
      <MarkdownRenderer css={markdownRendererCss} content={projectDoc.content} />
    </div>
  );
};

export default ProjectDetail;

const containerCss: CssProp = systemCss({});

const dividerCss: CssProp = systemCss({
  py: '2rem',
});

const markdownRendererCss: CssProp = systemCss({
  pb: '1.5rem',
});
