import { createElement, type ComponentType, type FunctionComponent } from 'react';
import * as runtime from 'react/jsx-runtime';

export async function renderMdx(
  compiledSource: string,
  components: Record<string, ComponentType<any>>
): Promise<ComponentType> {
  // The compiled MDX (outputFormat: 'function-body') accesses the runtime
  // via arguments[0], so we pass it as a single object argument.
  const fn = new Function(compiledSource);
  const result = fn(runtime);

  const MdxContent = result.default as FunctionComponent<{ components?: Record<string, ComponentType<any>> }>;

  // Return a wrapper component that passes components
  return function RenderedMdx() {
    return createElement(MdxContent, { components });
  };
}
