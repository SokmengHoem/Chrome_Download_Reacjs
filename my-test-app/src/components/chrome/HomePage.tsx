import NavBar from "./header/NavBar";
import FloatingButton from "./modal/FloatingButton";
import PopUp from "./modal/PopUp";
import CardList from "./designCard/CardList";
import { ChromeProvider } from "../../contexts/ChromeContext";

export default function HomePage() {
  return (
    <>
      <ChromeProvider>
        <div className=" flex flex-col gap-16 ">
          <NavBar />
          {/* modal */}
          <div className=" fixed bottom-8 right-10">
            <FloatingButton />
          </div>
          <PopUp />
          {/* CardList */}
          <CardList />
        </div>
      </ChromeProvider>
    </>
  );
}
