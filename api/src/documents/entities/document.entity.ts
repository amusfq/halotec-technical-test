import { File } from 'src/files/entities/file.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('MasterDokumenProdi')
export class Document {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Kode' })
  kode: string;

  @Column({ type: 'text', name: 'NamaDokumen' })
  namaDokumen: string;

  @Column({
    type: 'timestamptz',
    name: 'TimeCreated',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timeCreated: Date;

  @Column({ type: 'timestamptz', name: 'TimeUpdated', nullable: true })
  timeUpdated: Date;

  @Column({ type: 'timestamptz', name: 'TimeDeleted', nullable: true })
  timeDeleted: Date;

  @OneToOne(() => File, (file) => file.document)
  file: File | null;
}
