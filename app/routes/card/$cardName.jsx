import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Layout } from "~/components/Layout";

export const ErrorBoundary = ({error}) => {
   return (
       <>
       <Layout errorText="Esa carta no existe"/>
       </>
   );
}

const Card = () => {
    let data = useLoaderData();
return (
    < >
        <Layout />
        <div className="flex justify-center">
        <div className="m-6" key={data[0].id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg max-h-[800px]">
                <img
                  className="w-full"
                  src={data[0].card_images[0] && data[0].card_images[0].image_url}
                  alt="card"
                />
                <div className="px-6 py-4 overflow-auto h-[150px]">
                  <div className="font-bold text-xl mb-2">{data[0].name}</div>
                  <p className="text-gray-700 text-base ">{data[0].desc}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {data[0].archetype}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {data[0].race}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {data[0].type}
                  </span>
                </div>
              </div>
            </div>
            </div>
    </>
)};

export const loader = async ({params}) => {
    try {
      const response = await axios.get(
       `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${params.cardName}`
      );
      return response.data.data;
    } catch (error) {
        redirect('/index')
        throw new Error(error)

    }
  };

  export async function action({ request }) {
    let formData = await request.formData();
    let name = formData.get("name");
    return redirect(`/card/${name}`)
  }

export default Card;