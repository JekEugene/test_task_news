import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
  token: string;

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user?: UserEntity;
}
