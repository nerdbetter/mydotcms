import Carousel from "@/components/Carousel";

const getBlogPage = async () => {
  const res = await fetch(
    "https://demo.dotcms.com/api/v1/page/json/blog/index",
    {
      headers: {
        Authorization: `Basic ${btoa("admin@dotcms.com:admin")}`,
      },
    }
  );
  return await res.json();
};
// I need to get the image URL but do not know how to reference it with knowing the schema on this query
// there is probably a better endpoint than the search as well to get this information
const getBlogCardData = async () => {
    const query = `{
        search(
            query: "+contentType:blog", 
            sortBy:"title"
          ){

            title
            identifier
            urlMap

          }
    }`
  const res = await fetch(
    "https://demo.dotcms.com/api/v1/graphql",
    {
        method: "POST",
      headers: {
        Authorization: `Basic ${btoa("admin@dotcms.com:admin")}`,
      },
      body: JSON.stringify({query}),
    }
  );
  let cardData = await res.json();
  return cardData
};

const blogPage = await getBlogPage();
const blogCard = await getBlogCardData();

const MyBlogPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold p-6">{blogPage.entity.page.pageTitle}</h1>
      <div>
        <h3 className="text-1x p-6">{blogPage.entity.page.ogDescription}</h3>
      </div>
      <Carousel blogCard={blogCard.data.search} />
    </div>
  );
};

export default MyBlogPage;
