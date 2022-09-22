import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
export default function Home() {
  return (
    <div>
      <Loader show />
      <button onClick={() => toast.success("hello Toast")}></button>
    </div>
  );
}
