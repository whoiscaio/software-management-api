import { User } from 'src/modules/auth/models/user.model';
import { Phase } from 'src/modules/phase/models/phase.model';
import { Subprocess } from 'src/modules/subprocess/models/subprocess.model';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
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

  @Column({ default: false })
  concluded: boolean;

  @Generated('increment')
  @Column()
  order: number;

  @ManyToMany(() => User, (user) => user.processes)
  users: User[];

  @ManyToOne(() => Phase, (phase) => phase.processes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phase_id', referencedColumnName: 'id' })
  phase: Phase;

  @OneToMany(() => Subprocess, (subprocess) => subprocess.process, {
    cascade: true,
  })
  subprocesses: Subprocess[];
}
