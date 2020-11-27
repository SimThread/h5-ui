#!/usr/bin/env node
import { command, parse } from 'commander';
import { generateComponent } from './generateComponent';

command('dev')
    .description('Run webpack dev server')
    .action(() => {
        generateComponent();
    });

command('lint')
    .description('Run eslint and stylelint')
    .action(() => {
        console.log('link.....');
    });

parse();
