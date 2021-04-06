import { transformAsync } from '@babel/core';
import { readFileSync, removeSync, outputFileSync } from 'fs-extra';
import { replaceExt } from '../common';
import { replaceCssImport } from '../common/css';
import { BABEL_CONFIG_FILE } from '../common/constant';

export function compileJs(filePath: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
        let code = readFileSync(filePath, 'utf-8');

        code = replaceCssImport(code);

        transformAsync(code, { filename: filePath, configFile: BABEL_CONFIG_FILE })
            .then(result => {
                if (result) {
                    const jsFilePath = replaceExt(filePath, '.js');

                    removeSync(filePath);
                    outputFileSync(jsFilePath, result.code);
                    resolve();
                }
            })
            .catch(reject);
    });
}
