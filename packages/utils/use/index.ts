import useBem from './bem';
import useSfc from './sfc';
import useI18n from './i18n';

type UseReturn = [
  ReturnType<typeof useSfc>,
  ReturnType<typeof useBem>,
  ReturnType<typeof useI18n>
];

/**
 * 返回符合命名规范的函数
 */
export function use(name: string): UseReturn {
  name = 'h5-' + name;
  return [useSfc(name), useBem(name), useI18n(name)];
}
