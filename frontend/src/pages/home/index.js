import { useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutSide from "../../helpers/clickOutside";
const Home = () => {
  const [visible, setVisible] = useState(false);
  const el = useRef(null);
  useClickOutSide(el, () => {
    setVisible(false);
    console.log("outside");
  });
  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
};

export default Home;
