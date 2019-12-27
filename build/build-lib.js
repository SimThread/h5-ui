/**
 * Build npm lib
 */
const shell = require('shelljs');
const signale = require('signale');

const { Signale } = signale;
const tasks = [
    'bootstrap',
    'lint-fix',
    'build:entry',
    'build:components',
    'build:style',
    'build:style-entry',
    'build:h5'
];

tasks.forEach(task => {
    signale.start(task);

    const interactive = new Signale({ interactive: true });
    interactive.pending(task);
    shell.exec(`npm run ${task} --silent`); // --silent 不显示安装的过程
    interactive.success(task);
});
