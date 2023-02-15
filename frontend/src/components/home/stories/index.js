import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import "./style.css";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

const Stories = () => {
  const query1 = useMediaQuery({
    query: "(max-width: 1175px)",
  });

  const query2 = useMediaQuery({
    query: "(max-width: 1030px)",
  });

  const query3 = useMediaQuery({
    query: "(max-width: 960px)",
  });

  const query4 = useMediaQuery({
    query: "(max-width: 885px)",
  });
  const maxStories = query4
    ? 5
    : query3
    ? 4
    : query2
    ? 5
    : query1
    ? 4
    : stories.length;
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../images/default_pic.png"
          alt=""
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, maxStories).map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
