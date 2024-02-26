// @ts-ignore
import defaultUser from "@/images/defaultUser.png";
export default function User() {
  return (
      <div>
          <span>User</span>
          <img src={defaultUser}/>
          <span>FirstName</span><span>LastName</span>
      </div>
  );
}
