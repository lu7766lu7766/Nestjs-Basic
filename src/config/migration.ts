import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(require('./database'));
