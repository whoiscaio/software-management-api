import { Phase } from 'src/modules/phase/models/phase.model';
import { Team } from 'src/modules/team/models/team.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Phase, (phase) => phase.workspace)
  phases: Phase[];

  @ManyToOne(() => Team, (team) => team.workspaces)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: Team;
}
