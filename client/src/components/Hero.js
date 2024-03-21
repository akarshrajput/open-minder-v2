import { useNavigate } from "react-router-dom";
import { Book, Pen, Sparkle, FileDoc, Files } from "phosphor-react";
import styles from "./Hero.module.css";

function Hero() {
  const navigate = useNavigate();

  function handleWriteBlogUsingAI() {
    navigate(`/writeblog/minder`);
  }
  function handleWriteBlog() {
    navigate(`writeblog`);
  }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <p className={styles.learnMinder}>
          Open Minder : Beyond Boundaries{" "}
          {/* <ArrowBendRightDown size={20} weight="bold" /> */}
        </p>
        <div className={styles.quote}>
          {/* <ArrowBendDownRight size={50} weight="bold" /> */}
          <button className={styles.writePaper}>
            <Files size={20} weight="bold" />
            Learn Minder
          </button>
          <button onClick={handleWriteBlog} className={styles.docs}>
            <Pen size={20} weight="bold" />
            Write Blog
          </button>

          <button
            onClick={handleWriteBlogUsingAI}
            className={styles.writePaperAI}
          >
            <Sparkle size={20} weight="bold" />
            Use Minder AI
          </button>
          <button className={styles.docs}>
            <FileDoc size={20} weight="bold" />
            Create DOCS
          </button>
          {/* <ArrowBendRightDown size={50} weight="bold" /> */}
        </div>
        <p className={styles.quotePara}>
          Stories, Thinking, and Expertise from Every Corner
        </p>
        <p className={styles.langInfo}>
          <span>English Letter</span>
        </p>
        <button className={styles.button}>
          <Book className="startReading" size={20} weight="bold" />
          Start Reading
        </button>
      </div>
      <div className={styles.leaderBoard}>
        <p className={styles.leaderBoardHeading}>
          {/* Top 5 writers <ArrowElbowRightDown size={20} weight="bold" /> */}
        </p>
      </div>
    </div>
  );
}
export default Hero;
