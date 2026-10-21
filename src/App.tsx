import { useEffect } from "react";
import { initReveal } from "./lib/reveal";
import { Landing } from "./pages/Landing";

export default function App() {
  useEffect(() => initReveal(), []);
  return <Landing />;
}
