import withAuthCheck from "../../hoc/withAuthCheck";
import UserLayout from "./UserLayout";

const AuthCheckedUserLayout = withAuthCheck(UserLayout);
// const AuthCheckedUserLayout = UserLayout;
export default AuthCheckedUserLayout;
