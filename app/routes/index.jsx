import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Layout } from "~/components/Layout";
import Loader from "~/components/Loader";


export default function Index() {
  let data = useLoaderData();
  return (
    <>
    <Layout />
      <section className="flex flex-wrap justify-center">
        {data ? (
          data.slice(0, 100).map((item) => (
            <div className="m-6 w-[180px]" key={item.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg max-h-[800px] flex flex-col items-center">
                <img
                  className="w-[50%]"
                  src={item.card_images[0] && item.card_images[0].image_url}
                  alt="card"
                />
                <div className="px-6 py-4 overflow-auto h-[150px]">
                  <div className="font-bold text-l mb-2">{item.name}</div>
                  <p className="text-gray-700 text-base ">{item.desc}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {item.archetype}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {item.race}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </section>
      </>
  );
}

export const loader = async () => {
  try {
    const response = await axios.get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export async function action({ request }) {
  let formData = await request.formData();
  let name = formData.get("name");
  return redirect(`/card/${name}`)
}