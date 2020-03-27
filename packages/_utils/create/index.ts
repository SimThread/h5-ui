import { createBEM, BEM } from './bem';
import { createComponent } from './component';
// import { createI18N, Translate } from './i18n';

type CreateNamespaceReturn = [
  ReturnType<typeof createComponent>,
  BEM,
  // Translate
];

export function createNamespace(name: string): CreateNamespaceReturn {
    name = 'h5-' + name;
    return [createComponent(name), createBEM(name)];
}
