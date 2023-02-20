import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  action: string;

  @Column()
  repository: string;

  @Column()
  issue_number: number;

  @CreateDateColumn({
    type: 'datetime',
  })
  public created_at: Date;
}
