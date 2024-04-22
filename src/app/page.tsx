import Main from "../components/Main";
import Providers from "../components/Providers";

export default async function Home() {
  return (
    <Providers>
      <Main />
    </Providers>
  );
}
