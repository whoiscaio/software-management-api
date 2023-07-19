import { Exclude } from 'class-transformer';
import { Process } from 'src/modules/process/models/process.model';
import { Team } from 'src/modules/team/models/team.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Team, (team) => team.users, {
    cascade: ['update', 'insert'],
  })
  @JoinTable({
    name: 'user_team',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  teams: Team[];

  @ManyToMany(() => Process, (process) => process.users, {
    cascade: ['update', 'insert'],
  })
  @JoinTable({
    name: 'user_process',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'process_id',
      referencedColumnName: 'id',
    },
  })
  processes: Process[];
}
