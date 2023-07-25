import { Process } from 'src/modules/process/models/process.model';
import {
  Column,
  Entity,
  Generated,
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

  @Column({ default: false })
  concluded: boolean;

  @Generated('increment')
  @Column({ default: 0 })
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => Process, (process) => process.subprocesses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id', referencedColumnName: 'id' })
  process: Process;
}
