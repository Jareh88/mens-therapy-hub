import ResourceIndex from "../_components/ResourceIndex";
import { makeIndexMetadata } from "../_components/ResourceMeta";

const slug = "articles";

export default function Page() {
  return <ResourceIndex type={slug} />;
}

export const generateMetadata = makeIndexMetadata(slug);
