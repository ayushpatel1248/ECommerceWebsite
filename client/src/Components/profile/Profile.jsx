import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const posts = useSelector((state) => state);
  return (
    <div>
      {console.log(posts)}
    </div>
  )
}

export default Profile
