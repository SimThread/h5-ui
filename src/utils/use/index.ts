import useBem from './bem';
import useSfc from './sfc';

type UseReturn = [
  ReturnType<typeof useSfc>,
  ReturnType<typeof useBem>,
];

/**
 * 返回符合命名规范的函数
 */
export function use(name: string): UseReturn {
    name = 'h5-' + name;
    return [useSfc(name), useBem(name)];
}
