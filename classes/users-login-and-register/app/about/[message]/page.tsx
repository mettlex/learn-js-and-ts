export async function generateStaticParams() {
  return [
    {
      message: "test_1",
    },
    {
      message: "test_2",
    },
  ];
}

export default function Page({ params }: { params: { message: string } }) {
  console.log({ params });
  return <h1>About Me: {params.message}</h1>;
}
