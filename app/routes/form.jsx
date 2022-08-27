import { redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { Layout } from "~/components/Layout";

export const action = async ({ request }) => {
  const formData = await request.formData();
  let errors = null;
  const name = formData.get("name");
  const type = formData.get("type");
  const description = formData.get("description");
  if (!name) errors = { ...errors, name: "No puede ir vacio" };
  if (!type) errors = { ...errors, type: "No puede ir vacio" };
  if (!description) errors = { ...errors, description: "No puede ir vacio" };
  if (!errors) return redirect(`/card/${name}`);
  return { errors };
};

const FormExample = () => {
  const transition = useTransition();
  const actionData = useActionData();
  return (
    <>
      <Layout />
      <div className="m-6">
        <h2 className="text-xl">Form</h2>
        <Form method="post">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Dark Magician"
                name="name"
              />
              {actionData && <small>{actionData.errors.name}</small>}
            </div>
            <div>
              <label
                for="type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Monster"
                name="type"
              />
              {actionData && <small>{actionData.errors.type}</small>}
            </div>
            <div>
              <label
                for="Description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <input
                type="text"
                id="The ultimate wizard in terms of attack and defense."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The ultimate wizard in terms of attack and defense."
                name="description"
              />
              {actionData && <small>{actionData.errors.description}</small>}
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {transition.state === "submitting" ? "Loading..." : "Submit"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default FormExample;
