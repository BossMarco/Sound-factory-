import { CityServicePage, cityServiceMetadata, cityServiceParams } from "../../../lib/city-service-page";

export const dynamicParams = false;
export function generateStaticParams() { return cityServiceParams(); }
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) { const { city } = await params; return cityServiceMetadata("quinceanera", city); }
export default async function Page({ params }: { params: Promise<{ city: string }> }) { const { city } = await params; return <CityServicePage kind="quinceanera" city={city} />; }
