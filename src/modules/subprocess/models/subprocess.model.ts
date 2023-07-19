import { Process } from 'src/modules/process/models/process.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subprocess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Process, (process) => process.subprocesses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id', referencedColumnName: 'id' })
  process: Process;
}
