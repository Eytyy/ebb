import { CgArrowsVAlt } from "react-icons/cg";
import ActiveLink from "../activeLink";

type Props = {
  switchView: () => void;
};

export default function TrackNavigation({ switchView }: Props) {
  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-black p-10">
      <button className="text-4xl" onClick={switchView}>
        <CgArrowsVAlt />
      </button>
      <div className="relative z-20 flex items-center justify-center gap-8">
        <ActiveLink
          className={"block h-10 w-10 rounded-full bg-white"}
          inActiveClassName="opacity-10"
          activeClassName="opacity-100"
          href="/track"
        ></ActiveLink>
        <ActiveLink
          className={"block h-10 w-8 bg-white"}
          inActiveClassName="opacity-10"
          activeClassName="opacity-100"
          href="/track/notes"
        ></ActiveLink>
      </div>
    </div>
  );
}
