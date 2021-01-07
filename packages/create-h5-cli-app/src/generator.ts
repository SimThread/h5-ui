import chalk from 'chalk';
import consola from 'consola';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { CWD, GENERATOR_DIR } from './constant';
import Yeoman from 'yeoman-environment';
import Generator from 'yeoman-generator';
import { exec } from 'child_process';
import uppercamelize from 'uppercamelcase';

const TEMPLATES = join(GENERATOR_DIR, 'templates');
const PROMPTS = [
    {
        name: 'componentType',
        message: '选择组件类型',
        type: 'list',
        choices: ['Less', 'Sass'],
    },
    {
        type: 'input',
        name: 'componentName',
        message: '请输入组件名（必须为英文）',
    },
    {
        type: 'input',
        name: 'zh',
        message: '请输入组件中文名',
    },
];

export class VanGenerator extends Generator {
  inputs = {
      name: '',
      componentType: '',
      componentName: '',
      zh: ''
  };

  constructor(name: string) {
      super([], {
          env: Yeoman.createEnv([], {
              cwd: join(CWD, name),
          }),
          resolved: GENERATOR_DIR,
      });

      this.inputs.name = name;
  }

  async prompting() {
      const dataString = readFileSync(join(__dirname, '../../../doc.config.json'), 'utf-8');
      const data = JSON.parse(dataString);
      //   console.log('readFileSync generator data:', data);
      const types = data.locales['zh-CN'].nav.map(item => item.title);
      //   console.log('types:', types);
      PROMPTS[0].choices = types;

      return this.prompt<Record<string, string>>(PROMPTS).then(inputs => {
          const { componentType, componentName, zh } = inputs;
          this.inputs.componentType = componentType;
          this.inputs.componentName = componentName;
          this.inputs.zh = zh;
          data.locales['zh-CN'].nav = data.locales['zh-CN'].nav.map(item => {
              if (item.title == componentType) {
                  item.items.push({
                      path: componentName,
                      title: `${uppercamelize(componentName)} ${zh}`
                  });
              }

              return item;
          });

          //   console.log('zh nav:', data.locales['zh-CN'].nav);

          const str = JSON.stringify(data, null, '\t');
          writeFileSync(join(__dirname, '../../../doc.config.json'), str);

          //   const cssLang = preprocessor === 'sass' ? 'scss' : preprocessor;

          //   this.inputs.cssLang = cssLang;
          //   this.inputs.preprocessor = preprocessor;
      });
  }

  writing() {
      consola.info(`Creating project in ${join(CWD, this.inputs.componentName)}\n`);

      const copyTpl = (from: string, to?: string) => {
          this.fs.copyTpl(
              join(TEMPLATES, from),
              this.destinationPath(to || from),
              this.inputs
          );
      };

      copyTpl('component/**/*', join(__dirname, `../../../src/${this.inputs.componentName}`));
  }

  generateEntry() {
      exec('npm run build:entry', (error, stdout, stderr) => {
          console.log('stdout:', stdout);
      });
  }

  end() {
      const { componentName } = this.inputs;
      consola.success(`Successfully created ${chalk.yellow(componentName)}.`);
  }
}
