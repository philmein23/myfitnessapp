import { useRouter } from "next/router";

const Program: React.FC = () => {
  const router = useRouter();
  return <section>{router.query.programName}</section>;
};

export default Program;
