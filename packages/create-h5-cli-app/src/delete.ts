import chalk from 'chalk';
import consola from 'consola';
import { join } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { removeSync } from 'fs-extra';
import { CWD, GENERATOR_DIR } from './constant';
import Yeoman from 'yeoman-environment';
import Generator from 'yeoman-generator';

const PROMPTS = [
    {
        type: 'input',
        name: 'componentName',
        message: '请输入组件名（必须为英文）',
    }
];

export class DeleteGenerator extends Generator {
  inputs = {
      componentName: '',
  };

  constructor(name: string) {
      super([], {
          env: Yeoman.createEnv([], {
              cwd: join(CWD, name),
          }),
          resolved: GENERATOR_DIR,
      });
  }

  async prompting() {
      const dataString = readFileSync(join(__dirname, '../../../doc.config.json'), 'utf-8');
      const data = JSON.parse(dataString);

      return this.prompt<Record<string, string>>(PROMPTS).then(inputs => {
          const { componentName } = inputs;
          this.inputs.componentName = componentName;
          data.locales['zh-CN'].nav = data.locales['zh-CN'].nav.map((item:any) => {
              item.items = item.items.filter((component: any) => component.path !== componentName);
              return item;
          });
          const str = JSON.stringify(data, null, '\t');
          writeFileSync(join(__dirname, '../../../doc.config.json'), str);
      });
  }

  deleting() {
      const srcDir = join(__dirname, '../../../src');
      const files = readdirSync(srcDir);
      files.forEach(file => {
          if (file == this.inputs.componentName) {
              removeSync(join(srcDir, file));
          }
      });
      //   consola.info(`Creating project in ${join(CWD, this.inputs.componentName)}\n`);
  }

  end() {
      const { componentName } = this.inputs;
      consola.success(`Successfully deleted ${chalk.yellow(componentName)}.`);
  }
}
