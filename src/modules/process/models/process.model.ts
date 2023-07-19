import { Phase } from 'src/modules/phase/models/phase.model';
import { Subprocess } from 'src/modules/subprocess/models/subprocess.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Process {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Phase, (phase) => phase.processes)
  @JoinColumn({ name: 'phase_id', referencedColumnName: 'id' })
  phase: Phase;

  @OneToMany(() => Subprocess, (subprocess) => subprocess.process)
  subprocesses: Subprocess[];
}
