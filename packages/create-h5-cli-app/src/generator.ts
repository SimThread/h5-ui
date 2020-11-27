import chalk from 'chalk';
import consola from 'consola';
import { join } from 'path';
import { readFileSync } from 'fs';
import { CWD, GENERATOR_DIR } from './constant';
import Yeoman from 'yeoman-environment';
import Generator from 'yeoman-generator';
import { exec } from 'child_process';
import Module from 'module';

const TEMPLATES = join(GENERATOR_DIR, 'templates');
const PROMPTS = [
    {
        name: '所属类别',
        message: '选择类型',
        type: 'list',
        choices: ['Less', 'Sass'],
    },
];

export class VanGenerator extends Generator {
  inputs = {
      name: '',
      cssLang: '',
      preprocessor: '',
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
      const data = readFileSync(join(__dirname, '../../../docs/src/doc.config.js'), 'utf-8');
      const myModule = new Module('my-module');
      const jsCode = data;
      // eslint-disable-next-line no-underscore-dangle
      myModule._compile(jsCode, 'my-module');
      const json = myModule.exports;
      const types = json.site.locales['zh-CN'].nav.map(item => item.name);
      PROMPTS[0].choices = types;
      console.log('types:', types);

      return this.prompt<Record<string, string>>(PROMPTS).then(inputs => {
          const preprocessor = inputs.preprocessor.toLowerCase();
          const cssLang = preprocessor === 'sass' ? 'scss' : preprocessor;

          this.inputs.cssLang = cssLang;
          this.inputs.preprocessor = preprocessor;
      });
  }

  writing() {
      consola.info(`Creating project in ${join(CWD, this.inputs.name)}\n`);

      const copyTpl = (from: string, to?: string) => {
          this.fs.copyTpl(
              join(TEMPLATES, from),
              this.destinationPath(to || from),
              this.inputs
          );
      };

      copyTpl('component/**/*', join(__dirname, `../../../src/${this.inputs.name}`));
  }

  generateEntry() {
      exec('npm run build:entry', (error, stdout, stderr) => {
          console.log('stdout:', stdout);
      });
  }

  end() {
      const { name } = this.inputs;
      consola.success(`Successfully created ${chalk.yellow(name)}.`);
  }
}
