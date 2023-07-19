import { User } from 'src/modules/auth/models/user.model';
import { Workspace } from 'src/modules/workspace/models/workspace.model';
import {
  Column,
  Entity,
  JoinTable,
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
  @JoinTable({
    name: 'user_team',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => Workspace, (workspace) => workspace.team)
  workspaces: Workspace[];
}
