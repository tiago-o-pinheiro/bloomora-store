import style from "@/assets/styles/loader.module.css";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={style["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loading;
