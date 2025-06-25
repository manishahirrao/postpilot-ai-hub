import * as React from 'react';
import { PageLayout, type PageLayoutProps } from '../layouts/PageLayout';
import { FadeIn } from '../animations/FadeIn';

type OmitPageLayoutProps = Omit<PageLayoutProps, 'children'>;

interface UpdatePageOptions extends OmitPageLayoutProps {}

/**
 * Wraps a page component with the PageLayout and FadeIn animation
 * @param PageComponent The page component to wrap
 * @param options Page layout options
 * @returns A new component with the page layout and animation applied
 */
export function updatePage<T extends Record<string, unknown>>(
  PageComponent: React.ComponentType<T>,
  options: UpdatePageOptions = {}
): React.FC<T> {
  const {
    title,
    description,
    withContainer = true,
    withPadding = true,
    className = '',
  } = options;

  const UpdatedPage: React.FC<T> = (props) => (
    <PageLayout
      title={title}
      description={description}
      withContainer={withContainer}
      withPadding={withPadding}
      className={className}
    >
      <FadeIn>
        <PageComponent {...props} />
      </FadeIn>
    </PageLayout>
  );

  UpdatedPage.displayName = `withPageLayout(${PageComponent.displayName || PageComponent.name || 'Component'})`;
  return UpdatedPage;
}

interface CreatePageOptions extends OmitPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Creates a new page with the standard layout and animation
 * @param props Page layout options and children
 * @returns A new page with the layout and animation applied
 */
export function createPage({
  children,
  ...props
}: CreatePageOptions): React.ReactElement {
  return (
    <PageLayout {...props}>
      <FadeIn>{children}</FadeIn>
    </PageLayout>
  );
}
