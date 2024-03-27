import { useQuery } from "@tanstack/react-query";
import { getAllMemories } from "../services/apiMemories";
import Loader from "./Loader";
import styles from "./PeopleMemories.module.css";
import { DotsThreeOutline, Bell } from "phosphor-react";

function PeopleMemories() {
  const { isLoading, data } = useQuery({
    queryKey: ["getAllMemories"],
    queryFn: getAllMemories,
  });
  const memories = data?.data?.memories;
  //   console.log(memories);

  if (isLoading) return <Loader />;
  return (
    <div className={styles.memoriesParentContainer}>
      {/* <p className={styles.memoryHeading}>Daily Thoughts</p> */}
      <div className={styles.memoriesContainer}>
        {memories.map((memory) => (
          <Memory memory={memory} />
        ))}
      </div>
      <p className={styles.seeMore}>
        See more Thoughts <DotsThreeOutline weight="bold" />
      </p>
    </div>
  );
}

function Memory({ memory }) {
  return (
    <div className={styles.memoryData}>
      <p className={styles.memoryContent}>{memory?.content}</p>
      <div className={styles.memoryAuthor}>
        <Bell weight="bold" />
        <p> {memory.author.name}</p>
        {/* {memory.author.verified ? (
          <CircleWavyCheck weight="fill" color="#339af0" />
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
}

export default PeopleMemories;
