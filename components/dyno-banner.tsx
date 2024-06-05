export const dynoBannerData = {
  title: "dyno",
  description: "delightful dynamodb app from the future",
};

export const DynoBanner = () => {
  return (
    <section className="pt-36 pb-12 text-center">
      <h1 className="text-5xl md:text-7xl font-bold">{dynoBannerData.title}</h1>
      <h1 className="text-xl md:text-3xl mx-8 mt-4 md:mt-8 font-extralight text-gray-400">
        {dynoBannerData.description}
      </h1>
    </section>
  );
};
