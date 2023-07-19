import { Process } from 'src/modules/process/models/process.model';
import { Workspace } from 'src/modules/workspace/models/workspace.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Phase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.phases)
  @JoinColumn({ name: 'workspace_id', referencedColumnName: 'id' })
  workspace: Workspace;

  @OneToMany(() => Process, (process) => process.phase)
  processes: Process[];
}
