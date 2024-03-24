import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { createMemory } from "../services/apiMemories";
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

function ShareMind() {
  const { register, handleSubmit } = useForm();
  const { user, getCookie } = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: createMemory,
    onSuccess: () => {
      toast.success("New memory successfully created");
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
              </label>
              <textarea
                className={styles.textarea}
                rows={2}
                placeholder={``}
                {...register("content", {
                  required: "Memory should have content",
                  maxLength: {
                    value: 200,
                    message: "Memory must not have more than 200 characters",
                  },
                })}
              />
              <button className={styles.submitBtn}>
                {isLoading ? "Sharing..." : "Share"}
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
                  <div className={styles.commonStudioData}>
                    <label>Nothing...</label>
                  </div>
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
                  <div className={styles.commonStudioData}>
                    <label>Minder score</label>
                    <p>NULL</p>
                  </div>
                  <div className={styles.commonStudioData}>
                    <label>Total Minder</label>
                    <p>NULL</p>
                  </div>
                  <div className={styles.commonStudioData}>
                    <label>Total thoughts</label>
                    <p>NULL</p>
                  </div>
                  <div className={styles.commonStudioData}>
                    <label>Total Minder</label>
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
            Create DOCS <FileDoc weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareMind;
