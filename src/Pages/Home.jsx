import FriendRequest from '../Components/Home/FriendRequest';
import UserList from '../Components/Home/userList';


const Home = () => {

  return (
    <div className='container mx-auto'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3'>
        <UserList />
        <FriendRequest/>
      </div>
    </div>
  )
}

export default Home