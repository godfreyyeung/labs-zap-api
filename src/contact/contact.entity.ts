import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryColumn()
  contactid: string;

  @Column()
  emailaddress1: string;
}
