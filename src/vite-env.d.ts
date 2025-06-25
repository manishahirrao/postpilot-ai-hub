/// <reference types="vite/client" />
/// <reference types="@sentry/react" />

// Add type declarations for JSX
import * as React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  // This allows TypeScript to understand our custom elements
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // Add any custom HTML attributes here
      'data-testid'?: string;
    }
  }
}

// Add module declarations for CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Add module declarations for SVG imports
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_API_BASE_URL: string;
    // Add other environment variables here
  }
}

// This allows TypeScript to understand the import.meta.env object
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENVIRONMENT: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
