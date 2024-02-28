// @ts-ignore
import defaultUser from "@/images/defaultUser.png";
import Image from 'next/image'
export default function User(user) {
  return (
      <div>
          <span>User</span>
          <Image 
            src={user?.picture?.medium}
            width={100}
            height={100}
            alt="userIcon" 
          />
          <span>
            {user?.name?.first} {user?.name?.last}
          </span>
      </div>
  );
}
