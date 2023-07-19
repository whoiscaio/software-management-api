import { User } from 'src/modules/auth/models/user.model';
import { Workspace } from 'src/modules/workspace/models/workspace.model';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_team')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.teams)
  users: User[];

  @OneToMany(() => Workspace, (workspace) => workspace.team)
  workspaces: Workspace[];
}
