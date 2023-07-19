import { Phase } from 'src/modules/phase/models/phase.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Phase, (phase) => phase.workspace)
  phases: Phase[];
}
