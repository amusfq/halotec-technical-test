import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MasterDokumenHistory')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column()
  notes: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timeCreated: Date;
}
