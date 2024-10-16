
import levelUp from '../../assets/level.svg'

interface LeaderboardItemProps {
  name: string | undefined;
  completedChallanges: number;
  totalExperience: number;
  level: number;
  position: number;
  image: string | undefined;
}

export default function LeaderboardItem({ name, completedChallanges,
  totalExperience, level, position, image }: LeaderboardItemProps) {
  return (
    <div className='container-leaderboard-item'>
      <div className='level-item'>
        {position}
      </div>
        <div className='user-item'>
          <div className='userPicture-item'
          style={{ backgroundImage: `url('${image}')` }}></div>
          <div className='userDescription-item'>
            <p>{name}</p>
            <span><img src={levelUp} alt='level'/> Level {level}</span>
          </div>
        </div>
        <div className='challanges-item'>
          <p><strong>{completedChallanges}</strong> completados</p>
        </div>
        <div className='xp-item'>
          <p><strong>{totalExperience}</strong> xp</p>
        </div>
    </div>
  );
}
