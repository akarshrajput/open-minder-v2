import { useQuery } from "@tanstack/react-query";
import { getAllMemories } from "../services/apiMemories";
import Loader from "./Loader";
import styles from "./PeopleMemories.module.css";
import { CircleWavyCheck } from "phosphor-react";

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
      <p className={styles.seeMore}>See more Thoughts</p>
    </div>
  );
}

function Memory({ memory }) {
  return (
    <div className={styles.memoryData}>
      <div className={styles.memoryAuthor}>
        <img
          className={styles.authorPhoto}
          src={`https://levtozcwxamsnighgjbp.supabase.co/storage/v1/object/public/user-photo/${memory?.author?.photo}`}
          alt={`${memory?.author?.name}'s profile`}
        />
        <p>{memory.author.name}</p>
        {memory.author.verified ? (
          <CircleWavyCheck weight="fill" color="#339af0" />
        ) : (
          ""
        )}
      </div>
      <p>{memory?.content}</p>
    </div>
  );
}

export default PeopleMemories;
