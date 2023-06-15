import { FaDiscord, FaGoogle } from "react-icons/fa";

export default function ProvidersLogo({ provider }: { provider: string }) {
  switch (provider) {
    case "Discord":
      return <FaDiscord />;
    case "Google":
      return <FaGoogle />;
    default:
      return null;
  }
}
