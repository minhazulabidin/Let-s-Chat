import FriendRequest from '../Components/Home/FriendRequest';
import UserList from './../Components/Home/UserList';

const Home = () => {

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-3 gap-3'>
        <UserList />
        <FriendRequest/>
      </div>
    </div>
  )
}

export default Home