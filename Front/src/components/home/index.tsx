import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";
import KabanBoard from "../dashboard/KabanBoard";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/login");
  };

  const getPayment = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/payment", {
      withCredentials: true,
    });
    console.log("Response: ", response);
  };

  return (

    <Container> <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
      <HeadingXXLarge color="secondary500">Welcome !</HeadingXXLarge>
      {/* <Button kind="secondary" onClick={getPayment}>
        Get Payment
      </Button>  */}<KabanBoard/>
     
    </Container>
   
  );
}

export { Home };
