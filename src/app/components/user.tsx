// @ts-ignore
import defaultUser from "@/images/defaultUser.png";
import Image from 'next/image'
export default function User(user) {
  return (
      <div className="flex justify-center">
          <div>
          <span className="font-bold text-lg flex justify-center">User</span>
          <Image 
            src={user?.picture?.medium}
            width={100}
            height={100}
            alt="userIcon" 
          />
          <span className="font-bold text-lg">
            {user?.name?.first} {user?.name?.last}
          </span>
          </div>
      </div>
  );
}
