import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMemory, getCurrentUserMemories } from "../services/apiMemories";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./ShareMind.module.css";
import {
  CirclesThree,
  Gear,
  Lightbulb,
  ClockCounterClockwise,
  Files,
  Sparkle,
  Pen,
  FileDoc,
} from "phosphor-react";
import { getCurrentUserBlogs } from "../services/apiBlogs";

function ShareMind() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, getCookie } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userId = user?._id;

  const { data: memoriesData } = useQuery({
    queryKey: ["userMemories", userId],
    queryFn: () => getCurrentUserMemories(userId),
  });
  const memories = memoriesData?.data?.memories;

  const { data: currentUserBlogs } = useQuery({
    queryKey: ["currentUserBlogs", userId],
    queryFn: () => getCurrentUserBlogs(userId),
  });

  const numberOfBlogs = currentUserBlogs?.data?.blogs?.length;
  const numberOfThoughts = memoriesData?.data?.memories?.length;

  const currentUserScore = (numberOfBlogs / 3 + numberOfThoughts / 20).toFixed(
    2
  );

  const { mutate, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: createMemory,
    onSuccess: () => {
      toast.success("New memory successfully created");
      reset();
      queryClient.invalidateQueries({ queryKey: ["userMemories"] });
      queryClient.invalidateQueries({ queryKey: ["getAllMemories"] });
    },
    onError: () => {
      toast.error("Error creating memory");
    },
  });

  const onSubmit = async (data) => {
    try {
      const userId = user?._id;
      const token = getCookie("jwt");
      const memoryData = {
        data,
        userId,
        token,
      };
      mutate({
        memoryData,
      });
    } catch (error) {
      console.error("Error occurred while writing blog:", error);
    }
  };

  const handleWriteBlog = () => {
    navigate(`/writeblog`);
  };

  const handleWriteBlogUsingAI = () => {
    navigate(`/writeblog/minder`);
  };

  return (
    <div className={styles.allDataContainer}>
      <div className={styles.shareContainer}>
        <div className={styles.shareContent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.commonInput}>
              <label className={styles.label}>
                Share your daily thoughts <Lightbulb weight="bold" />
                <p className={styles.usernameText}>{user?.name}</p>
              </label>
              <textarea
                className={styles.textarea}
                rows={2}
                placeholder={``}
                {...register("content", {
                  required: "Thought should have content",
                  maxLength: {
                    value: 100,
                    message: "Thought must not have more than 100 characters",
                  },
                  minLength: {
                    value: 10,
                    message: "Thought must have more than 10 characters",
                  },
                })}
              />
              <p className={styles.error}>
                {errors.content && errors.content.message}
              </p>
              <button className={styles.submitBtn}>
                {isLoadingSubmit ? "Sharing..." : "Share"}
                <CirclesThree />
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className={styles.shareContent}>
            <form>
              <div className={styles.commonInput}>
                <p className={styles.minderHeading}>
                  Your recent thoughts <ClockCounterClockwise weight="bold" />
                </p>

                <div className={styles.studioData}>
                  {memories?.length === 0 ? (
                    <div className={styles.commonStudioData}>
                      <label>Nothing</label>
                    </div>
                  ) : memories ? (
                    memories.map((memory) => (
                      <CurrentUserMemories
                        memory={memory}
                        key={memory?.memory?._id}
                      />
                    ))
                  ) : (
                    <div className={styles.commonStudioData}>
                      <label>...</label>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className={styles.shareContent}>
            <form>
              <div className={styles.commonInput}>
                <p className={styles.minderHeading}>
                  Minder Studio <Gear weight="bold" />
                </p>

                <div className={styles.studioData}>
                  <div className={styles.commonMinderData}>
                    <label>Minder score</label>
                    <p>{currentUserScore ? currentUserScore : "..."}</p>
                  </div>
                  <div className={styles.commonMinderData}>
                    <label>Total minder</label>
                    <p>{numberOfBlogs ? numberOfBlogs : "..."}</p>
                  </div>
                  <div className={styles.commonMinderData}>
                    <label>Total thoughts</label>
                    <p>{numberOfThoughts ? numberOfThoughts : "..."}</p>
                  </div>
                  <div className={styles.commonMinderData}>
                    <label>Total profit</label>
                    <p>NULL</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.quote}>
          <button className={styles.writePaper}>
            Learn Minder
            <Files weight="bold" />
          </button>
          <button
            onClick={handleWriteBlogUsingAI}
            className={styles.writePaperAI}
          >
            Use Minder AI
            <Sparkle className={styles.icon} weight="bold" />
          </button>
          <button onClick={handleWriteBlog} className={styles.docs}>
            Write Blog <Pen weight="bold" />
          </button>
          <button className={styles.docs}>
            Create docs <FileDoc weight="bold" />
          </button>
          <button className={styles.notes}>
            Create notes <FileDoc weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CurrentUserMemories(memory) {
  const memoryContent = memory?.memory?.content.slice(0, 100);
  // console.log(memory?.memory?._id);
  return (
    <div className={styles.commonStudioData}>
      <label>{memoryContent}</label>
    </div>
  );
}

export default ShareMind;
