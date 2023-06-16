import { Document } from 'src/documents/entities/document.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('MasterDokumenFiles')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timeCreated: Date;

  @OneToOne(() => Document, (doc) => doc.file)
  @JoinColumn()
  document: Document;
}
