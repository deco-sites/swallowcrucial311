
import type { SectionProps } from "deco/mod.ts";

// Props type that will be configured in deco.cx's Admin
interface DogFact {
  id: string
  type: string
  attributes: {
    body: string
  }
}

export interface Props {
  title: string;
  numberOfFacts?: number;
}

export async function loader(
  { numberOfFacts, title }: Props,
  _req: Request,
) {
  const url = `https://dogapi.dog/api/v2/facts?limit=${numberOfFacts ?? 1}`;

  const { data } = (await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching dogs info", err);
    return { data: [] };
  })) as { data: DogFact[] };

  const dogFacts = data.map((data) => data?.attributes?.body)

  return { dogFacts, title };
}

export default function DogFacts(
  { title, dogFacts }: SectionProps<typeof loader>,
) {
  console.log(dogFacts);
  return (
    <div class="p-4">
      <h1 class="font-bold">{title}</h1>
      <ul>
        {dogFacts?.map((fact) => <li>{fact}</li>)}
      </ul>
    </div>
  );
}