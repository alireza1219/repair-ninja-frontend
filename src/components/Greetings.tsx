export interface GreetingsProps {
  name?: string;
}

const Greetings = ({ name = "User" }: GreetingsProps) => {
  let greet = "";
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    greet = "morning";
  } else if (currentHour >= 12 && currentHour <= 17) {
    greet = "afternoon";
  } else if (currentHour >= 17 && currentHour <= 24) {
    greet = "evening";
  }

  return <span>{`Good ${greet}, ${name}!`}</span>;
};

export { Greetings };
