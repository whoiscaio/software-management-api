import { Process } from 'src/modules/process/models/process.model';
import { Workspace } from 'src/modules/workspace/models/workspace.model';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Phase {
  constructor(name: string, description: string, workspace: Workspace) {
    this.name = name;
    this.description = description;
    this.workspace = workspace;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  order: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.phases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id', referencedColumnName: 'id' })
  workspace: Workspace;

  @OneToMany(() => Process, (process) => process.phase, { cascade: true })
  processes: Process[];
}
