#!/usr/bin/env node
import { command, parse } from 'commander';
import { CreateGenerator } from './generator';
import { DeleteGenerator } from './delete';

command('create')
    .description('Run webpack dev server')
    .action(async () => {
        const generator = new CreateGenerator('');
        generator.run();
    });

command('delete')
    .description('Run webpack dev server')
    .action(async () => {
        const deleteor = new DeleteGenerator('');
        deleteor.run();
    });

parse();
